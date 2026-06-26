document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic for Dashboard
    const navItems = document.querySelectorAll('.dashboard-sidebar .nav-item');
    const tabContents = document.querySelectorAll('.dashboard-main .tab-content');

    if(navItems.length > 0 && tabContents.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all
                navItems.forEach(nav => nav.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));

                // Add active class to clicked
                item.classList.add('active');
                const targetTab = document.getElementById(item.getAttribute('data-tab'));
                if(targetTab) {
                    targetTab.classList.add('active');
                }
                
                // Close sidebar on mobile after click
                if(window.innerWidth <= 1024) {
                    document.getElementById('sidebar').classList.remove('show');
                }
            });
        });
    }

    // Generate dummy heat map data
    const activityMap = document.getElementById('activityMap');
    if(activityMap) {
        for(let i = 0; i < 210; i++) {
            const cell = document.createElement('div');
            cell.className = 'heat-cell';
            // Randomly assign heat levels
            if(Math.random() > 0.6) {
                const heat = Math.floor(Math.random() * 4) + 1;
                cell.classList.add('heat-' + heat);
            }
            activityMap.appendChild(cell);
        }
    }
});
