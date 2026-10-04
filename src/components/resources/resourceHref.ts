export function resourceHref(type: string, slug: string) {
    if (type !== "playbook") return `/blog/${slug}`;
    return slug === "s-corp-playbook" ? "/hub/s-corp-playbook" : `/hub/playbooks/${encodeURIComponent(slug)}`;
}
