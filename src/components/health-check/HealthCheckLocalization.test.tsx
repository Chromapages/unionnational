import {act, cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {NextIntlClientProvider, useLocale} from "next-intl";
import type {ReactNode} from "react";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import {HEALTH_QUESTIONS} from "@/lib/intake/health-score";
import {HealthCheckSurvey} from "./HealthCheckSurvey";
import {ResultDashboard} from "./ResultDashboard";

vi.mock("@/i18n/navigation", () => ({Link: ({children, href, ...props}: {children: ReactNode; href: string}) => {
    const locale = useLocale();
    return <a href={`/${locale}${href}`} {...props}>{children}</a>;
}}));
vi.mock("framer-motion", () => ({
    AnimatePresence: ({children}: {children: ReactNode}) => children,
    motion: {div: ({children, className}: {children: ReactNode; className?: string}) => <div className={className}>{children}</div>},
}));

const locales = {en, es};
type QuestionCopy = {question: string; description?: string; options: Record<string, {label: string; description?: string}>};
const keys = (value: Record<string, unknown>, prefix = ""): string[] => Object.entries(value).flatMap(([key, item]) =>
    typeof item === "string" ? [prefix + key] : keys(item as Record<string, unknown>, `${prefix}${key}.`));

function start(locale: keyof typeof locales) {
    const messages = locales[locale];
    const copy = messages.HealthCheck;
    render(<NextIntlClientProvider locale={locale} messages={messages}><HealthCheckSurvey /></NextIntlClientProvider>);
    expect(screen.getByRole("heading", {name: copy.title, level: 1})).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", {name: copy.start}));
    return copy;
}

function capture(locale: keyof typeof locales, optionIds = HEALTH_QUESTIONS.map(question => question.options[0].id)) {
    const copy = start(locale);
    const questions: Record<string, QuestionCopy> = copy.questions;
    for (const question of HEALTH_QUESTIONS) {
        const translated = questions[String(question.id)];
        expect(screen.getByRole("heading", {name: translated.question})).toHaveFocus();
        const group = screen.getByRole("group");
        for (const [index, option] of question.options.entries()) {
            const button = within(group).getAllByRole("button")[index];
            expect(button).toHaveTextContent(translated.options[option.id].label);
            if (option.description) expect(button).toHaveTextContent(translated.options[option.id].description!);
        }
        const index = question.options.findIndex(option => option.id === optionIds[question.id - 1]);
        fireEvent.click(within(group).getAllByRole("button")[index]);
        act(() => vi.advanceTimersByTime(400));
    }
    expect(screen.getByText(copy.preview.submit)).toBeInTheDocument();
    expect(screen.getByRole("link", {name: locale === "es" ? "Política de privacidad" : "Privacy Policy"})).toHaveAttribute("href", `/${locale}/legal/privacy-policy`);
    fireEvent.change(screen.getByLabelText(copy.capture.firstName), {target: {value: "Ava"}});
    fireEvent.change(screen.getByLabelText(copy.capture.lastName), {target: {value: "Rivera"}});
    fireEvent.change(screen.getByLabelText(copy.capture.email), {target: {value: "ava@example.test"}});
    fireEvent.change(screen.getByLabelText(copy.capture.phone), {target: {value: "5550101234"}});
    return {copy, form: screen.getByRole("button", {name: copy.capture.submit}).closest("form")!};
}

describe("health-check localized contract", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => {cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks();});

    it("provides identical complete namespaces and keeps English question copy faithful to the canonical contract", () => {
        expect(keys(es.HealthCheck).sort()).toEqual(keys(en.HealthCheck).sort());
        for (const locale of ["en", "es"] as const) {
            const questions: Record<string, QuestionCopy> = locales[locale].HealthCheck.questions;
            for (const question of HEALTH_QUESTIONS) {
                const translated = questions[String(question.id)];
                expect(translated.question).toBeTruthy();
                if (locale === "en") expect(translated.question).toBe(question.question);
                if (question.description) {
                    expect(translated.description).toBeTruthy();
                    if (locale === "en") expect(translated.description).toBe(question.description);
                }
                for (const option of question.options) {
                    expect(translated.options[option.id].label).toBeTruthy();
                    if (locale === "en") expect(translated.options[option.id].label).toBe(option.label);
                    if (option.description) {
                        expect(translated.options[option.id].description).toBeTruthy();
                        if (locale === "en") expect(translated.options[option.id].description).toBe(option.description);
                    }
                }
            }
        }
    });

    it.each(["en", "es"] as const)("shows every question/option in %s and sends unchanged identities with localized success", async locale => {
        window.history.replaceState({}, "", `/${locale}/health-check`);
        const fetchMock = vi.fn().mockResolvedValue(new Response('{"success":true}', {status: 200}));
        vi.stubGlobal("fetch", fetchMock);
        const {copy, form} = capture(locale);
        await act(async () => {fireEvent.submit(form);});
        const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
        expect(payload).toMatchObject({locale, source_page: `/${locale}/health-check`, answer_contract_version: "health-check-v1", score: 100});
        expect(payload.answer_option_ids).toEqual(Object.fromEntries(HEALTH_QUESTIONS.map(question => [question.id, question.options[0].id])));
        expect(screen.getByText(copy.results.basedOn)).toBeInTheDocument();
        expect(screen.getByRole("link", {name: copy.results.growth.cta})).toHaveAttribute("href", `/${locale}/services`);
        expect(screen.getAllByText(copy.status.complete)).toHaveLength(3);
        expect(screen.queryByText("Verified")).not.toBeInTheDocument();
    });

    it.each(["en", "es"] as const)("preserves unknown and duplicate zero option identities in %s", async locale => {
        const copy = start(locale);
        fireEvent.click(within(screen.getByRole("group")).getAllByRole("button")[4]);
        act(() => vi.advanceTimersByTime(400));
        fireEvent.click(within(screen.getByRole("group")).getAllByRole("button")[4]);
        act(() => vi.advanceTimersByTime(400));
        fireEvent.click(screen.getByRole("button", {name: copy.previous}));
        const group = screen.getByRole("group");
        expect(within(group).getAllByRole("button")[4]).toHaveAttribute("aria-pressed", "true");
        expect(within(group).getAllByRole("button")[2]).toHaveAttribute("aria-pressed", "false");
        fireEvent.click(screen.getByRole("button", {name: copy.previous}));
        expect(within(screen.getByRole("group")).getAllByRole("button")[4]).toHaveAttribute("aria-pressed", "true");
    });

    it.each(["en", "es"] as const)("submits unknown and duplicate zero choices with stable identities in %s", async locale => {
        const fetchMock = vi.fn().mockResolvedValue(new Response('{"success":true}', {status: 200}));
        vi.stubGlobal("fetch", fetchMock);
        const {copy, form} = capture(locale, ["unknown-other", "not-sure", "none", "monthly", "always", "accounting-software", "year-round"]);
        await act(async () => {fireEvent.submit(form);});
        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({locale, answers: {1: 0, 2: 0}, answer_option_ids: {1: "unknown-other", 2: "not-sure"}, score: 65});
        expect(screen.getByRole("link", {name: copy.results.stable.cta})).toHaveAttribute("href", `/${locale}/contact?topic=strategy`);
    });

    it.each(["en", "es"] as const)("prevents duplicate submissions while showing localized pending state in %s", async locale => {
        let finish!: (response: Response) => void;
        const fetchMock = vi.fn().mockImplementation(() => new Promise<Response>(resolve => {finish = resolve;}));
        vi.stubGlobal("fetch", fetchMock);
        const {copy, form} = capture(locale);
        fireEvent.submit(form);
        fireEvent.submit(form);
        expect(fetchMock).toHaveBeenCalledOnce();
        expect(screen.getByRole("button", {name: copy.capture.submitting})).toBeDisabled();
        await act(async () => {finish(new Response('{"success":true}', {status: 200}));});
        expect(screen.getByText(copy.results.report)).toBeInTheDocument();
    });

    for (const locale of ["en", "es"] as const) {
        it.each([
            ["400", () => Promise.resolve(new Response("{}", {status: 400}))],
            ["429", () => Promise.resolve(new Response("{}", {status: 429}))],
            ["500", () => Promise.resolve(new Response("{}", {status: 500}))],
            ["invalid JSON", () => Promise.resolve(new Response("not-json", {status: 200}))],
            ["unconfirmed success", () => Promise.resolve(new Response('{"success":false}', {status: 200}))],
            ["network", () => Promise.reject(new TypeError("synthetic offline"))],
            ["timeout", () => Promise.reject(new DOMException("synthetic deadline", "TimeoutError"))],
        ])(`${locale} retains localized capture and retry after %s`, async (_label, response) => {
            const fetchMock = vi.fn().mockImplementation(response);
            vi.stubGlobal("fetch", fetchMock);
            const {copy, form} = capture(locale);
            await act(async () => {fireEvent.submit(form);});
            expect(screen.getByRole("alert")).toHaveTextContent(copy.submissionError);
            expect(screen.queryByText(copy.results.report)).not.toBeInTheDocument();
            expect(screen.getByLabelText(copy.capture.email)).toHaveValue("ava@example.test");
            fetchMock.mockResolvedValueOnce(new Response('{"success":true}', {status: 200}));
            await act(async () => {fireEvent.submit(form);});
            expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual(JSON.parse(fetchMock.mock.calls[0][1].body));
            expect(screen.getByText(copy.results.basedOn)).toBeInTheDocument();
        });

        it.each(["firstName", "lastName", "email", "phone"] as const)(`${locale} associates localized %s validation and keeps contact gate`, field => {
            const fetchMock = vi.fn();
            vi.stubGlobal("fetch", fetchMock);
            const {copy, form} = capture(locale);
            const input = screen.getByLabelText(copy.capture[field]);
            fireEvent.change(input, {target: {value: ""}});
            fireEvent.submit(form);
            expect(fetchMock).not.toHaveBeenCalled();
            expect(input).toHaveFocus();
            expect(input).toHaveAccessibleDescription(copy.capture.errors[field]);
        });

        it.each([
            ["critical", "/contact?topic=resolution"],
            ["stable", "/contact?topic=strategy"],
            ["growth", "/services"],
        ] as const)(`${locale} translates %s result without changing its destination`, (tier, route) => {
            const copy = locales[locale].HealthCheck;
            render(<NextIntlClientProvider locale={locale} messages={locales[locale]}><ResultDashboard scores={{total: 40, entity: 0, compliance: -10, operations: 50}} tier={tier} name="Ava" /></NextIntlClientProvider>);
            expect(screen.getByRole("heading", {name: copy.results[tier].title})).toBeInTheDocument();
            expect(screen.getByText(copy.results[tier].description)).toBeInTheDocument();
            expect(screen.getByRole("link", {name: copy.results[tier].cta})).toHaveAttribute("href", `/${locale}${route}`);
            for (const highlight of Object.values(copy.results[tier].highlights)) expect(screen.getByText(highlight)).toBeInTheDocument();
        });
    }
});
