
export type Site = {
    id: string;
    user_id: string;
    domain_url: string;
    current_phase: number; // 1: Analysis, 2: Keywords, 3: Writing, 4: Live
    domain_authority: number;
    domain_health: number;
    created_at: string;
};

export type Backlink = {
    id: string;
    site_id: string;
    source_url: string;
    dr_score: number;
    anchor_text: string | null;
    acquired_at: string;
};

export type Article = {
    id: string;
    site_id: string;
    title: string;
    status: 'In Editorial Review' | 'Live';
    live_url: string | null;
    published_at: string | null; // Date string or null
};

export type Profile = {
    id: string;
    email: string;
    role: 'admin' | 'user';
    created_at: string;
};
