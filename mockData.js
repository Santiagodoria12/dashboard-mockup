/**
 * MOCK DATA GENERATOR (V3 - "Super Pro" Expansion)
 * Supports 30+ Charts/Tables
 */

const MockData = {

    // --- 1. Executive Summary (Sparklines) ---
    getSparklineRevenue: () => [45, 52, 49, 62, 58, 71, 85, 99, 105, 112, 120, 145],
    getSparklinePipeline: () => [200, 210, 250, 280, 260, 300, 320, 380, 400, 450],
    getSparklineMeetings: () => [5, 8, 12, 10, 15, 14, 18, 20, 22, 24],
    getSparklineLeads: () => [800, 850, 920, 900, 1100, 1050, 1200, 1150, 1250],

    getGoalAttainment: () => 82, // 82% to target

    // --- 2. Outbound Intelligence ---

    // Line
    // Line (Area Chart)
    getEmailsTrend: () => {
        return {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            sent: [3200, 3400, 2900, 4100, 4300, 4500],
            opened: [1500, 1600, 1350, 2100, 2200, 2400],
            clicked: [450, 510, 380, 620, 710, 800]
        };
    },

    // Funnel (Bar)
    getEngagementFunnel: () => {
        return {
            labels: ['Sent', 'Opened', 'Replied', 'Interested', 'Meeting'],
            data: [13600, 6120, 952, 238, 142]
        };
    },

    // Line
    getReplyRateTrend: () => {
        return {
            labels: ['Sep W1', 'Sep W2', 'Sep W3', 'Sep W4', 'Oct W1', 'Oct W2', 'Oct W3', 'Oct W4'],
            data: [3.5, 4.2, 3.8, 5.1, 4.9, 6.2, 5.8, 7.5]
        };
    },

    // Horizontal Bar
    getTopSequences: () => {
        return {
            labels: ['SaaS Founders (Cold)', 'Marketing Agencies (Intro)', 'Recruiters (Pain Points)', 'Q4 Re-engagement', 'Webinar Invite (Warm)'],
            data: [12.5, 9.8, 8.2, 6.5, 5.1]
        };
    },

    // Heatmap (Grid Data) - [Hour (0-9), Day (0-4), Value]
    getHeatmapData: () => {
        // Simple matrix: 5 days (rows) x 5 time slots (cols)
        // Days: Mon, Tue, Wed, Thu, Fri
        // Slots: 8am, 10am, 12pm, 2pm, 4pm
        return [
            [0, 0, 15], [0, 1, 35], [0, 2, 20], [0, 3, 45], [0, 4, 10], // Mon
            [1, 0, 25], [1, 1, 55], [1, 2, 30], [1, 3, 60], [1, 4, 20], // Tue (Hot)
            [2, 0, 20], [2, 1, 45], [2, 2, 25], [2, 3, 50], [2, 4, 15], // Wed
            [3, 0, 18], [3, 1, 40], [3, 2, 22], [3, 3, 48], [3, 4, 12], // Thu
            [4, 0, 10], [4, 1, 20], [4, 2, 15], [4, 3, 25], [4, 4, 5]   // Fri (Cold)
        ];
    },

    // Line (Dual Axis) or Stacked Line
    getSentimentTrend: () => {
        return {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            positive: [15, 22, 28, 35],
            negative: [5, 4, 3, 2] // Declining negative sentiment
        };
    },

    // List
    getWordCloud: () => ["Pricing", "Integration", "Demo", "Scale", "Support"],

    // Comparison Card
    getABTest: () => {
        return {
            testA: { subject: "Quick question...", open: 42, reply: 3.5 },
            testB: { subject: "Found you via LinkedIn", open: 68, reply: 9.2 } // B wins
        };
    },

    getDeepEmailTable: () => [
        { subject: "Quick question about your staffing", sequence: "SaaS Founders", sent: 1200, open: "45%", reply: "8.2%", interest: "2.1%" },
        { subject: "Re: your hiring process", sequence: "SaaS Founders", sent: 850, open: "62%", reply: "15.4%", interest: "5.0%" },
        { subject: "Partnership opportunity?", sequence: "Marketing Agencies", sent: 2200, open: "33%", reply: "4.1%", interest: "0.8%" },
        { subject: "Are you ready for Q4?", sequence: "Q4 Promo", sent: 3500, open: "28%", reply: "1.2%", interest: "0.2%" },
        { subject: "Intro: DOXA x [Company]", sequence: "Recruiters", sent: 900, open: "55%", reply: "9.5%", interest: "3.2%" }
    ],

    // --- 3. Market Intelligence ---

    getTamPenetration: () => [12, 35, 53], // Engaged, Identified, Unknown

    getLeadsAdded: () => {
        return {
            labels: ['Aug', 'Sep', 'Oct'],
            data: [950, 1100, 1250]
        };
    },

    getContactStages: () => [45, 25, 15, 10, 5], // Cold -> Interested

    getAccountTiers: () => [15, 35, 50], // T1, T2, T3

    // Horizontal Bar
    getTechStack: () => {
        return {
            labels: ['HubSpot', 'Salesforce', 'Pipedrive', 'Outreach', 'Apollo'],
            data: [450, 320, 180, 120, 90] // Leads using this tech
        };
    },

    // Bubble Chart (x: Industry Size, y: Engagement, r: Volume)
    getIndustryClusters: () => {
        return [
            { x: 80, y: 75, r: 25, label: 'Tech/SaaS' }, // High value, high engagement
            { x: 40, y: 30, r: 15, label: 'Logistics' },
            { x: 60, y: 45, r: 20, label: 'Healthcare' },
            { x: 30, y: 85, r: 10, label: 'Recruitment' }, // Niche but highly engaged
            { x: 90, y: 20, r: 30, label: 'Manufacturing' } // Big market, low engagement
        ];
    },

    // Bar
    getRegionalIntent: () => {
        return {
            labels: ['North America', 'EMEA', 'APAC', 'LATAM'],
            data: [65, 20, 10, 5]
        };
    },

    getHotLeadsTable: () => [
        { name: "John Smith", role: "CEO", co: "Alpha Tech", score: 98 },
        { name: "Maria Garcia", role: "VP Sales", co: "Beta Corp", score: 92 },
        { name: "Robert Doe", role: "Founder", co: "Gamma Sol", score: 88 },
        { name: "Alice Johnson", role: "HR Dir", co: "Delta Staff", score: 85 }
    ],

    // --- 4. Productivity ---

    getActivityMix: () => [5400, 850, 1200], // Email, Call, Social

    getTasksTrend: () => [120, 145, 130, 110, 95], // Daily

    getSdrLeaderboard: () => {
        return {
            labels: ['Alex', 'Sarah', 'Mike', 'Emma', 'David'],
            data: [45, 38, 32, 29, 21]
        };
    },

    // Funnel
    getCallFunnel: () => {
        return {
            labels: ['Dials', 'Connects', 'Positive', 'Meeting'],
            data: [1000, 150, 45, 15] // 15% connect, 10% meeting rate from connect
        };
    },

    getCriticalTasksTable: () => [
        { task: "Call", owner: "Alex", due: "Today", status: "Overdue" },
        { task: "Email", owner: "Sarah", due: "Yest.", status: "Overdue" },
        { task: "Demo Prep", owner: "Emma", due: "Today", status: "Pending" }
    ],

    // --- 5. Pipeline & Revenue ---

    getRevenueForecast: () => {
        return {
            labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            actual: [102, 115, 128, 145, 155, 165],
            target: [100, 110, 120, 130, 140, 150]
        };
    },

    // Bar
    getDealVelocity: () => {
        return {
            labels: ['Meeting', 'Proposal', 'Negotiation', 'Closing'],
            data: [5.2, 3.5, 8.1, 4.0] // Avg days in stage
        };
    },

    // Scatter (x: Days Open, y: Value)
    getDealRisk: () => {
        return [
            { x: 10, y: 5000, label: 'Safe' },
            { x: 15, y: 12000, label: 'Safe' },
            { x: 45, y: 25000, label: 'At Risk' }, // Long time, high value
            { x: 60, y: 8000, label: 'Lost Cause?' },
            { x: 5, y: 50000, label: 'Hot Deal' }
        ];
    },

    getWinRate: () => [22, 78], // Won/Lost

    getLostReasons: () => {
        return {
            labels: ['Ghosted', 'Timing', 'Budget', 'Competitor', 'Features'],
            data: [35, 25, 20, 15, 5]
        };
    },

    getSourceAttribution: () => [65, 15, 12, 8], // Apollo, Inbound, Ref, Event

    // --- 6. Website Intelligence ---

    getWebsiteVisitorsSequence: () => [
        { name: "Global Systems Inc.", visitor: "Michael Chen", source: "Sequence: Cold Outreach", time: "2 mins ago" },
        { name: "Acme Corp", visitor: "Sarah Jones", source: "Sequence: Q4 Promo", time: "15 mins ago" },
        { name: "TechFlow", visitor: "David Miller", source: "Sequence: Intro", time: "1 hour ago" },
        { name: "DataStream", visitor: "Jennifer Wu", source: "Sequence: Follow-up", time: "3 hours ago" }
    ],

    getWebsiteVisitorsNotSequence: () => [
        { name: "Unknown Visitor", visitor: "N/A", source: "Organic Search", time: "5 mins ago" },
        { name: "Stark Industries", visitor: "Pepper Potts", source: "LinkedIn Direct", time: "22 mins ago" },
        { name: "Wayne Ent.", visitor: "Bruce Wayne", source: "Direct Traffic", time: "45 mins ago" },
        { name: "Cyberdyne", visitor: "N/A", source: "Referral", time: "2 hours ago" }
    ],

    getEngagedContacts: () => [
        { name: "Robert Downey", company: "Stark Ind", score: 99, lastActive: "Replied to email" },
        { name: "Chris Evans", company: "Cap Corp", score: 95, lastActive: "Visited pricing page" },
        { name: "Scarlett Jo", company: "Widow Ops", score: 92, lastActive: "Downloaded whitepaper" },
        { name: "Mark Ruffalo", company: "Hulk Smash", score: 89, lastActive: "Opened email 5x" },
        { name: "Chris Hemsworth", company: "Thor inc", score: 85, lastActive: "Clicked link" }
    ]
};
