import { Calendar, Shield, UserRound } from "lucide-react";

interface CtaTrustRowProps {
    items: readonly { title: string; description: string }[];
}

const icons = [Calendar, Shield, UserRound];

export function CtaTrustRow({ items }: CtaTrustRowProps) {
    return (
        <ul className="cta-decision-trust">
            {items.map(({ title, description }, index) => {
                const Icon = icons[index];
                return (
                    <li key={title}>
                        <Icon aria-hidden="true" />
                        <span>
                            <strong>{title}</strong>
                            <span>{description}</span>
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}
