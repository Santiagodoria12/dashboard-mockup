/**
 * DASHBOARD CONTROLLER (V6 - Robust Recovery)
 * Guaranteed to render HTML tables even if Charts fail.
 */

// Safety Check for Chart.js
if (typeof Chart !== 'undefined') {
    Chart.defaults.color = '#64748b';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.05)';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.maintainAspectRatio = false;
} else {
    console.error('CRITICAL: Chart.js library not loaded');
}

const Dashboard = {
    init: () => {
        console.log('Starting Dashboard Init...');

        // 1. Render HTML Tables FIRST (Critical Path)
        // This ensures the user sees data tables even if Chart.js dies.
        try {
            Dashboard.renderCustomHTML();
            console.log('Tables Rendered.');
        } catch (e) {
            console.error('Table Render Error:', e);
        }

        // 2. Check for MockData
        if (typeof MockData === 'undefined') {
            const errDiv = document.createElement('div');
            errDiv.style.color = 'red';
            errDiv.style.padding = '20px';
            errDiv.innerHTML = "ERROR: MockData.js not loaded. Check file path.";
            document.body.prepend(errDiv);
            return;
        }

        // 3. Render Independent Sections (Try-Catch per section)
        try { Dashboard.renderKPIs(); } catch (e) { console.warn('KPI Error', e); }
        try { Dashboard.renderFunnelCards(); } catch (e) { console.warn('Funnel Error', e); }
        try { Dashboard.renderOutbound(); } catch (e) { console.warn('Outbound Error', e); }
        try { Dashboard.renderMarket(); } catch (e) { console.warn('Market Error', e); }

        console.log('Dashboard Init Finished.');
    },

    createGradient: (ctx, color) => {
        if (!ctx) return color;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color.replace(')', ', 0.4)').replace('rgb', 'rgba'));
        gradient.addColorStop(1, color.replace(')', ', 0.01)').replace('rgb', 'rgba'));
        return gradient;
    },

    // --- RENDERERS ---

    renderKPIs: () => {
        if (!document.getElementById('chart-gauge')) return;

        // Gauge
        new Chart(document.getElementById('chart-gauge'), {
            type: 'doughnut',
            data: { labels: ['Achieved', 'Remaining'], datasets: [{ data: [MockData.getGoalAttainment(), 100 - MockData.getGoalAttainment()], backgroundColor: ['#10b981', '#334155'], borderWidth: 0, circumference: 180, rotation: 270 }] },
            options: { cutout: '80%', plugins: { tooltip: { enabled: false } } }
        });

        const sparkOptions = { scales: { x: { display: false }, y: { display: false } }, plugins: { legend: { display: false }, tooltip: { enabled: false } }, elements: { point: { radius: 0 }, line: { borderWidth: 2 } } };

        // Sparklines
        const rev = document.getElementById('spark-revenue');
        if (rev) new Chart(rev, { type: 'line', data: { labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], datasets: [{ data: MockData.getSparklineRevenue(), borderColor: '#6366f1', tension: 0.4 }] }, options: sparkOptions });

        const pipe = document.getElementById('spark-pipeline');
        if (pipe) new Chart(pipe, { type: 'line', data: { labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], datasets: [{ data: MockData.getSparklinePipeline(), borderColor: '#f59e0b', tension: 0.4 }] }, options: sparkOptions });

        const meet = document.getElementById('spark-meetings');
        if (meet) new Chart(meet, { type: 'bar', data: { labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], datasets: [{ data: MockData.getSparklineMeetings(), backgroundColor: '#10b981', borderRadius: 2 }] }, options: sparkOptions });

        const leads = document.getElementById('spark-leads');
        if (leads) new Chart(leads, { type: 'line', data: { labels: [1, 2, 3, 4, 5, 6, 7, 8, 9], datasets: [{ data: MockData.getSparklineLeads(), borderColor: '#3b82f6', tension: 0.4, fill: true, backgroundColor: 'rgba(59, 130, 246, 0.1)' }] }, options: sparkOptions });
    },

    renderFunnelCards: () => {
        // TOFU
        const tamCtx = document.getElementById('chart-tam');
        if (tamCtx) {
            const tam = MockData.getTamPenetration();
            new Chart(tamCtx, { type: 'bar', data: { labels: ['Engaged', 'ID'], datasets: [{ data: [tam[0], tam[1]], backgroundColor: ['#6366f1', '#8b5cf6'], borderRadius: 4 }] }, options: { scales: { x: { display: false }, y: { display: false } } } });
        }

        // MOFU
        const engCtx = document.getElementById('chart-engagement-mini');
        if (engCtx) new Chart(engCtx, { type: 'line', data: { labels: [1, 2, 3, 4, 5], datasets: [{ data: [45, 52, 48, 60, 55], borderColor: '#d946ef', backgroundColor: (context) => Dashboard.createGradient(context.chart.ctx, 'rgb(217, 70, 239)'), fill: true, tension: 0.4, pointRadius: 0 }] }, options: { scales: { x: { display: false }, y: { display: false } } } });

        // BOFU
        const winCtx = document.getElementById('chart-win-mini');
        if (winCtx) new Chart(winCtx, { type: 'line', data: { labels: [1, 2, 3, 4, 5], datasets: [{ data: [12, 14, 13, 18, 18], borderColor: '#f43f5e', backgroundColor: (context) => Dashboard.createGradient(context.chart.ctx, 'rgb(244, 63, 94)'), fill: true, tension: 0.4, pointRadius: 0 }] }, options: { scales: { x: { display: false }, y: { display: false } } } });
    },

    renderOutbound: () => {
        // Trend
        const emailCtx = document.getElementById('chart-email-trend');
        if (emailCtx) {
            const emailD = MockData.getEmailsTrend();
            new Chart(emailCtx, {
                type: 'line',
                data: {
                    labels: emailD.labels,
                    datasets: [
                        {
                            label: 'Sent',
                            data: emailD.sent,
                            borderColor: '#6366f1',
                            backgroundColor: (ctx) => Dashboard.createGradient(ctx.chart.ctx, 'rgb(99, 102, 241)'),
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Opened',
                            data: emailD.opened,
                            borderColor: '#10b981',
                            backgroundColor: (ctx) => Dashboard.createGradient(ctx.chart.ctx, 'rgb(16, 185, 129)'),
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Clicked',
                            data: emailD.clicked,
                            borderColor: '#f43f5e',
                            backgroundColor: (ctx) => Dashboard.createGradient(ctx.chart.ctx, 'rgb(244, 63, 94)'),
                            fill: true,
                            tension: 0.4
                        }
                    ]
                }
            });
        }

        // Sequences (Horizontal Bar)
        const seqCtx = document.getElementById('chart-sequences');
        if (seqCtx) {
            new Chart(seqCtx, {
                type: 'bar',
                data: {
                    labels: ['CEO Outreach', 'VP Sales Intro', 'Webinar Invite', 'Case Study', 'Follow-up'],
                    datasets: [{ label: 'Recipients', data: [4200, 3100, 2400, 1800, 1200], backgroundColor: '#ffffff', barThickness: 8, borderRadius: 4 }]
                },
                options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 } } } }, maintainAspectRatio: false }
            });
        }

        // Outbound Donut (Source Mini)
        const srcMiniCtx = document.getElementById('chart-source-mini');
        if (srcMiniCtx) {
            new Chart(srcMiniCtx, {
                type: 'doughnut',
                data: { labels: ['Email', 'Call', 'LinkedIn'], datasets: [{ data: [45, 25, 30], backgroundColor: ['#6366f1', '#10b981', '#0ea5e9'], borderWidth: 0 }] },
                options: { cutout: '70%', plugins: { legend: { display: false } }, maintainAspectRatio: false }
            });
        }
    },

    renderMarket: () => {
        // BOFU Distribution (Removed)
    },



    buildSideLegend: (containerId, labels, colors, data, suffix = '') => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        labels.forEach((label, index) => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.innerHTML = `<div><span class="legend-color" style="background:${colors[index]}"></span> ${label}</div><span class="legend-val">${data[index]}${suffix}</span>`;
            container.appendChild(item);
        });
    },

    renderCustomHTML: () => {
        // 1. BOFU Table (Priority)
        const bofuTableBody = document.getElementById('bofu-leads-body');
        if (bofuTableBody) {
            bofuTableBody.innerHTML = '';
            const leads = [
                { name: 'Sarah Connor', title: 'VP Engineering', company: 'Skynet Inc', score: 98, activity: 'Opened 3 emails' },
                { name: 'Kyle Reese', title: 'Director of Ops', company: 'Resistance Ltd', score: 92, activity: 'Replied to sequence' },
                { name: 'John Smith', title: 'CEO', company: 'Matrix Corp', score: 88, activity: 'Viewed Profile' },
                { name: 'Alice Johnson', title: 'CMO', company: 'Umbrella Corp', score: 85, activity: 'Clicked Link' },
                { name: 'Bob Anderson', title: 'CTO', company: 'Initech', score: 82, activity: 'Booked Meeting' }
            ];
            leads.forEach(lead => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><div style="font-weight:600; color:#fff;">${lead.name}</div></td>
                    <td>${lead.title}</td>
                    <td>${lead.company}</td>
                    <td><span class="badge-status" style="background:rgba(16, 185, 129, 0.2); color:#34d399; font-weight:700;">${lead.score}</span></td>
                    <td style="font-size:0.8rem; color:#94a3b8;">${lead.activity}</td>
                `;
                bofuTableBody.appendChild(row);
            });
        }



        // 3. Website Visitors (Sequence)
        const seqTable = document.getElementById('table-web-sequence');
        if (seqTable) {
            seqTable.innerHTML = '';
            try {
                const data = MockData.getWebsiteVisitorsSequence();
                data.forEach(d => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td><div style="font-weight:600; color:#fff;">${d.name}</div></td><td>${d.visitor}</td><td style="color:#6366f1; font-size:0.85rem;">${d.source}</td>`;
                    seqTable.appendChild(tr);
                });
            } catch (e) { console.warn('Seq Table Error', e); }
        }

        // 4. Website Visitors (Organic)
        const orgTable = document.getElementById('table-web-organic');
        if (orgTable) {
            orgTable.innerHTML = '';
            try {
                const data = MockData.getWebsiteVisitorsNotSequence();
                data.forEach(d => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td><div style="font-weight:600; color:#fff;">${d.name}</div></td><td>${d.source}</td><td style="color:#94a3b8; font-size:0.85rem;">${d.time}</td>`;
                    orgTable.appendChild(tr);
                });
            } catch (e) { console.warn('Org Table Error', e); }
        }

        // 5. Engaged Contacts
        const engTable = document.getElementById('table-engaged-contacts');
        if (engTable) {
            engTable.innerHTML = '';
            try {
                const data = MockData.getEngagedContacts();
                data.forEach(d => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td><div style="font-weight:600; color:#fff;">${d.name}</div><div style="font-size:0.75rem; color:#64748b">${d.company}</div></td><td><span class="badge-status" style="background:rgba(245, 158, 11, 0.2); color:#fbbf24; font-weight:700;">${d.score}</span></td><td style="font-size:0.8rem">${d.lastActive}</td>`;
                    engTable.appendChild(tr);
                });
            } catch (e) { console.warn('Eng Table Error', e); }
        }
    }
};

// Auto-Init
document.addEventListener('DOMContentLoaded', Dashboard.init);
