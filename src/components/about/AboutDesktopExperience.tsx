import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, BarChart3, ChartNoAxesCombined, FileCheck2, FileText, Handshake, Lightbulb, PieChart, Target, TrendingUp, UsersRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FinalBookingCTA } from "@/components/home/FinalBookingCTA";

export interface AboutDesktopMember {
  _id: string;
  name: string;
  role: string;
  credentials?: string;
  image?: { asset?: { url?: string }; alt?: string };
  certifications?: string[];
  tags?: string[];
  description?: string;
  bioShort?: string;
}

interface AboutDesktopExperienceProps {
  members: AboutDesktopMember[];
  founder?: AboutDesktopMember;
  featuredMembers?: AboutDesktopMember[];
  approvedFounderTitle?: string;
}

const tagsFor = (member: AboutDesktopMember) => [...new Set(
  (member.credentials ? member.credentials.split(/,|\//) : member.certifications || [])
    .map(tag => tag.trim())
    .filter(tag => tag && tag.toLowerCase() !== member.role.trim().toLowerCase()),
)];

async function PersonCard({ member }: { member?: AboutDesktopMember }) {
  const t = await getTranslations("AboutPage.Simplified");
  const overview = await getTranslations("AboutPage.TeamOverview");
  const name = member?.name.trim().split(/[\s,]+/)[0] || t("memberPending");
  const role = member?.role && !/^trusted expert$/i.test(member.role.trim()) ? member.role.trim() : "";
  const tags = member ? tagsFor(member) : [];
  const specialties = [...new Set((member?.tags || []).filter(tag => typeof tag === "string" && tag.trim()).map(tag => tag.trim()))].filter(tag => !tags.some(credential => credential.toLowerCase() === tag.toLowerCase())).slice(0, 3);
  const bio = member?.bioShort?.trim() || member?.description?.trim();
  return <article data-about-person={member?._id || "pending"} className="@container/person min-w-0 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm @min-[64rem]/team:min-h-[19rem]">
    <div className="grid h-full min-w-0 gap-5 @min-[32rem]/person:grid-cols-[minmax(0,.5fr)_minmax(0,1fr)] @min-[32rem]/person:gap-5">
    <div data-person-photo className="relative mx-auto aspect-[4/5] min-h-60 w-full max-w-[13.5rem] overflow-hidden rounded-xl bg-[#e8eeec] @min-[32rem]/person:mx-0 @min-[32rem]/person:aspect-auto @min-[32rem]/person:max-w-none">
      {member?.image?.asset?.url ? <Image src={member.image.asset.url} alt={role ? name + ", " + role : name + (tags.length ? ", " + tags.join(", ") : "")} fill sizes="(min-width: 1280px) 240px, (min-width: 768px) 32vw, 90vw" className="object-cover object-top" /> : <p className="flex h-full items-center justify-center px-4 text-center text-sm leading-relaxed text-slate-700">{t("photoPending")}</p>}
    </div>
    <div className="flex min-w-0 flex-col px-2 py-2.5 sm:py-3">
      <h3 className="font-heading text-2xl font-bold leading-tight text-brand-950 @min-[32rem]/person:text-[1.75rem]">{name}</h3>
      {role ? <p className="mt-2 text-sm font-semibold uppercase leading-relaxed tracking-[.08em] text-slate-700">{role}</p> : null}
      {tags.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{tags.map(tag => <span key={tag} data-credential className="max-w-full break-words rounded-xl bg-brand-50/60 px-3 py-2 text-sm font-semibold leading-snug text-brand-900">{tag}</span>)}</div>}
      {specialties.length > 0 && <ul className="mt-3 flex flex-wrap gap-2">{specialties.map(tag => <li key={tag} className="max-w-full break-words rounded-xl bg-brand-50/60 px-3 py-2 text-sm leading-snug text-brand-900">{tag}</li>)}</ul>}
      {bio && <p className="mt-4 line-clamp-3 text-base leading-relaxed text-slate-700 @min-[32rem]/person:text-lg">{bio}</p>}
      <div className="mt-auto pt-4">{member ? <Link href={`/team#team-member-${member._id}`} className="inline-flex min-h-11 items-center gap-3 rounded-sm font-heading text-base font-semibold text-brand-500 @min-[32rem]/person:text-lg hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">{overview("viewProfile")}<ArrowRight className="size-5 shrink-0" aria-hidden="true" /></Link> : <p className="text-sm leading-relaxed text-slate-700">{overview("profilePending")}</p>}</div>
    </div>
    </div>
  </article>;
}

export async function AboutDesktopExperience({ members, founder, featuredMembers = [], approvedFounderTitle }: AboutDesktopExperienceProps) {
  const t = await getTranslations("AboutPage.Desktop");
  const review = await getTranslations("AboutPage.Simplified");
  const header = await getTranslations("Header");
  const profile = await getTranslations("AboutPage.FounderProfile");
  const team = await getTranslations("AboutPage.TeamOverview");
  const founderName = founder?.name.trim().split(",")[0] || review("memberPending");
  const founderTitle = approvedFounderTitle?.trim() || review("titlePending");
  const founderTags = founder ? tagsFor(founder) : [];
  const eligible = featuredMembers.filter(member => member && members.some(rosterMember => rosterMember._id === member._id)).slice(0, 4);
  const featured = eligible.length ? eligible : members.slice(0, 4);
  return <div className="bg-white text-brand-950">
    <section id="about-hero" aria-labelledby="about-heading" className="relative isolate overflow-hidden bg-white">
      <div className="@container relative z-10 mx-auto w-full max-w-[94rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 @min-[64rem]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] @min-[64rem]:gap-10">
          <div className="min-w-0">
            <p className="flex items-center gap-4 font-heading text-sm font-bold uppercase tracking-[.1em] text-gold-700"><span>{t("hero.peopleLabel")}</span><span className="h-px w-20 shrink-0 bg-gold-600" aria-hidden="true" /></p>
            <h1 id="about-heading" className="mt-5 font-heading text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-[-.04em]"><span className="block">{t("hero.titleLineOne")}</span>{" "}<span className="block">{t("hero.titleLineTwo")}</span></h1>
            <p className="mt-5 max-w-[48ch] text-lg leading-[1.45] text-slate-700 sm:text-xl">{t("hero.subtitle")}</p>
            <Link href="/team" className="mt-7 inline-flex min-h-14 max-w-full items-center gap-4 rounded-sm text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700"><span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-brand-500" aria-hidden="true"><ArrowRight className="size-6" strokeWidth={1.6} /></span><span className="min-w-0"><strong className="block font-heading text-lg font-semibold">{t("hero.meetTeam")}</strong><span className="mt-1 block text-sm leading-relaxed text-slate-700 sm:text-base">{t("hero.meetTeamDetail")}</span></span></Link>
          </div>
          <div className="min-w-0 border-t border-slate-200 pt-7 @min-[64rem]:border-t-0 @min-[64rem]:border-l @min-[64rem]:pt-0 @min-[64rem]:pl-8">
            <p className="flex items-center gap-4 font-heading text-sm font-bold uppercase tracking-[.1em] text-gold-700"><span>{t("hero.practiceLabel")}</span><span className="h-px w-16 shrink-0 bg-gold-600" aria-hidden="true" /></p>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,2.5vw,2.5rem)] font-bold leading-[1.12] tracking-tight text-brand-950">{t("hero.practiceTitle")}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">{t("hero.practiceBody")}</p>
            <ul data-about-practice className="mt-7 grid gap-x-5 gap-y-7 @min-[36rem]:grid-cols-2">{[UsersRound, Lightbulb, TrendingUp, Handshake].map((Icon, index) => <li key={index} className="flex min-w-0 items-start gap-3"><span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-50/60 text-brand-500" aria-hidden="true"><Icon className="size-7" strokeWidth={1.5} /></span><div className="min-w-0 pt-1"><h3 className="font-heading text-base font-bold leading-snug text-brand-950">{t("hero.practiceItems." + index + ".title")}</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">{t("hero.practiceItems." + index + ".detail")}</p></div></li>)}</ul>
          </div>
        </div>
        <div className="mt-10 h-px bg-slate-200" aria-hidden="true" />
      </div>
    </section>
    <section id="about-founder" aria-labelledby="founder-heading" className="scroll-mt-28 bg-white py-10 lg:py-12">
      <div className="@container mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0 flex-[1_1_40rem]"><p className="flex items-center gap-4 font-heading text-sm font-bold uppercase tracking-[.1em] text-gold-700"><span>{review("founderHeading")}</span><span className="h-px w-16 shrink-0 bg-gold-600" aria-hidden="true" /></p><h2 id="founder-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]">{profile("title")}</h2><p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-xl">{profile("intro")}</p></div>
        </div>
        <article data-about-person={founder?._id || "pending"} className="@container/founder mt-7 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm @min-[64rem]:min-h-[32rem] @min-[64rem]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="grid min-w-0 gap-6 p-5 sm:p-6 @min-[48rem]/founder:grid-cols-[minmax(0,.85fr)_minmax(0,1fr)] @min-[64rem]/founder:gap-8">
            <div data-founder-photo className="relative mx-auto aspect-[3/4] min-h-80 w-full max-w-[24rem] overflow-hidden rounded-xl bg-[#e8eeec] @min-[48rem]/founder:mx-0 @min-[48rem]/founder:aspect-auto @min-[48rem]/founder:max-w-none">{founder?.image?.asset?.url ? <Image src={founder.image.asset.url} alt={founderName + ", " + founderTitle} fill sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 90vw" className="object-cover object-top" /> : <p className="flex h-full items-center justify-center p-4 text-center text-sm text-slate-700">{review("photoPending")}</p>}</div>
            <div className="flex min-w-0 flex-col justify-center py-2"><h3 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-brand-950 sm:text-4xl">{founderName}</h3><p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">{founderTitle}</p><div className="mt-5 flex flex-wrap gap-2">{founderTags.map(tag => <span key={tag} data-credential className="rounded-full bg-brand-50/60 px-4 py-2 font-heading text-sm font-bold text-brand-900 sm:text-base">{tag}</span>)}</div><p className="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">{review("mission")}</p><Link href="/team#founder" className="mt-6 inline-flex min-h-14 max-w-full items-center justify-center gap-3 self-start rounded-xl bg-brand-500 px-6 py-3 font-heading text-base font-semibold text-white @min-[64rem]/founder:px-7 @min-[64rem]/founder:text-lg hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700"><span className="min-w-0">{profile("storyLink")}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" /></Link></div>
          </div>
          <div className="min-w-0 border-t border-slate-200 bg-brand-50/35 p-6 sm:p-8 @min-[64rem]:border-t-0 @min-[64rem]:border-l"><p className="flex items-center gap-3 font-heading text-sm font-bold uppercase tracking-[.1em] text-gold-700"><span>{profile("practiceLabel")}</span><span className="h-px w-14 shrink-0 bg-gold-600" aria-hidden="true" /></p><h3 className="mt-4 font-heading text-2xl font-bold leading-[1.15] tracking-tight text-brand-950 sm:text-3xl"><span className="block">{profile("practiceTitleLead")}</span>{" "}<span className="block">{profile("practiceTitleEnd")}</span></h3><ul data-founder-practice className="mt-6 space-y-6">{[ChartNoAxesCombined, UsersRound, Handshake].map((Icon,index) => <li key={index} className="flex min-w-0 items-center gap-4"><span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-50/60 text-brand-500" aria-hidden="true"><Icon className="size-8" strokeWidth={1.6} /></span><div className="min-w-0 border-l border-slate-200 pl-4"><h4 className="font-heading text-base font-bold uppercase leading-snug text-brand-950 @min-[64rem]/founder:text-lg">{profile("points." + index + ".title")}</h4><p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base @min-[64rem]/founder:text-lg">{profile("points." + index + ".detail")}</p></div></li>)}</ul></div>
        </article>
      </div>
    </section>
    <section id="about-team" aria-labelledby="about-team-heading" className="scroll-mt-28 bg-white pt-10 lg:pt-12">
      <div className="@container/team mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 @min-[64rem]/team:grid-cols-[minmax(0,1fr)_18rem]"><div className="min-w-0"><p className="flex items-center gap-4 font-heading text-sm font-bold uppercase tracking-[.1em] text-gold-700"><span>{t("team.eyebrow")}</span><span className="h-px w-20 shrink-0 bg-gold-600" aria-hidden="true" /></p><h2 id="about-team-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]">{team("title")}</h2><p className="mt-3 max-w-[58ch] text-base leading-relaxed text-slate-700 sm:text-xl">{team("intro")}</p></div><div className="min-w-0"><Link href="/team" className="inline-flex min-h-14 w-full max-w-[18rem] items-center justify-center gap-4 rounded-xl bg-brand-500 px-5 py-3 font-heading text-base font-semibold text-white hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">{t("team.fullTeam")}<ArrowRight className="size-5 shrink-0" aria-hidden="true" /></Link></div></div>
        {!featured.length && <p className="mt-5 text-sm leading-relaxed text-slate-700">{review("selectionPending")}</p>}
        <div className="mt-7 grid auto-rows-fr gap-4 @min-[64rem]/team:grid-cols-2">{featured.length ? featured.map(member => <PersonCard key={member._id} member={member} />) : [0, 1, 2, 3].map(index => <PersonCard key={index} />)}</div>
      </div>
      <div className="mt-9 bg-brand-50/40 py-6"><ul data-team-values className="mx-auto grid w-full max-w-[94rem] gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">{[UsersRound, FileText, ChartNoAxesCombined].map((Icon,index) => <li key={index} className="flex min-w-0 items-center gap-4 border-t border-brand-100 pt-5 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:pt-0 md:pl-5 md:first:border-l-0 md:first:pl-0"><span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-brand-100 text-brand-500" aria-hidden="true"><Icon className="size-7" strokeWidth={1.6} /></span><div className="min-w-0"><h3 className="font-heading text-lg font-bold leading-snug text-brand-950">{team("values." + index + ".title")}</h3><p className="mt-1 text-sm leading-relaxed text-slate-700">{team("values." + index + ".detail")}</p></div></li>)}</ul></div>
    </section>
    <section id="about-work" aria-labelledby="approach-heading" className="scroll-mt-28 bg-brand-950 py-10 text-white lg:py-12">
      <div className="@container/work mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-8">
          <div className="min-w-0">
            <p className="flex items-center gap-4 font-heading text-sm font-semibold uppercase tracking-[.1em] text-gold-300"><span>{t("approach.eyebrow")}</span><span className="h-px w-20 shrink-0 bg-gold-300" aria-hidden="true" /></p>
            <h2 id="approach-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] sm:text-4xl lg:text-[2.75rem]">{t("approach.title")}</h2>
            <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-white/85 sm:text-xl">{t("approach.intro")}</p>
          </div>
        </div>
        <div className="mt-9 hidden grid-cols-[1.25fr_1fr_1fr] gap-7 pb-2 font-heading text-sm font-semibold uppercase tracking-[.1em] text-gold-300 @min-[64rem]/work:grid" aria-hidden="true"><span /><span className="pl-7">{t("approach.actionLabel")}</span><span className="pl-7">{t("approach.outcomeLabel")}</span></div>
        <ol data-about-work className="mt-8 divide-y divide-white/25 border-t border-white/25 @min-[64rem]/work:mt-0">
          {[{Icon:Target,OutcomeIcon:FileText},{Icon:BarChart3,OutcomeIcon:PieChart},{Icon:FileCheck2,OutcomeIcon:Target}].map(({Icon,OutcomeIcon},index) => <li key={index} className="grid min-w-0 gap-6 py-7 @min-[64rem]/work:grid-cols-[1.25fr_1fr_1fr] @min-[64rem]/work:gap-7">
            <div className="grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 @min-[64rem]/work:grid-cols-[3.5rem_minmax(0,1fr)] @min-[64rem]/work:gap-5">
              <span className="font-heading text-4xl font-bold leading-none tracking-tight text-gold-300 @min-[64rem]/work:text-5xl" aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
              <div className="flex min-w-0 items-start gap-4 border-l border-white/35 pl-4 @min-[64rem]/work:gap-5 @min-[64rem]/work:pl-5"><Icon className="size-9 shrink-0 text-gold-300 @min-[64rem]/work:size-11" strokeWidth={1.7} aria-hidden="true" /><div className="min-w-0"><h3 className="font-heading text-xl font-bold leading-tight">{t("approach.items." + index + ".title")}</h3><p className="mt-2 text-base leading-relaxed text-white/85 @min-[64rem]/work:text-lg">{t("approach.items." + index + ".detail")}</p></div></div>
            </div>
            <div className="min-w-0 border-t border-white/20 pt-5 @min-[64rem]/work:border-t-0 @min-[64rem]/work:border-l @min-[64rem]/work:border-white/35 @min-[64rem]/work:pt-0 @min-[64rem]/work:pl-7"><p className="mb-2 font-heading text-sm font-semibold uppercase tracking-[.08em] text-gold-300 @min-[64rem]/work:sr-only">{t("approach.actionLabel")}</p><p className="text-base leading-relaxed text-white/85 @min-[64rem]/work:text-lg">{t("approach.items." + index + ".action")}</p></div>
            <div className="min-w-0 border-t border-white/20 pt-5 @min-[64rem]/work:border-t-0 @min-[64rem]/work:border-l @min-[64rem]/work:border-white/35 @min-[64rem]/work:pt-0 @min-[64rem]/work:pl-7"><p className="mb-3 font-heading text-sm font-semibold uppercase tracking-[.08em] text-gold-300 @min-[64rem]/work:sr-only">{t("approach.outcomeLabel")}</p><div className="flex min-w-0 items-start gap-4"><OutcomeIcon className="size-10 shrink-0 text-gold-300 @min-[64rem]/work:size-11" strokeWidth={1.7} aria-hidden="true" /><div className="min-w-0"><h4 className="font-heading text-xl font-bold leading-tight">{t("approach.items." + index + ".outcomeTitle")}</h4><p className="mt-2 text-base leading-relaxed text-white/85 @min-[64rem]/work:text-lg">{t("approach.items." + index + ".outcomeDetail")}</p></div></div></div>
          </li>)}
        </ol>
      </div>
    </section>
    <div className="homepage-rhythm"><FinalBookingCTA id="about-next-step" placement="about_final_cta" label={header("bookCall")} /></div>
  </div>;
}
