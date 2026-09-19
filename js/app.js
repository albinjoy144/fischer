/**
 * fischer Promotion Management - Application Core Logic & View Controller
 */

class AppController {
  constructor() {
    this.currentView = localStorage.getItem("fischer_active_view") || "dashboard";
    this.activeReportPeriod = "monthly";
    this.charts = {};
    this.uploadedPhotos = [];
    this.init();
  }

  init() {
    this.bindEvents();
    this.restoreSession();
    this.syncCurrentUserUI();
    this.navigate(this.currentView);
  }

  restoreSession() {
    const loginScreen = document.getElementById("login-screen");
    const appContainer = document.getElementById("app-container");
    const isLoggedIn = window.store && window.store.isLoggedIn;

    if (isLoggedIn) {
      document.documentElement.classList.add("is-authenticated");
      if (loginScreen) loginScreen.style.display = "none";
      if (appContainer) appContainer.style.display = "flex";
    } else {
      document.documentElement.classList.remove("is-authenticated");
      if (loginScreen) loginScreen.style.display = "flex";
      if (appContainer) appContainer.style.display = "none";
    }
  }

  // Bind Global UI Listeners
  bindEvents() {
    // Navigation Links
    document.querySelectorAll("[data-nav]").forEach(item => {
      item.addEventListener("click", (e) => {
        const viewId = item.getAttribute("data-nav");
        this.navigate(viewId);
        this.closeMobileSidebar();
      });
    });

    // Mobile Sidebar Drawer Toggle
    const toggleBtn = document.getElementById("btn-sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");

    if (toggleBtn && sidebar && backdrop) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        backdrop.classList.toggle("active");
      });

      backdrop.addEventListener("click", () => {
        this.closeMobileSidebar();
      });
    }

    // Role Switcher in Top Nav (if present)
    const roleSelect = document.getElementById("top-role-select");
    if (roleSelect) {
      roleSelect.addEventListener("change", (e) => {
        window.store.setRole(e.target.value);
        this.syncCurrentUserUI();
        this.showToast(`Switched active perspective to: ${e.target.value}`, "info");
        this.renderCurrentView();
      });
    }

    // Currency Switcher
    const currencySelect = document.getElementById("currency-select");
    if (currencySelect) {
      currencySelect.addEventListener("change", (e) => {
        window.store.currency = e.target.value;
        window.store.saveState();
        this.showToast(`Currency set to ${e.target.value}`, "info");
        this.renderCurrentView();
      });
    }

    // Close user dropdown on outside click
    document.addEventListener("click", (e) => {
      const dropdown = document.getElementById("topbar-user-dropdown");
      const menu = document.getElementById("user-dropdown-menu");
      if (dropdown && menu && !dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        menu.classList.remove("show");
      }
    });

    // Reset Master Data Button
    const resetBtn = document.getElementById("btn-reset-demo");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetDemoData());
    }

    // Modal Close buttons
    document.querySelectorAll(".modal-close-trigger").forEach(btn => {
      btn.addEventListener("click", () => this.closeAllModals());
    });

    // Close modal on backdrop click
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.closeAllModals();
      });
    });
  }

  toggleReportsMenu(e) {
    if (e) e.stopPropagation();
    const group = document.getElementById("nav-group-reports");
    if (group) {
      group.classList.toggle("expanded");
    }
  }

  toggleUserDropdown(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById("topbar-user-dropdown");
    const menu = document.getElementById("user-dropdown-menu");
    if (dropdown && menu) {
      dropdown.classList.toggle("open");
      menu.classList.toggle("show");
    }
  }

  switchRoleFromDropdown(role) {
    window.store.setRole(role);
    this.syncCurrentUserUI();
    const dropdown = document.getElementById("topbar-user-dropdown");
    const menu = document.getElementById("user-dropdown-menu");
    if (dropdown) dropdown.classList.remove("open");
    if (menu) menu.classList.remove("show");
    this.showToast(`Switched perspective to: ${role}`, "info");
    this.renderCurrentView();
  }

  resetDemoData() {
    if (confirm("Reset all data back to original fischer seed dataset?")) {
      window.store.resetToDefaults();
      this.syncCurrentUserUI();
      const dropdown = document.getElementById("topbar-user-dropdown");
      const menu = document.getElementById("user-dropdown-menu");
      if (dropdown) dropdown.classList.remove("open");
      if (menu) menu.classList.remove("show");
      this.showToast("Data restored to factory defaults", "success");
      this.renderCurrentView();
    }
  }

  showNotificationModal() {
    const modal = document.getElementById("generic-modal");
    const title = document.getElementById("generic-modal-title");
    const body = document.getElementById("generic-modal-body");
    if (!modal || !title || !body) return;

    title.innerHTML = '<i class="fa-solid fa-bell" style="color: #E30613;"></i> Notifications & Activity Alerts';
    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; gap: 12px; padding: 12px; background: #FEF2F2; border-radius: 8px; border-left: 4px solid #E30613;">
          <i class="fa-solid fa-triangle-exclamation" style="color: #E30613; margin-top: 3px; font-size: 1.1rem;"></i>
          <div>
            <div style="font-weight: 600; color: #1E293B; font-size: 0.9rem;">High Promotion Spend with Low Sales ROI</div>
            <div style="color: #64748B; font-size: 0.82rem; margin-top: 2px;">Apex Fasteners branch spent AED 28,000 in Retail Road Show but sales achievement is at 48% of target.</div>
            <div style="color: #94A3B8; font-size: 0.75rem; margin-top: 4px;">10 minutes ago • Supervisor: David Lee</div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; padding: 12px; background: #EFF6FF; border-radius: 8px; border-left: 4px solid #2563EB;">
          <i class="fa-solid fa-camera" style="color: #2563EB; margin-top: 3px; font-size: 1.1rem;"></i>
          <div>
            <div style="font-weight: 600; color: #1E293B; font-size: 0.9rem;">New Event Proof Photos Uploaded</div>
            <div style="color: #64748B; font-size: 0.82rem; margin-top: 2px;">Sara Ahmed uploaded 3 POS Wall Display execution photos for Al Naboodah Hardware branch.</div>
            <div style="color: #94A3B8; font-size: 0.75rem; margin-top: 4px;">1 hour ago • Pending Head Approval</div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; padding: 12px; background: #F0FDF4; border-radius: 8px; border-left: 4px solid #16A34A;">
          <i class="fa-solid fa-trophy" style="color: #16A34A; margin-top: 3px; font-size: 1.1rem;"></i>
          <div>
            <div style="font-weight: 600; color: #1E293B; font-size: 0.9rem;">Target Exceeded (118.2%)</div>
            <div style="color: #64748B; font-size: 0.82rem; margin-top: 2px;">Fine Tools Deira branch exceeded Q1 fixing systems sales target following the Ramadan date box campaign.</div>
            <div style="color: #94A3B8; font-size: 0.75rem; margin-top: 4px;">3 hours ago • Supervisor: Ramesh Kumar</div>
          </div>
        </div>

        <div style="text-align: right; margin-top: 8px;">
          <button class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Close</button>
        </div>
      </div>
    `;
    modal.classList.add("active");
  }

  togglePasswordVisibility() {
    const pwdInput = document.getElementById("login-password-input");
    const eyeIcon = document.getElementById("pwd-eye-icon");
    if (!pwdInput || !eyeIcon) return;
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    } else {
      pwdInput.type = "password";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    }
  }

  handleLoginFormSubmit(e) {
    if (e) e.preventDefault();
    const usernameInput = document.getElementById("login-username-input");
    const userVal = (usernameInput ? usernameInput.value : "").trim().toLowerCase();

    let targetRole = "Company Admin";
    let entityId = null;

    if (userVal.includes("head") || userVal.includes("markus")) {
      targetRole = "Sales / Marketing Head";
    } else if (userVal.includes("supervisor") || userVal.includes("david") || userVal.includes("ramesh") || userVal.includes("ahmed")) {
      targetRole = "Sales Supervisor";
    } else if (userVal.includes("dealer") || userVal.includes("naboodah") || userVal.includes("fine tools")) {
      targetRole = "Dealer User";
    }

    this.loginAsRole(targetRole, entityId);
  }

  logout() {
    if (window.store) {
      window.store.isLoggedIn = false;
      window.store.saveState();
    }
    document.documentElement.classList.remove("is-authenticated");
    localStorage.removeItem("fischer_active_view");
    const loginScreen = document.getElementById("login-screen");
    const appContainer = document.getElementById("app-container");
    if (loginScreen) loginScreen.style.display = "flex";
    if (appContainer) appContainer.style.display = "none";
    const dropdown = document.getElementById("topbar-user-dropdown");
    const menu = document.getElementById("user-dropdown-menu");
    if (dropdown) dropdown.classList.remove("open");
    if (menu) menu.classList.remove("show");
    this.showToast("Signed out successfully", "info");
  }

  loginAsRole(role = "Company Admin", entityId = null) {
    if (window.store) {
      window.store.isLoggedIn = true;
      window.store.setRole(role, entityId);
    }
    document.documentElement.classList.add("is-authenticated");
    this.syncCurrentUserUI();
    const loginScreen = document.getElementById("login-screen");
    const appContainer = document.getElementById("app-container");
    if (loginScreen) loginScreen.style.display = "none";
    if (appContainer) appContainer.style.display = "flex";
    this.showToast(`Logged in as ${role}`, "success");
    this.renderCurrentView();
  }

  closeMobileSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("active");
  }

  syncCurrentUserUI() {
    const user = window.store.currentUser;
    const roleSelect = document.getElementById("top-role-select");
    if (roleSelect) roleSelect.value = user.role;

    const currencySelect = document.getElementById("currency-select");
    if (currencySelect) currencySelect.value = window.store.currency;

    const topbarUserName = document.getElementById("topbar-user-name");
    const dropdownUserName = document.getElementById("dropdown-user-name");
    const dropdownUserRole = document.getElementById("dropdown-user-role");

    if (topbarUserName) topbarUserName.textContent = user.role || user.name;
    if (dropdownUserName) dropdownUserName.textContent = user.name;
    if (dropdownUserRole) dropdownUserRole.textContent = user.role;

    const userNameEl = document.getElementById("header-user-name");
    const userRoleEl = document.getElementById("header-user-role");
    const avatarEl = document.getElementById("header-user-avatar");

    if (userNameEl) userNameEl.textContent = user.name;
    if (userRoleEl) userRoleEl.textContent = user.role;
    if (avatarEl) {
      const initials = user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
      avatarEl.textContent = initials || "FI";
    }
  }

  navigate(viewId) {
    this.currentView = viewId;
    localStorage.setItem("fischer_active_view", viewId);
    this.closeMobileSidebar();

    // Update active class in sidebar items
    document.querySelectorAll(".sidebar-nav .nav-item:not(.nav-group-header)").forEach(el => {
      el.classList.toggle("active", el.getAttribute("data-nav") === viewId);
    });

    // Update active class in subnav items
    let isSubnavActive = false;
    document.querySelectorAll(".subnav-item").forEach(el => {
      const isActive = el.getAttribute("data-nav") === viewId;
      el.classList.toggle("active", isActive);
      if (isActive) isSubnavActive = true;
    });

    const reportsGroup = document.getElementById("nav-group-reports");
    if (reportsGroup) {
      if (isSubnavActive) {
        reportsGroup.classList.add("expanded");
      }
    }

    // Show active view container
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });
    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) {
      targetSection.classList.add("active");
    }

    // Update Breadcrumb Title
    const breadcrumb = document.getElementById("breadcrumb-current");
    if (breadcrumb) {
      breadcrumb.textContent = this.getViewTitle(viewId);
    }

    this.renderCurrentView();
  }

  getViewTitle(viewId) {
    const titles = {
      dashboard: "Dashboard",
      master_events: "Promotion / Branding",
      manage_heads: "Sales / Marketing Head",
      manage_supervisors: "Sales Supervisor",
      manage_dealers: "Dealer",
      manage_events: "Events",
      dealer_sales: "Dealer Sales",
      reports_head: "Event Report",
      reports_supervisor: "Sales Supervisor Report",
      reports_dealer: "Dealer Sales Report",
      reports_gap: "Dealer Activity Report"
    };
    return titles[viewId] || "Promotion Management";
  }

  renderCurrentView() {
    switch (this.currentView) {
      case "dashboard":
        this.renderDashboard();
        break;
      case "master_events":
        this.renderMasterEvents();
        break;
      case "manage_heads":
        this.renderSalesHeads();
        break;
      case "manage_supervisors":
        this.renderSupervisors();
        break;
      case "manage_dealers":
        this.renderDealers();
        break;
      case "manage_events":
        this.renderEvents();
        break;
      case "dealer_sales":
        this.renderSales();
        break;
      case "reports_head":
        this.renderHeadReport();
        break;
      case "reports_supervisor":
        this.renderSupervisorReport();
        break;
      case "reports_dealer":
        this.renderDealerReport();
        break;
      case "reports_gap":
        this.renderGapAnalysisReport();
        break;
    }
  }

  /* ==========================================================================
     1. Dashboard View
     ========================================================================== */
  renderDashboard() {
    const totalDealers = window.store.dealers.length;
    let totalBranches = 0;
    let totalTarget = 0;
    window.store.dealers.forEach(d => {
      totalBranches += (d.branches ? d.branches.length : 0);
      totalTarget += Number(d.salesTarget || 0);
    });

    const totalSales = window.store.sales.reduce((sum, s) => sum + Number(s.salesAmount || 0), 0);
    const totalEventSpend = window.store.events.reduce((sum, e) => sum + Number(e.amountSpend || 0), 0);
    const activeEventsCount = window.store.events.filter(e => e.status === "Active").length;
    const overallAchievement = totalTarget > 0 ? Math.round((totalSales / totalTarget) * 100) : 0;

    // Stat Cards (Reference 6-Card Row)
    const statsContainer = document.getElementById("dashboard-stats-grid");
    if (statsContainer) {
      statsContainer.className = "metrics-row-6";
      statsContainer.innerHTML = `
        <!-- Card 1: Total Sales (AED) -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon red"><i class="fa-solid fa-coins"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Sales (${window.store.currency})</div>
              <div class="ref-card-value">${window.store.formatMoney(totalSales).replace(window.store.currency + ' ', '')}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text up"><i class="fa-solid fa-arrow-up"></i> +18% <span style="font-weight: 500; color: #64748B;">vs. last period</span></div>
          </div>
          <svg class="ref-wave-bg" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0,80 C150,140 350,20 500,90 L500,150 L0,150 Z" fill="#E30613"></path>
          </svg>
        </div>

        <!-- Card 2: Total Target (AED) -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon orange"><i class="fa-solid fa-bullseye"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Target (${window.store.currency})</div>
              <div class="ref-card-value">${window.store.formatMoney(totalTarget).replace(window.store.currency + ' ', '')}</div>
            </div>
          </div>
          <div class="ref-card-bottom" style="flex-direction: column; align-items: flex-start; gap: 6px;">
            <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.72rem; font-weight: 700; color: #FF7A00;">
              <span>Target Progress</span>
              <span>${overallAchievement}%</span>
            </div>
            <div class="ref-progress-track">
              <div class="ref-progress-fill orange" style="width: ${Math.min(overallAchievement, 100)}%;"></div>
            </div>
          </div>
        </div>

        <!-- Card 3: Achievement -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon green"><i class="fa-solid fa-trophy"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Achievement</div>
              <div class="ref-card-value">${overallAchievement}%</div>
            </div>
          </div>
          <div class="ref-card-bottom" style="margin-top: 14px;">
            <div class="ref-progress-track">
              <div class="ref-progress-fill green" style="width: ${Math.min(overallAchievement, 100)}%;"></div>
            </div>
          </div>
        </div>

        <!-- Card 4: Total Supervisors -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon purple"><i class="fa-solid fa-users"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Supervisors</div>
              <div class="ref-card-value">${window.store.supervisors.length}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text purple"><i class="fa-solid fa-users"></i> Active</div>
            <svg class="ref-sparkline-svg" viewBox="0 0 60 24">
              <path d="M0,18 Q15,4 30,12 T60,6" fill="none" stroke="#7C3AED" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Card 5: Total Dealers -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon blue"><i class="fa-solid fa-store"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Dealers</div>
              <div class="ref-card-value">${totalDealers}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text blue"><i class="fa-solid fa-arrow-up"></i> +2 accounts</div>
            <svg class="ref-sparkline-svg" viewBox="0 0 60 24">
              <path d="M0,20 Q15,16 30,8 T60,4" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Card 6: Total Branches -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon teal"><i class="fa-solid fa-building"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Branches</div>
              <div class="ref-card-value">${totalBranches}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text teal"><i class="fa-solid fa-arrow-up"></i> +3 stores</div>
            <svg class="ref-sparkline-svg" viewBox="0 0 60 24">
              <path d="M0,22 Q20,18 35,10 T60,2" fill="none" stroke="#0D9488" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      `;
    }

    // Top Performing Branches Table
    const topBranchesTbody = document.getElementById("dash-top-branches-tbody");
    if (topBranchesTbody) {
      const branchPerformance = [];
      window.store.dealers.forEach(dealer => {
        if (dealer.branches) {
          dealer.branches.forEach(branch => {
            const branchSales = window.store.sales
              .filter(s => s.dealerId === dealer.id && s.branchId === branch.id)
              .reduce((sum, s) => sum + Number(s.salesAmount || 0), 0);
            const target = branch.target || Math.round(dealer.salesTarget / dealer.branches.length);
            const badge = window.store.getAchievementBadge(branchSales, target);
            branchPerformance.push({
              branchName: branch.name,
              dealerName: dealer.name,
              location: branch.location,
              sales: branchSales,
              target: target,
              badge: badge
            });
          });
        }
      });

      branchPerformance.sort((a, b) => b.badge.pct - a.badge.pct);

      topBranchesTbody.innerHTML = branchPerformance.slice(0, 5).map((b, idx) => `
        <tr>
          <td><span style="font-weight: 700; color: var(--text-muted);">#${idx + 1}</span></td>
          <td>
            <strong>${b.branchName}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${b.dealerName}</div>
          </td>
          <td><span class="badge badge-neutral"><i class="fa-solid fa-location-dot"></i> ${b.location}</span></td>
          <td><strong>${window.store.formatMoney(b.sales)}</strong></td>
          <td><span class="badge ${b.badge.class}">${b.badge.label} (${b.badge.text})</span></td>
        </tr>
      `).join("");
    }

    // Recent Events Table
    const recentEventsTbody = document.getElementById("dash-recent-events-tbody");
    if (recentEventsTbody) {
      const recent = [...window.store.events].reverse().slice(0, 5);
      recentEventsTbody.innerHTML = recent.map(ev => {
        const dealer = window.store.getDealer(ev.dealerId);
        const branch = window.store.getBranch(ev.dealerId, ev.branchId);
        const et = window.store.getEventType(ev.eventTypeId);
        const act = window.store.getActivity(ev.eventTypeId, ev.activityId);

        return `
          <tr>
            <td><span style="font-size: 0.8rem; color: var(--text-muted);">${ev.date}</span></td>
            <td>
              <strong>${dealer ? dealer.name : 'Unknown'}</strong>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${branch ? branch.name : ''}</div>
            </td>
            <td>
              <span style="font-weight: 600; color: var(--fischer-red);">${act ? act.name : (et ? et.name : 'Activity')}</span>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${et ? et.name : ''}</div>
            </td>
            <td><span class="badge badge-neutral"><i class="fa-solid fa-location-dot"></i> ${ev.location}</span></td>
            <td><strong>${window.store.formatMoney(ev.amountSpend)}</strong></td>
            <td><span class="status-tag ${ev.status === 'Active' ? 'active' : 'inactive'}">${ev.status}</span></td>
          </tr>
        `;
      }).join("");
    }

    // Charts Rendering
    this.renderDashboardCharts();
  }

  renderDashboardCharts() {
    // 1. Exact Sales vs Target by Sales Supervisor Chart
    const ctxSupervisorSales = document.getElementById("chart-sales-vs-target-main");
    if (ctxSupervisorSales) {
      if (this.charts.dashSupervisorSales) this.charts.dashSupervisorSales.destroy();

      const supervisors = [
        { code: "RK", name: "Ramesh Kumar", sales: 75200, target: 90000 },
        { code: "SA", name: "Sara Ahmed", sales: 48600, target: 60000 },
        { code: "MA", name: "Mohammed Ali", sales: 39800, target: 50000 },
        { code: "AS", name: "Anita Sharma", sales: 57300, target: 70000 },
        { code: "DL", name: "David Lee", sales: 24900, target: 50000 }
      ];

      const labels = supervisors.map(s => s.name);
      const salesData = supervisors.map(s => s.sales);
      const targetData = supervisors.map(s => s.target);

      // Custom plugin to draw numbers above bars
      const barLabelsPlugin = {
        id: 'barLabelsPlugin',
        afterDatasetsDraw(chart) {
          const { ctx } = chart;
          ctx.save();
          chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.data.forEach((bar, index) => {
              const val = dataset.data[index];
              if (val != null) {
                const formattedVal = Number(val).toLocaleString();
                ctx.fillStyle = '#1E293B';
                ctx.font = 'bold 9.5px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(formattedVal, bar.x, bar.y - 3);
              }
            });
          });
          ctx.restore();
        }
      };

      this.charts.dashSupervisorSales = new Chart(ctxSupervisorSales, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Sales Amount',
              data: salesData,
              backgroundColor: '#E30613',
              borderRadius: 4,
              barPercentage: 0.65,
              categoryPercentage: 0.55
            },
            {
              label: 'Sales Target',
              data: targetData,
              backgroundColor: '#BFDBFE',
              borderRadius: 4,
              barPercentage: 0.65,
              categoryPercentage: 0.55
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: AED ${Number(ctx.raw).toLocaleString()}`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100000,
              ticks: {
                stepSize: 20000,
                callback: (val) => Number(val).toLocaleString(),
                font: { size: 10, family: 'Inter', weight: 600 },
                color: '#64748B'
              },
              grid: { color: '#F1F5F9' }
            },
            x: {
              grid: { display: false },
              ticks: {
                font: { size: 10.5, family: 'Inter', weight: 600 },
                color: '#334155',
                maxRotation: 0,
                autoSkip: false
              }
            }
          }
        },
        plugins: [barLabelsPlugin]
      });
    }

    // 2. Exact Supervisors by Target Achievement Donut Chart
    const ctxSupervisorDonut = document.getElementById("chart-supervisors-donut");
    if (ctxSupervisorDonut) {
      if (this.charts.dashSupervisorDonut) this.charts.dashSupervisorDonut.destroy();

      this.charts.dashSupervisorDonut = new Chart(ctxSupervisorDonut, {
        type: 'doughnut',
        data: {
          labels: ['100% and above', '60% - 80%', 'Less than 60%'],
          datasets: [{
            data: [2, 2, 1],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.label}: ${ctx.raw} (${ctx.raw === 2 ? '40%' : '20%'})`
              }
            }
          }
        }
      });
    }
  }

  /* ==========================================================================
     2. Promotion / Branding Master Data View
     ========================================================================== */
  renderMasterEvents() {
    const container = document.getElementById("master-events-container");
    if (!container) return;

    const eventTypes = window.store.eventTypes;
    const selectedTypeId = this.selectedMasterTypeId || (eventTypes.length > 0 ? eventTypes[0].id : null);
    this.selectedMasterTypeId = selectedTypeId;

    const currentType = window.store.getEventType(selectedTypeId) || eventTypes[0];

    container.innerHTML = `
      <div class="page-title-row">
        <div>
          <h2 class="page-title">Promotion / Branding Activities (Master Data)</h2>
          <p class="page-subtitle">Configure promotion event types, POS displays, print items, campaigns and sample visual collateral.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="app.openAddActivityModal()"><i class="fa-solid fa-plus"></i> Add Activity to ${currentType ? currentType.name : 'Category'}</button>
        </div>
      </div>

      <div class="card" style="background: #EFF6FF; border-color: #BFDBFE; margin-bottom: 20px;">
        <div class="card-body" style="padding: 12px 18px; display: flex; align-items: center; gap: 12px; font-size: 0.86rem; color: #1E40AF;">
          <i class="fa-solid fa-circle-info" style="font-size: 1.2rem;"></i>
          <span>Create and manage Event Types (e.g. Events, Celebration, POS, Giveaways) in pop-up modals, and configure specific activities with sample photo proofs below.</span>
        </div>
      </div>

      <!-- Event Types List Table -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <h3 class="card-title"><i class="fa-solid fa-list-check"></i> Promotion Categories / Event Types (${eventTypes.length})</h3>
            <span class="badge badge-neutral">${eventTypes.filter(e => e.status === 'Active').length} Active</span>
          </div>
          <button class="btn btn-sm btn-primary" onclick="app.openAddEventTypeModal()"><i class="fa-solid fa-folder-plus"></i> Add / Edit Event Type</button>
        </div>
        <div class="table-responsive">
          <table class="data-table" id="event-types-table">
            <thead>
              <tr>
                <th style="width: 40px; text-align: center;">#</th>
                <th style="white-space: nowrap; min-width: 170px;">Event Type Name</th>
                <th>Description</th>
                <th style="text-align: center; width: 140px;">Configured Activities</th>
                <th style="text-align: center; width: 95px;">Status</th>
                <th style="text-align: center; width: 95px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${eventTypes.map((et, idx) => `
                <tr style="${et.id === selectedTypeId ? 'background: #FEF2F2;' : ''}">
                  <td style="text-align: center; font-weight: 600; color: #64748B;">${idx + 1}</td>
                  <td style="white-space: nowrap;">
                    <strong style="color: ${et.id === selectedTypeId ? 'var(--fischer-red)' : '#1E293B'}; cursor: pointer; font-size: 0.92rem;" onclick="app.selectMasterType('${et.id}')" title="Click to view activities">
                      ${et.name} ${et.id === selectedTypeId ? ' <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem; margin-left: 4px;"></i>' : ''}
                    </strong>
                  </td>
                  <td><span style="font-size: 0.83rem; color: #475569; line-height: 1.4; display: block;">${et.description || '-'}</span></td>
                  <td style="text-align: center;"><span class="badge badge-info" style="cursor: pointer;" onclick="app.selectMasterType('${et.id}')">${et.activities ? et.activities.length : 0} items</span></td>
                  <td style="text-align: center;"><span class="status-tag ${et.status === 'Active' ? 'active' : 'inactive'}">${et.status}</span></td>
                  <td style="text-align: center;">
                    <div style="display: inline-flex; gap: 6px; justify-content: center;">
                      <button class="btn-icon edit" title="Edit Event Type" onclick="app.openAddEventTypeModal('${et.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                      <button class="btn-icon toggle-status" title="Toggle Status" onclick="app.toggleEventTypeStatus('${et.id}')">
                        <i class="fa-solid ${et.status === 'Active' ? 'fa-ban' : 'fa-check'}"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Activities under Selected Event Type -->
      ${currentType ? `
        <div class="card" style="margin-top: 24px;">
          <div class="card-header">
            <div style="display: flex; align-items: center; gap: 12px;">
              <h3 class="card-title"><i class="fa-solid fa-layer-group"></i> Activities under "${currentType.name}"</h3>
              <span class="badge badge-info">${currentType.activities ? currentType.activities.length : 0} items configured</span>
            </div>
            <button class="btn btn-sm btn-primary" onclick="app.openAddActivityModal('${currentType.id}')"><i class="fa-solid fa-plus"></i> Add New Activity</button>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Activity / Event Name</th>
                  <th>Category</th>
                  <th>Sample Photo Proof</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${(currentType.activities || []).map((act, idx) => `
                  <tr>
                    <td>${idx + 1}</td>
                    <td><strong style="font-size: 0.92rem;">${act.name}</strong></td>
                    <td><span class="badge badge-neutral">${currentType.name}</span></td>
                    <td>
                      ${act.samplePhoto ? `
                        <img src="${act.samplePhoto}" class="table-img-thumb" title="Click to view sample" onclick="app.viewPhotoModal('${act.samplePhoto}', '${act.name}')" />
                      ` : '<span style="color: var(--text-muted); font-size: 0.8rem;">No photo</span>'}
                    </td>
                    <td><span class="status-tag ${act.status === 'Active' ? 'active' : 'inactive'}">${act.status}</span></td>
                    <td>
                      <div style="display: flex; gap: 4px;">
                        <button class="btn-icon edit" title="Edit Activity" onclick="app.editActivity('${currentType.id}', '${act.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn-icon toggle-status" title="Toggle Status" onclick="app.toggleActivityStatus('${currentType.id}', '${act.id}')">
                          <i class="fa-solid ${act.status === 'Active' ? 'fa-ban' : 'fa-check'}"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    `;
  }

  selectMasterType(typeId) {
    this.selectedMasterTypeId = typeId;
    this.renderMasterEvents();
  }

  openAddEventTypeModal(typeId = null) {
    const isEdit = !!typeId;
    const et = isEdit ? window.store.getEventType(typeId) : null;
    const modalBody = document.getElementById("generic-modal-body");
    const modalTitle = document.getElementById("generic-modal-title");

    modalTitle.innerHTML = `<i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-folder-plus'}" style="color: var(--fischer-red); margin-right: 8px;"></i> ${isEdit ? `Edit Event Type: ${et.name}` : 'Add / Edit Event Type'}`;

    modalBody.innerHTML = `
      <form id="form-event-type-modal" onsubmit="app.handleSaveEventTypeModal(event, '${typeId || ''}')">
        <div class="form-group">
          <label class="form-label">Event Type Name <span class="req">*</span></label>
          <input type="text" id="modal-event-type-name" class="form-control" placeholder="e.g. Events, Celebration, POS, Print, Giveaways" value="${et ? et.name : ''}" required autofocus>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea id="modal-event-type-desc" class="form-control" rows="3" placeholder="Describe the purpose of this promotion category...">${et ? (et.description || '') : ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Status</label>
          <select id="modal-event-type-status" class="form-control">
            <option value="Active" ${!et || et.status === 'Active' ? 'selected' : ''}>Active</option>
            <option value="Inactive" ${et && et.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-color);">
          <button type="button" class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> ${isEdit ? 'Update Event Type' : 'Save Event Type'}</button>
        </div>
      </form>
    `;

    document.getElementById("generic-modal").classList.add("active");
  }

  handleSaveEventTypeModal(e, typeId = null) {
    e.preventDefault();
    const name = document.getElementById("modal-event-type-name").value.trim();
    const desc = document.getElementById("modal-event-type-desc").value.trim();
    const status = document.getElementById("modal-event-type-status").value;

    if (!name) {
      this.showToast("Event Type name is required", "error");
      return;
    }

    if (typeId) {
      const et = window.store.getEventType(typeId);
      if (et) {
        et.name = name;
        et.description = desc;
        et.status = status;
        window.store.saveState();
        this.showToast(`Updated Event Type: ${name}`, "success");
      }
    } else {
      const newId = "et_" + Date.now();
      window.store.eventTypes.push({
        id: newId,
        name: name,
        description: desc,
        status: status,
        activities: []
      });
      window.store.saveState();
      this.selectedMasterTypeId = newId;
      this.showToast(`Added new Event Type: ${name}`, "success");
    }

    this.closeAllModals();
    this.renderMasterEvents();
  }

  editEventType(typeId) {
    this.openAddEventTypeModal(typeId);
  }

  toggleEventTypeStatus(typeId) {
    const et = window.store.getEventType(typeId);
    if (!et) return;
    et.status = et.status === "Active" ? "Inactive" : "Active";
    window.store.saveState();
    this.showToast(`Status updated for ${et.name}`, "info");
    this.renderMasterEvents();
  }

  openAddActivityModal(typeId = null) {
    const targetTypeId = typeId || this.selectedMasterTypeId || window.store.eventTypes[0].id;
    const modalBody = document.getElementById("generic-modal-body");
    const modalTitle = document.getElementById("generic-modal-title");

    modalTitle.textContent = "Add New Promotion Activity";
    modalBody.innerHTML = `
      <form id="form-add-activity-modal" onsubmit="app.handleSaveActivityModal(event)">
        <input type="hidden" id="act-modal-id" value="">
        <div class="form-group">
          <label class="form-label">Select Event Type / Category <span class="req">*</span></label>
          <select id="act-modal-type" class="form-control" required>
            ${window.store.eventTypes.map(et => `
              <option value="${et.id}" ${et.id === targetTypeId ? 'selected' : ''}>${et.name}</option>
            `).join("")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Activity Name <span class="req">*</span></label>
          <input type="text" id="act-modal-name" class="form-control" placeholder="e.g. Retail Road Show, Signage Board" required>
        </div>
        <div class="form-group">
          <label class="form-label">Sample Photo URL / Attachment</label>
          <input type="url" id="act-modal-photo" class="form-control" placeholder="https://images.unsplash.com/... or paste image link" value="https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60">
        </div>
        <div class="form-group">
          <label class="form-label">Status</label>
          <select id="act-modal-status" class="form-control">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px;">
          <button type="button" class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Activity</button>
        </div>
      </form>
    `;

    document.getElementById("generic-modal").classList.add("active");
  }

  editActivity(typeId, activityId) {
    const act = window.store.getActivity(typeId, activityId);
    if (!act) return;

    this.openAddActivityModal(typeId);
    setTimeout(() => {
      document.getElementById("generic-modal-title").textContent = "Edit Activity";
      document.getElementById("act-modal-id").value = act.id;
      document.getElementById("act-modal-type").value = typeId;
      document.getElementById("act-modal-name").value = act.name;
      document.getElementById("act-modal-photo").value = act.samplePhoto || "";
      document.getElementById("act-modal-status").value = act.status;
    }, 50);
  }

  handleSaveActivityModal(e) {
    e.preventDefault();
    const actId = document.getElementById("act-modal-id").value;
    const typeId = document.getElementById("act-modal-type").value;
    const name = document.getElementById("act-modal-name").value.trim();
    const photo = document.getElementById("act-modal-photo").value.trim();
    const status = document.getElementById("act-modal-status").value;

    const et = window.store.getEventType(typeId);
    if (!et) return;
    if (!et.activities) et.activities = [];

    if (actId) {
      const existing = et.activities.find(a => a.id === actId);
      if (existing) {
        existing.name = name;
        existing.samplePhoto = photo;
        existing.status = status;
        this.showToast(`Updated activity: ${name}`, "success");
      }
    } else {
      const newActId = "act_" + Date.now();
      et.activities.push({
        id: newActId,
        name: name,
        samplePhoto: photo,
        status: status
      });
      this.showToast(`Added activity: ${name}`, "success");
    }

    window.store.saveState();
    this.closeAllModals();
    this.renderMasterEvents();
  }

  toggleActivityStatus(typeId, activityId) {
    const act = window.store.getActivity(typeId, activityId);
    if (!act) return;
    act.status = act.status === "Active" ? "Inactive" : "Active";
    window.store.saveState();
    this.showToast(`Status updated for ${act.name}`, "info");
    this.renderMasterEvents();
  }

  /* ==========================================================================
     3. Manage Sales / Marketing Head View
     ========================================================================== */
  renderSalesHeads() {
    const container = document.getElementById("manage-heads-container");
    if (!container) return;

    const heads = window.store.salesHeads;

    container.innerHTML = `
      <div class="page-title-row">
        <div>
          <h2 class="page-title">Manage Sales / Marketing Heads</h2>
          <p class="page-subtitle">Configure regional sales directors, assign territorial oversight and manage access.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="app.exportTableToCSV('heads-table', 'fischer_sales_heads.csv')"><i class="fa-solid fa-file-export"></i> Export CSV</button>
        </div>
      </div>

      <!-- Full Width List Table Card -->
      <div class="card">
        <div class="card-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <h3 class="card-title"><i class="fa-solid fa-users"></i> Sales / Marketing Heads List (${heads.length})</h3>
            <span class="badge badge-neutral">${heads.filter(h => h.status === 'Active').length} Active</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-sm btn-primary" onclick="app.openAddHeadModal()"><i class="fa-solid fa-user-plus"></i> Add / Edit Sales Head</button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="data-table" id="heads-table">
            <thead>
              <tr>
                <th style="width: 40px; text-align: center;">#</th>
                <th style="white-space: nowrap; min-width: 170px;">Sales Head</th>
                <th>Region</th>
                <th class="nowrap">Phone</th>
                <th class="nowrap" style="text-align: center;">Supervisors</th>
                <th class="nowrap" style="text-align: center;">Status</th>
                <th class="nowrap" style="text-align: center; width: 95px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${heads.map((h, idx) => {
                const supCount = window.store.supervisors.filter(s => s.headId === h.id).length;
                return `
                  <tr>
                    <td style="text-align: center; color: var(--text-muted); font-weight: 600;">${idx + 1}</td>
                    <td class="head-info-cell">
                      <div class="head-info-name">${h.name}</div>
                      <div class="head-info-email">${h.email}</div>
                    </td>
                    <td class="region-cell"><span class="badge badge-neutral"><i class="fa-solid fa-location-dot"></i> ${h.region}</span></td>
                    <td class="nowrap phone-cell"><i class="fa-solid fa-phone" style="font-size: 0.7rem; color: #94A3B8; margin-right: 5px;"></i>${h.phone}</td>
                    <td class="nowrap supervisors-cell" style="text-align: center;"><span class="badge badge-info">${supCount} ${supCount === 1 ? 'Supervisor' : 'Supervisors'}</span></td>
                    <td class="nowrap status-cell" style="text-align: center;"><span class="status-tag ${h.status === 'Active' ? 'active' : 'inactive'}">${h.status}</span></td>
                    <td class="nowrap actions-cell" style="text-align: center;">
                      <div style="display: inline-flex; gap: 6px; justify-content: center; align-items: center;">
                        <button class="btn-icon edit" title="Edit Head" onclick="app.editHead('${h.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn-icon toggle-status" title="Toggle Status" onclick="app.toggleHeadStatus('${h.id}')">
                          <i class="fa-solid ${h.status === 'Active' ? 'fa-ban' : 'fa-check'}"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  openAddHeadModal(headId = null) {
    const isEdit = !!headId;
    const head = isEdit ? window.store.getHead(headId) : null;
    const modalBody = document.getElementById("generic-modal-body");
    const modalTitle = document.getElementById("generic-modal-title");

    modalTitle.innerHTML = `<i class="fa-solid ${isEdit ? 'fa-user-pen' : 'fa-user-plus'}" style="color: var(--fischer-red); margin-right: 8px;"></i> ${isEdit ? `Edit Sales Head: ${head.name}` : 'Add / Edit Sales Head'}`;

    modalBody.innerHTML = `
      <form id="form-head-modal" onsubmit="app.handleSaveHeadModal(event, '${headId || ''}')">
        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Full Name <span class="req">*</span></label>
            <input type="text" id="modal-head-name" class="form-control" placeholder="e.g. Alex Johnson" value="${head ? head.name : ''}" required autofocus>
          </div>
          <div class="form-group">
            <label class="form-label">Email / Username <span class="req">*</span></label>
            <input type="email" id="modal-head-email" class="form-control" placeholder="alex.johnson@fischer.ae" value="${head ? head.email : ''}" required>
          </div>
        </div>
        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Phone Number <span class="req">*</span></label>
            <input type="text" id="modal-head-phone" class="form-control" placeholder="+971 50 123 4567" value="${head ? head.phone : ''}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Assigned Region / Territory <span class="req">*</span></label>
            <input type="text" id="modal-head-region" class="form-control" placeholder="e.g. UAE - North & Dubai" value="${head ? head.region : ''}" required>
          </div>
        </div>
        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Password <span class="req">*</span></label>
            <input type="password" id="modal-head-pass" class="form-control" placeholder="••••••••" value="password123">
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select id="modal-head-status" class="form-control">
              <option value="Active" ${!head || head.status === 'Active' ? 'selected' : ''}>Active</option>
              <option value="Inactive" ${head && head.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
            </select>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-color);">
          <button type="button" class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> ${isEdit ? 'Update Sales Head' : 'Save Sales Head'}</button>
        </div>
      </form>
    `;

    document.getElementById("generic-modal").classList.add("active");
  }

  handleSaveHeadModal(e, headId = null) {
    e.preventDefault();
    const name = document.getElementById("modal-head-name").value.trim();
    const email = document.getElementById("modal-head-email").value.trim();
    const phone = document.getElementById("modal-head-phone").value.trim();
    const region = document.getElementById("modal-head-region").value.trim();
    const status = document.getElementById("modal-head-status").value;

    if (!name || !email) {
      this.showToast("Name and email are required", "error");
      return;
    }

    if (headId) {
      const head = window.store.getHead(headId);
      if (head) {
        head.name = name;
        head.email = email;
        head.phone = phone;
        head.region = region;
        head.status = status;
        window.store.saveState();
        this.showToast(`Updated Sales Head: ${name}`, "success");
      }
    } else {
      window.store.salesHeads.push({
        id: "head_" + Date.now(),
        name,
        email,
        phone,
        region,
        status
      });
      window.store.saveState();
      this.showToast(`Added Sales Head: ${name}`, "success");
    }

    this.closeAllModals();
    this.renderSalesHeads();
  }

  editHead(headId) {
    this.openAddHeadModal(headId);
  }

  toggleHeadStatus(headId) {
    const h = window.store.getHead(headId);
    if (!h) return;
    h.status = h.status === "Active" ? "Inactive" : "Active";
    window.store.saveState();
    this.showToast(`Status toggled for ${h.name}`, "info");
    this.renderSalesHeads();
  }

  /* ==========================================================================
     4. Manage Sales Supervisors View
     ========================================================================== */
  renderSupervisors() {
    const container = document.getElementById("manage-supervisors-container");
    if (!container) return;

    const sups = window.store.supervisors;
    const heads = window.store.salesHeads;

    container.innerHTML = `
      <div class="page-title-row">
        <div>
          <h2 class="page-title">Manage Sales Supervisors</h2>
          <p class="page-subtitle">Assign supervisors under Sales/Marketing Heads and manage dealer assignments.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="app.exportTableToCSV('supervisors-table', 'fischer_supervisors.csv')"><i class="fa-solid fa-file-export"></i> Export CSV</button>
        </div>
      </div>

      <!-- Full Width List Table Card -->
      <div class="card">
        <div class="card-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <h3 class="card-title"><i class="fa-solid fa-users-gear"></i> Supervisors List (${sups.length})</h3>
            <span class="badge badge-neutral">${sups.filter(s => s.status === 'Active').length} Active</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-sm btn-primary" onclick="app.openAddSupervisorModal()"><i class="fa-solid fa-user-plus"></i> Add / Edit Sales Supervisor</button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="data-table" id="supervisors-table">
            <thead>
              <tr>
                <th style="width: 40px; text-align: center;">#</th>
                <th style="white-space: nowrap; min-width: 170px;">Supervisor</th>
                <th>Sales Head</th>
                <th>Territory Coverage</th>
                <th class="nowrap" style="text-align: center;">Dealers</th>
                <th class="nowrap" style="text-align: center;">Status</th>
                <th class="nowrap" style="text-align: center; width: 95px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${sups.map((s, idx) => {
                const head = window.store.getHead(s.headId);
                const dealerCount = window.store.dealers.filter(d => d.supervisorId === s.id).length;
                return `
                  <tr>
                    <td style="text-align: center; color: var(--text-muted); font-weight: 600;">${idx + 1}</td>
                    <td>
                      <strong style="color: #1E293B; font-size: 0.9rem;">${s.name}</strong>
                      <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">
                        <span><i class="fa-solid fa-envelope" style="font-size: 0.68rem; margin-right: 3px;"></i>${s.email}</span>
                        <span style="margin: 0 4px;">|</span>
                        <span><i class="fa-solid fa-phone" style="font-size: 0.68rem; margin-right: 3px;"></i>${s.phone}</span>
                      </div>
                    </td>
                    <td><span class="badge badge-neutral"><i class="fa-solid fa-user-tie" style="color: #64748B;"></i> ${head ? head.name : 'Unassigned'}</span></td>
                    <td><span class="badge badge-neutral"><i class="fa-solid fa-map-pin" style="color: #64748B;"></i> ${s.territory}</span></td>
                    <td class="nowrap" style="text-align: center;"><span class="badge badge-info">${dealerCount} ${dealerCount === 1 ? 'Dealer' : 'Dealers'}</span></td>
                    <td class="nowrap" style="text-align: center;"><span class="status-tag ${s.status === 'Active' ? 'active' : 'inactive'}">${s.status}</span></td>
                    <td class="nowrap" style="text-align: center;">
                      <div style="display: inline-flex; gap: 6px; justify-content: center; align-items: center;">
                        <button class="btn-icon edit" title="Edit Supervisor" onclick="app.editSupervisor('${s.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn-icon toggle-status" title="Toggle Status" onclick="app.toggleSupervisorStatus('${s.id}')">
                          <i class="fa-solid ${s.status === 'Active' ? 'fa-ban' : 'fa-check'}"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  openAddSupervisorModal(supId = null) {
    const isEdit = !!supId;
    const sup = isEdit ? window.store.getSupervisor(supId) : null;
    const heads = window.store.salesHeads;
    const modalBody = document.getElementById("generic-modal-body");
    const modalTitle = document.getElementById("generic-modal-title");

    modalTitle.innerHTML = `<i class="fa-solid ${isEdit ? 'fa-user-pen' : 'fa-user-plus'}" style="color: var(--fischer-red); margin-right: 8px;"></i> ${isEdit ? `Edit Sales Supervisor: ${sup.name}` : 'Add / Edit Sales Supervisor'}`;

    modalBody.innerHTML = `
      <form id="form-supervisor-modal" onsubmit="app.handleSaveSupervisorModal(event, '${supId || ''}')">
        <div class="form-group">
          <label class="form-label">Select Sales / Marketing Head <span class="req">*</span></label>
          <select id="modal-sup-head" class="form-control" required>
            <option value="">-- Choose Sales Head --</option>
            ${heads.map(h => `<option value="${h.id}" ${sup && sup.headId === h.id ? 'selected' : ''}>${h.name} (${h.region})</option>`).join("")}
          </select>
        </div>
        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Supervisor Name <span class="req">*</span></label>
            <input type="text" id="modal-sup-name" class="form-control" placeholder="e.g. Rashid Al Mansoori" value="${sup ? sup.name : ''}" required autofocus>
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number <span class="req">*</span></label>
            <input type="text" id="modal-sup-phone" class="form-control" placeholder="+971 50 223 3445" value="${sup ? sup.phone : ''}" required>
          </div>
        </div>
        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Email / Username <span class="req">*</span></label>
            <input type="email" id="modal-sup-email" class="form-control" placeholder="rashid.m@fischer.ae" value="${sup ? sup.email : ''}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Territory Coverage <span class="req">*</span></label>
            <input type="text" id="modal-sup-territory" class="form-control" placeholder="e.g. Dubai - Al Quoz & Deira" value="${sup ? sup.territory : ''}" required>
          </div>
        </div>
        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="modal-sup-pass" class="form-control" value="password123">
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select id="modal-sup-status" class="form-control">
              <option value="Active" ${!sup || sup.status === 'Active' ? 'selected' : ''}>Active</option>
              <option value="Inactive" ${sup && sup.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
            </select>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-color);">
          <button type="button" class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> ${isEdit ? 'Update Supervisor' : 'Save Supervisor'}</button>
        </div>
      </form>
    `;

    document.getElementById("generic-modal").classList.add("active");
  }

  handleSaveSupervisorModal(e, supId = null) {
    e.preventDefault();
    const headId = document.getElementById("modal-sup-head").value;
    const name = document.getElementById("modal-sup-name").value.trim();
    const phone = document.getElementById("modal-sup-phone").value.trim();
    const email = document.getElementById("modal-sup-email").value.trim();
    const territory = document.getElementById("modal-sup-territory").value.trim();
    const status = document.getElementById("modal-sup-status").value;

    if (!headId || !name || !email) {
      this.showToast("Please fill all required supervisor fields", "error");
      return;
    }

    if (supId) {
      const sup = window.store.getSupervisor(supId);
      if (sup) {
        sup.headId = headId;
        sup.name = name;
        sup.phone = phone;
        sup.email = email;
        sup.territory = territory;
        sup.status = status;
        window.store.saveState();
        this.showToast(`Updated Supervisor: ${name}`, "success");
      }
    } else {
      window.store.supervisors.push({
        id: "sup_" + Date.now(),
        headId,
        name,
        phone,
        email,
        territory,
        status
      });
      window.store.saveState();
      this.showToast(`Added Supervisor: ${name}`, "success");
    }

    this.closeAllModals();
    this.renderSupervisors();
  }

  editSupervisor(supId) {
    this.openAddSupervisorModal(supId);
  }

  toggleSupervisorStatus(supId) {
    const s = window.store.getSupervisor(supId);
    if (!s) return;
    s.status = s.status === "Active" ? "Inactive" : "Active";
    window.store.saveState();
    this.showToast(`Status toggled for ${s.name}`, "info");
    this.renderSupervisors();
  }

  /* ==========================================================================
     5. Manage Dealers & Branches View
     ========================================================================== */
  renderDealers() {
    const container = document.getElementById("manage-dealers-container");
    if (!container) return;

    const dealers = window.store.dealers;
    const heads = window.store.salesHeads;
    const sups = window.store.supervisors;

    container.innerHTML = `
      <div class="page-title-row">
        <div>
          <h2 class="page-title">Manage Dealers & Branches</h2>
          <p class="page-subtitle">Configure dealer accounts, multiple branch locations, store photos, contact info and monthly targets.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="app.openAddDealerModal()"><i class="fa-solid fa-plus"></i> Add New Dealer</button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="fa-solid fa-store"></i> Dealers Catalog (${dealers.length} Dealers)</h3>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Dealer</th>
                <th>Supervisor & Head</th>
                <th>Sales Target (${window.store.currency})</th>
                <th>Branches</th>
                <th>Emirate / City</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${dealers.map((d, idx) => {
                const sup = window.store.getSupervisor(d.supervisorId);
                const head = window.store.getHead(d.headId);
                const branches = d.branches || [];
                return `
                  <tr>
                    <td>${idx + 1}</td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${d.logo || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=100'}" class="table-img-thumb" style="width: 38px; height: 38px; border-radius: var(--radius-md);" />
                        <div>
                          <strong>${d.name}</strong>
                          <div style="font-size: 0.72rem; color: var(--text-muted);"><i class="fa-solid fa-user-lock"></i> ${d.username}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div><strong>${sup ? sup.name : '-'}</strong></div>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">${head ? head.name : '-'}</div>
                    </td>
                    <td><strong>${window.store.formatMoney(d.salesTarget)}</strong></td>
                    <td>
                      <button class="badge badge-info" style="cursor: pointer; border: none;" onclick="app.viewDealerBranches('${d.id}')">
                        <i class="fa-solid fa-code-branch"></i> ${branches.length} Branches
                      </button>
                    </td>
                    <td><span class="badge badge-neutral"><i class="fa-solid fa-city"></i> ${d.city || d.location}</span></td>
                    <td>
                      <div>${d.contactName || '-'}</div>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">${d.contactPhone || d.email}</div>
                    </td>
                    <td><span class="status-tag ${d.status === 'Active' ? 'active' : 'inactive'}">${d.status}</span></td>
                    <td>
                      <div style="display: flex; gap: 4px;">
                        <button class="btn-icon edit" title="Edit Dealer & Branches" onclick="app.openEditDealerModal('${d.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn-icon toggle-status" title="Toggle Status" onclick="app.toggleDealerStatus('${d.id}')">
                          <i class="fa-solid ${d.status === 'Active' ? 'fa-ban' : 'fa-check'}"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  openAddDealerModal(dealerId = null) {
    const isEdit = !!dealerId;
    const dealer = isEdit ? window.store.getDealer(dealerId) : null;
    const heads = window.store.salesHeads;
    const sups = window.store.supervisors;

    const modalTitle = document.getElementById("generic-modal-title");
    const modalBody = document.getElementById("generic-modal-body");

    modalTitle.innerHTML = `<i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-building'}" style="color: var(--fischer-red); margin-right: 8px;"></i> ${isEdit ? `Edit Dealer: ${dealer.name}` : "Add New Dealer & Branches"}`;

    const branches = dealer && dealer.branches ? dealer.branches : [
      { id: "br_" + Date.now(), name: "Main Branch", location: "Dubai", contactPhone: "+971 4 000 0000", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400", target: 30000 }
    ];

    modalBody.innerHTML = `
      <form id="form-dealer-modal" onsubmit="app.handleSaveDealerModal(event, '${dealerId || ''}')">
        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Select Sales / Marketing Head <span class="req">*</span></label>
            <select id="modal-dealer-head" class="form-control" required onchange="app.filterSupervisorDropdown(this.value)">
              <option value="">-- Select Head --</option>
              ${heads.map(h => `<option value="${h.id}" ${dealer && dealer.headId === h.id ? 'selected' : ''}>${h.name} (${h.region})</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Select Sales Supervisor <span class="req">*</span></label>
            <select id="modal-dealer-sup" class="form-control" required>
              <option value="">-- Select Supervisor --</option>
              ${sups.map(s => `<option value="${s.id}" ${dealer && dealer.supervisorId === s.id ? 'selected' : ''}>${s.name} (${s.territory})</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Dealer Name <span class="req">*</span></label>
            <input type="text" id="modal-dealer-name" class="form-control" placeholder="e.g. Fine Tools" value="${dealer ? dealer.name : ''}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Dealer Monthly Target (${window.store.currency}) <span class="req">*</span></label>
            <input type="number" id="modal-dealer-target" class="form-control" placeholder="100000" value="${dealer ? dealer.salesTarget : '50000'}" required>
          </div>
        </div>

        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Emirate / City / Location <span class="req">*</span></label>
            <input type="text" id="modal-dealer-city" class="form-control" placeholder="e.g. Dubai, Sharjah, Abu Dhabi" value="${dealer ? (dealer.city || dealer.location) : 'Dubai'}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Logo Image URL</label>
            <input type="url" id="modal-dealer-logo" class="form-control" placeholder="https://..." value="${dealer ? dealer.logo : 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=100'}">
          </div>
        </div>

        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Company Contact Person</label>
            <input type="text" id="modal-dealer-contact-name" class="form-control" placeholder="Mustafa K." value="${dealer ? dealer.contactName : ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Contact Phone / Mobile</label>
            <input type="text" id="modal-dealer-contact-phone" class="form-control" placeholder="+971 4 338 1234" value="${dealer ? dealer.contactPhone : ''}">
          </div>
        </div>

        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Portal Login Username <span class="req">*</span></label>
            <input type="text" id="modal-dealer-user" class="form-control" placeholder="dealer_username" value="${dealer ? dealer.username : 'dealer_user'}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Portal Password</label>
            <input type="password" id="modal-dealer-pass" class="form-control" value="password123">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Company Full Address</label>
          <input type="text" id="modal-dealer-addr" class="form-control" placeholder="Warehouse / Shop location address" value="${dealer ? dealer.address : ''}">
        </div>

        <!-- Branches Sub Section -->
        <div style="margin-top: 22px; border-top: 1px dashed var(--border-color); padding-top: 18px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div>
              <label class="form-label" style="font-size: 0.95rem; margin-bottom: 2px;">
                <i class="fa-solid fa-code-branch" style="color: var(--fischer-red); margin-right: 6px;"></i> Dealer Branches
              </label>
              <div style="font-size: 0.78rem; color: var(--text-muted);">Manage branch outlet locations and monthly sales targets for this dealer</div>
            </div>
            <button type="button" class="btn btn-sm btn-secondary" onclick="app.addBranchRowToModal()"><i class="fa-solid fa-plus"></i> Add Branch</button>
          </div>
          <div id="modal-branches-container" class="branch-list-editor">
            ${branches.map((b, idx) => `
              <div class="branch-edit-card" data-branch-index="${idx}">
                <div class="branch-card-header">
                  <div class="branch-card-title">
                    <i class="fa-solid fa-store" style="color: var(--fischer-red);"></i>
                    <span>Branch #${idx + 1}</span>
                  </div>
                  <button type="button" class="btn-icon delete" title="Remove Branch" onclick="app.removeBranchCard(this)">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                <div class="branch-card-grid">
                  <div>
                    <label class="branch-field-label">Branch Name <span class="req">*</span></label>
                    <input type="text" class="form-control b-name" placeholder="Branch Name (e.g. Al Quoz Outlet)" value="${b.name}" required>
                  </div>
                  <div>
                    <label class="branch-field-label">Location / City <span class="req">*</span></label>
                    <input type="text" class="form-control b-loc" placeholder="Location / City" value="${b.location}" required>
                  </div>
                  <div>
                    <label class="branch-field-label">Monthly Target (${window.store.currency}) <span class="req">*</span></label>
                    <input type="number" class="form-control b-target" placeholder="25000" value="${b.target || 25000}" required>
                  </div>
                </div>
                <div class="branch-card-subgrid">
                  <div>
                    <label class="branch-field-label">Branch Phone</label>
                    <input type="text" class="form-control b-phone" placeholder="e.g. +971 4 338 1234" value="${b.contactPhone || ''}">
                  </div>
                  <div>
                    <label class="branch-field-label">Shopfront Photo URL</label>
                    <input type="url" class="form-control b-photo" placeholder="https://..." value="${b.photo || ''}">
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-color);">
          <button type="button" class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Dealer Profile</button>
        </div>
      </form>
    `;

    document.querySelector("#generic-modal .modal-box")?.classList.add("modal-lg");
    document.getElementById("generic-modal").classList.add("active");
  }

  addBranchRowToModal() {
    const container = document.getElementById("modal-branches-container");
    if (!container) return;
    const count = container.querySelectorAll(".branch-edit-card").length;
    const nextIdx = count + 1;
    const div = document.createElement("div");
    div.className = "branch-edit-card";
    div.setAttribute("data-branch-index", count);
    div.innerHTML = `
      <div class="branch-card-header">
        <div class="branch-card-title">
          <i class="fa-solid fa-store" style="color: var(--fischer-red);"></i>
          <span>Branch #${nextIdx}</span>
        </div>
        <button type="button" class="btn-icon delete" title="Remove Branch" onclick="app.removeBranchCard(this)">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <div class="branch-card-grid">
        <div>
          <label class="branch-field-label">Branch Name <span class="req">*</span></label>
          <input type="text" class="form-control b-name" placeholder="Branch Name (e.g. Deira Branch)" required>
        </div>
        <div>
          <label class="branch-field-label">Location / City <span class="req">*</span></label>
          <input type="text" class="form-control b-loc" placeholder="Location / City" value="Dubai" required>
        </div>
        <div>
          <label class="branch-field-label">Monthly Target (${window.store.currency}) <span class="req">*</span></label>
          <input type="number" class="form-control b-target" placeholder="25000" value="25000" required>
        </div>
      </div>
      <div class="branch-card-subgrid">
        <div>
          <label class="branch-field-label">Branch Phone</label>
          <input type="text" class="form-control b-phone" placeholder="+971 4 000 0000" value="+971 4 000 0000">
        </div>
        <div>
          <label class="branch-field-label">Shopfront Photo URL</label>
          <input type="url" class="form-control b-photo" placeholder="https://..." value="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400">
        </div>
      </div>
    `;
    container.appendChild(div);
  }

  removeBranchCard(btn) {
    const card = btn.closest(".branch-edit-card");
    const container = document.getElementById("modal-branches-container");
    if (!card || !container) return;
    const allCards = container.querySelectorAll(".branch-edit-card");
    if (allCards.length <= 1) {
      this.showToast("Dealer must have at least one branch outlet", "warning");
      return;
    }
    card.remove();
    this.renumberBranchCards();
  }

  renumberBranchCards() {
    const container = document.getElementById("modal-branches-container");
    if (!container) return;
    container.querySelectorAll(".branch-edit-card").forEach((card, idx) => {
      card.setAttribute("data-branch-index", idx);
      const titleSpan = card.querySelector(".branch-card-title span");
      if (titleSpan) titleSpan.textContent = `Branch #${idx + 1}`;
    });
  }

  handleSaveDealerModal(e, existingId) {
    e.preventDefault();
    const headId = document.getElementById("modal-dealer-head").value;
    const supId = document.getElementById("modal-dealer-sup").value;
    const name = document.getElementById("modal-dealer-name").value.trim();
    const target = Number(document.getElementById("modal-dealer-target").value) || 0;
    const city = document.getElementById("modal-dealer-city").value.trim();
    const logo = document.getElementById("modal-dealer-logo").value.trim();
    const contactName = document.getElementById("modal-dealer-contact-name").value.trim();
    const contactPhone = document.getElementById("modal-dealer-contact-phone").value.trim();
    const username = document.getElementById("modal-dealer-user").value.trim();
    const address = document.getElementById("modal-dealer-addr").value.trim();

    // Extract branches
    const branchCards = document.querySelectorAll("#modal-branches-container .branch-edit-card");
    const branches = [];
    branchCards.forEach((card, idx) => {
      const bName = card.querySelector(".b-name").value.trim();
      const bLoc = card.querySelector(".b-loc").value.trim();
      const bTarget = Number(card.querySelector(".b-target").value) || 0;
      const bPhone = card.querySelector(".b-phone").value.trim();
      const bPhoto = card.querySelector(".b-photo").value.trim();

      if (bName) {
        branches.push({
          id: "br_" + (idx + 1) + "_" + Date.now(),
          name: bName,
          location: bLoc,
          target: bTarget,
          contactPhone: bPhone,
          photo: bPhoto
        });
      }
    });

    if (existingId) {
      const d = window.store.getDealer(existingId);
      if (d) {
        d.headId = headId;
        d.supervisorId = supId;
        d.name = name;
        d.salesTarget = target;
        d.city = city;
        d.location = city;
        d.logo = logo;
        d.contactName = contactName;
        d.contactPhone = contactPhone;
        d.username = username;
        d.address = address;
        d.branches = branches;
        this.showToast(`Updated Dealer: ${name}`, "success");
      }
    } else {
      window.store.dealers.push({
        id: "deal_" + Date.now(),
        headId,
        supervisorId: supId,
        name,
        salesTarget: target,
        city,
        location: city,
        logo,
        contactName,
        contactPhone,
        email: `${username}@dealer.fischer.ae`,
        username,
        address,
        status: "Active",
        branches
      });
      this.showToast(`Added Dealer: ${name}`, "success");
    }

    window.store.saveState();
    this.closeAllModals();
    this.renderDealers();
  }

  openEditDealerModal(dealerId) {
    this.openAddDealerModal(dealerId);
  }

  toggleDealerStatus(dealerId) {
    const d = window.store.getDealer(dealerId);
    if (!d) return;
    d.status = d.status === "Active" ? "Inactive" : "Active";
    window.store.saveState();
    this.showToast(`Status toggled for ${d.name}`, "info");
    this.renderDealers();
  }

  viewDealerBranches(dealerId) {
    const d = window.store.getDealer(dealerId);
    if (!d) return;

    const modalTitle = document.getElementById("generic-modal-title");
    const modalBody = document.getElementById("generic-modal-body");

    modalTitle.textContent = `${d.name} - Branch Outlets (${(d.branches || []).length})`;
    modalBody.innerHTML = `
      <div class="branches-grid">
        ${(d.branches || []).map(b => `
          <div class="card" style="margin-bottom: 0;">
            ${b.photo ? `<img src="${b.photo}" style="width: 100%; height: 130px; object-fit: cover;" />` : ''}
            <div class="card-body" style="padding: 14px;">
              <h4 style="font-size: 1rem; font-weight: 700;">${b.name}</h4>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;"><i class="fa-solid fa-location-dot"></i> ${b.location}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-phone"></i> ${b.contactPhone || 'N/A'}</div>
              <div style="margin-top: 8px; font-weight: 600; color: var(--fischer-red); font-size: 0.85rem;">
                Monthly Target: ${window.store.formatMoney(b.target || 0)}
              </div>
            </div>
          </div>
        `).join("")}
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
        <button class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Close</button>
      </div>
    `;

    document.getElementById("generic-modal").classList.add("active");
  }

  /* ==========================================================================
     6. Manage Events View (Supervisor / Dealer Logging & Full List)
     ========================================================================== */
  renderEvents() {
    const container = document.getElementById("manage-events-container");
    if (!container) return;

    const dealers = window.store.dealers;
    const eventTypes = window.store.eventTypes;
    const sups = window.store.supervisors;
    const events = window.store.events;

    const totalEvents = events.length;
    const totalSpend = events.reduce((sum, ev) => sum + (Number(ev.amountSpend) || 0), 0);
    const activeEvents = events.filter(ev => ev.status === "Active").length;
    const activePct = totalEvents > 0 ? Math.round((activeEvents / totalEvents) * 100) : 100;
    const uniqueDealers = new Set(events.map(ev => ev.dealerId)).size;

    container.innerHTML = `
      <!-- 1. Hero Header Banner (matching uploaded design) -->
      <div class="page-hero-banner">
        <div>
          <div class="page-hero-welcome">WELCOME TO FISCHER</div>
          <h2 class="page-hero-title">Manage Events & Promotion Activities</h2>
          <p class="page-hero-subtitle">Add, view and audit promotional events, roadshows, POS branding and field activities conducted across branches.</p>
        </div>
        <div class="page-hero-actions">
          <button class="btn btn-secondary" onclick="app.exportTableToCSV('events-table', 'fischer_events.csv')">
            <i class="fa-solid fa-file-export"></i> Export CSV
          </button>
        </div>
      </div>

      <!-- 2. Metrics KPI Cards Row (matching uploaded design) -->
      <div class="metrics-row-6">
        <!-- Card 1: Total Spend (AED) with Wave Graphic -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon red"><i class="fa-solid fa-coins"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Spend (${window.store.currency})</div>
              <div class="ref-card-value">${window.store.formatMoney(totalSpend).replace(window.store.currency + ' ', '')}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text up"><i class="fa-solid fa-arrow-up"></i> +14% <span style="font-weight: 500; color: #64748B;">vs. last period</span></div>
          </div>
          <svg class="ref-wave-bg" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0,80 C150,140 350,20 500,90 L500,150 L0,150 Z" fill="#E30613"></path>
          </svg>
        </div>

        <!-- Card 2: Total Events Conducted -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon orange"><i class="fa-solid fa-calendar-check"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Events</div>
              <div class="ref-card-value">${totalEvents}</div>
            </div>
          </div>
          <div class="ref-card-bottom" style="flex-direction: column; align-items: flex-start; gap: 6px;">
            <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.72rem; font-weight: 700; color: #FF7A00;">
              <span>Execution Rate</span>
              <span>${activePct}%</span>
            </div>
            <div class="ref-progress-track">
              <div class="ref-progress-fill orange" style="width: ${activePct}%;"></div>
            </div>
          </div>
        </div>

        <!-- Card 3: Active Promotions -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon green"><i class="fa-solid fa-trophy"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Active Promotions</div>
              <div class="ref-card-value">${activeEvents}</div>
            </div>
          </div>
          <div class="ref-card-bottom" style="margin-top: 14px;">
            <div class="ref-progress-track">
              <div class="ref-progress-fill green" style="width: ${activePct}%;"></div>
            </div>
          </div>
        </div>

        <!-- Card 4: Dealers Covered -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon purple"><i class="fa-solid fa-store"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Dealers Engaged</div>
              <div class="ref-card-value">${uniqueDealers}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text purple"><i class="fa-solid fa-store"></i> Active Network</div>
            <svg class="ref-sparkline-svg" viewBox="0 0 60 24">
              <path d="M0,18 Q15,4 30,12 T60,6" fill="none" stroke="#7C3AED" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 3. Rounded Filter Bar (matching uploaded design) -->
      <div class="rounded-filter-bar">
        <div class="filter-pill-item">
          <span class="filter-pill-label">Filter by Dealer</span>
          <select id="filter-event-dealer" class="filter-pill-control" onchange="app.filterEventsList()">
            <option value="ALL">All Dealers</option>
            ${dealers.map(d => `<option value="${d.id}">${d.name}</option>`).join("")}
          </select>
        </div>
        <div class="filter-pill-item">
          <span class="filter-pill-label">Filter by Event Type</span>
          <select id="filter-event-type" class="filter-pill-control" onchange="app.filterEventsList()">
            <option value="ALL">All Event Types</option>
            ${eventTypes.map(et => `<option value="${et.id}">${et.name}</option>`).join("")}
          </select>
        </div>
        <div class="filter-pill-item">
          <span class="filter-pill-label">Location</span>
          <select id="filter-event-location" class="filter-pill-control" onchange="app.filterEventsList()">
            <option value="ALL">All Locations</option>
            <option value="Dubai">Dubai</option>
            <option value="Sharjah">Sharjah</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
            <option value="Ajman">Ajman</option>
            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
          </select>
        </div>
        <button class="btn-filter-reset" onclick="app.resetEventFilters()">Reset</button>
      </div>

      <!-- 4. Table Card -->
      <div class="card">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <h3 class="card-title"><i class="fa-solid fa-list"></i> Recorded Events</h3>
          <button class="btn btn-sm btn-primary" id="btn-add-event" onclick="app.openAddEventModal()"><i class="fa-solid fa-calendar-plus"></i> Add Event</button>
        </div>
        <div class="table-responsive">
          <table class="data-table" id="events-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Dealer & Branch</th>
                <th>Event Type / Activity</th>
                <th>Location</th>
                <th>Amount (${window.store.currency})</th>
                <th>Photos</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="events-list-tbody">
              <!-- Rendered dynamically -->
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.filterEventsList();
  }

  openAddEventModal(eventId = null) {
    const isEdit = !!eventId;
    const ev = isEdit ? window.store.events.find(e => e.id === eventId) : null;
    const dealers = window.store.dealers;
    const eventTypes = window.store.eventTypes;
    const modalBody = document.getElementById("generic-modal-body");
    const modalTitle = document.getElementById("generic-modal-title");

    modalTitle.innerHTML = `<i class="fa-solid ${isEdit ? 'fa-calendar-check' : 'fa-calendar-plus'}" style="color: var(--fischer-red); margin-right: 8px;"></i> ${isEdit ? 'Edit Event Details' : 'Add Event'}`;

    modalBody.innerHTML = `
      <form id="form-event-modal" onsubmit="app.handleSaveEventModal(event, '${eventId || ''}')">
        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Select Dealer <span class="req">*</span></label>
            <select id="modal-event-dealer" class="form-control" required onchange="app.handleModalEventDealerChange(this.value)">
              <option value="">-- Select Dealer --</option>
              ${dealers.map(d => `<option value="${d.id}" ${ev && ev.dealerId === d.id ? 'selected' : ''}>${d.name} (${d.city || d.location})</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Dealer Branch <span class="req">*</span></label>
            <select id="modal-event-branch" class="form-control" required>
              <option value="">-- Select Branch --</option>
            </select>
          </div>
        </div>

        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Event Type <span class="req">*</span></label>
            <select id="modal-event-type" class="form-control" required onchange="app.handleModalEventTypeChange(this.value)">
              <option value="">-- Select Type --</option>
              ${eventTypes.map(et => `<option value="${et.id}" ${ev && ev.eventTypeId === et.id ? 'selected' : ''}>${et.name}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Activity <span class="req">*</span></label>
            <select id="modal-event-activity" class="form-control" required>
              <option value="">-- Select Activity --</option>
            </select>
          </div>
        </div>

        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Amount Spend (${window.store.currency}) <span class="req">*</span></label>
            <input type="number" id="modal-event-spend" class="form-control" placeholder="e.g. 2500" value="${ev ? ev.amountSpend : ''}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Date Conducted <span class="req">*</span></label>
            <input type="date" id="modal-event-date" class="form-control" value="${ev ? ev.date : new Date().toISOString().split('T')[0]}" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Location / City <span class="req">*</span></label>
          <input type="text" id="modal-event-location" class="form-control" placeholder="e.g. Dubai - Al Quoz Showroom" value="${ev ? (ev.location || '') : ''}" required>
        </div>

        <div class="form-group">
          <label class="form-label">Photos (Attachments / Proof)</label>
          <div class="photo-upload-zone" onclick="app.triggerPhotoPicker('modal-event-photos-preview')" style="padding: 14px; text-align: center; border: 2px dashed var(--border-color); border-radius: var(--radius-md); background: var(--bg-subtle); cursor: pointer; transition: var(--transition);">
            <div class="upload-icon" style="font-size: 1.5rem; color: var(--fischer-red); margin-bottom: 4px;"><i class="fa-solid fa-cloud-arrow-up"></i></div>
            <div class="upload-title" style="font-weight: 600; font-size: 0.88rem; color: var(--text-primary);">Click to attach photo proof or sample photos</div>
            <div class="upload-sub" style="font-size: 0.75rem; color: var(--text-muted);">JPG, PNG supported (Upload up to 10 photos)</div>
          </div>
          <div id="modal-event-photos-preview" class="uploaded-previews-grid" style="margin-top: 10px;"></div>
        </div>

        <div class="form-group">
          <label class="form-label">Event Notes / Execution Summary</label>
          <textarea id="modal-event-notes" class="form-control" rows="2" placeholder="Summary of attendance, contractor interest, anchor demonstrations...">${ev ? (ev.notes || '') : ''}</textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--border-color);">
          <button type="button" class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> ${isEdit ? 'Update Event' : 'Save Event'}</button>
        </div>
      </form>
    `;

    // Photos init
    if (ev && ev.photos && ev.photos.length > 0) {
      this.uploadedPhotos = [...ev.photos];
    } else if (!isEdit) {
      this.uploadedPhotos = [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60"
      ];
    } else {
      this.uploadedPhotos = [];
    }
    this.renderUploadedPhotoThumbs("modal-event-photos-preview");

    // Populate dependent dropdowns
    const selectedDealerId = ev ? ev.dealerId : (dealers[0] ? dealers[0].id : "");
    if (!ev && dealers.length > 0) {
      const dSelect = document.getElementById("modal-event-dealer");
      if (dSelect) dSelect.value = selectedDealerId;
    }
    this.handleModalEventDealerChange(selectedDealerId, ev ? ev.branchId : null);

    const selectedTypeId = ev ? ev.eventTypeId : (eventTypes[0] ? eventTypes[0].id : "");
    if (!ev && eventTypes.length > 0) {
      const tSelect = document.getElementById("modal-event-type");
      if (tSelect) tSelect.value = selectedTypeId;
    }
    this.handleModalEventTypeChange(selectedTypeId, ev ? ev.activityId : null);

    document.getElementById("generic-modal").classList.add("active");
  }

  handleModalEventDealerChange(dealerId, selectedBranchId = null) {
    const branchSelect = document.getElementById("modal-event-branch") || document.getElementById("event-branch-input");
    if (!branchSelect) return;
    branchSelect.innerHTML = '<option value="">-- Select Branch --</option>';

    const dealer = window.store.getDealer(dealerId);
    if (dealer && dealer.branches) {
      dealer.branches.forEach(b => {
        const opt = document.createElement("option");
        opt.value = b.id;
        opt.textContent = `${b.name} (${b.location})`;
        if (selectedBranchId && b.id === selectedBranchId) {
          opt.selected = true;
        }
        branchSelect.appendChild(opt);
      });
      if (!selectedBranchId && dealer.branches.length > 0) {
        branchSelect.value = dealer.branches[0].id;
      }
    }
  }

  handleModalEventTypeChange(typeId, selectedActivityId = null) {
    const actSelect = document.getElementById("modal-event-activity") || document.getElementById("event-activity-input");
    if (!actSelect) return;
    actSelect.innerHTML = '<option value="">-- Select Activity --</option>';

    const et = window.store.getEventType(typeId);
    if (et && et.activities) {
      et.activities.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a.id;
        opt.textContent = a.name;
        if (selectedActivityId && a.id === selectedActivityId) {
          opt.selected = true;
        }
        actSelect.appendChild(opt);
      });
      if (!selectedActivityId && et.activities.length > 0) {
        actSelect.value = et.activities[0].id;
      }
    }
  }

  handleEventDealerChange(dealerId) {
    this.handleModalEventDealerChange(dealerId);
  }

  handleEventTypeChange(typeId) {
    this.handleModalEventTypeChange(typeId);
  }

  triggerPhotoPicker(targetId = "modal-event-photos-preview") {
    const samplePool = [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60"
    ];
    const pick = samplePool[Math.floor(Math.random() * samplePool.length)];
    if (!this.uploadedPhotos) this.uploadedPhotos = [];
    this.uploadedPhotos.push(pick);
    this.renderUploadedPhotoThumbs(targetId);
    this.showToast("Photo attachment added", "info");
  }

  renderUploadedPhotoThumbs(targetId = "modal-event-photos-preview") {
    const container = document.getElementById(targetId) || document.getElementById("event-photos-preview");
    if (!container) return;
    container.innerHTML = (this.uploadedPhotos || []).map((url, idx) => `
      <div class="preview-thumb-box">
        <img src="${url}" />
        <div class="remove-thumb" onclick="app.removeUploadedPhoto(${idx}, '${targetId}')"><i class="fa-solid fa-xmark"></i></div>
      </div>
    `).join("");
  }

  removeUploadedPhoto(idx, targetId = "modal-event-photos-preview") {
    if (this.uploadedPhotos) {
      this.uploadedPhotos.splice(idx, 1);
    }
    this.renderUploadedPhotoThumbs(targetId);
  }

  handleSaveEventModal(e, eventId = null) {
    e.preventDefault();
    const dealerId = (document.getElementById("modal-event-dealer") || document.getElementById("event-dealer-input"))?.value;
    const branchId = (document.getElementById("modal-event-branch") || document.getElementById("event-branch-input"))?.value;
    const eventTypeId = (document.getElementById("modal-event-type") || document.getElementById("event-type-input"))?.value;
    const activityId = (document.getElementById("modal-event-activity") || document.getElementById("event-activity-input"))?.value;
    const amountSpend = Number((document.getElementById("modal-event-spend") || document.getElementById("event-spend-input"))?.value) || 0;
    const date = (document.getElementById("modal-event-date") || document.getElementById("event-date-input"))?.value;
    const location = (document.getElementById("modal-event-location") || document.getElementById("event-location-input"))?.value.trim();
    const notes = (document.getElementById("modal-event-notes") || document.getElementById("event-notes-input"))?.value.trim() || "";

    if (!dealerId || !branchId || !eventTypeId || !activityId || !amountSpend || !date || !location) {
      this.showToast("Please fill all required event details", "error");
      return;
    }

    if (eventId) {
      const ev = window.store.events.find(x => x.id === eventId);
      if (ev) {
        ev.dealerId = dealerId;
        ev.branchId = branchId;
        ev.eventTypeId = eventTypeId;
        ev.activityId = activityId;
        ev.amountSpend = amountSpend;
        ev.date = date;
        ev.location = location;
        ev.notes = notes;
        ev.photos = [...(this.uploadedPhotos || [])];
        window.store.saveState();
        this.closeAllModals();
        this.showToast("Event updated successfully!", "success");
        this.filterEventsList();
      }
    } else {
      const newEvent = {
        id: "ev_" + Date.now(),
        dealerId,
        branchId,
        eventTypeId,
        activityId,
        amountSpend,
        date,
        location,
        notes,
        status: "Active",
        photos: [...(this.uploadedPhotos || [])]
      };
      window.store.events.unshift(newEvent);
      window.store.saveState();
      this.closeAllModals();
      this.showToast("Event logged successfully with photos!", "success");
      this.filterEventsList();
    }
  }

  handleSaveEvent(e) {
    this.handleSaveEventModal(e);
  }

  resetEventForm() {
    this.uploadedPhotos = [];
    this.renderUploadedPhotoThumbs("modal-event-photos-preview");
  }

  filterEventsList() {
    const tbody = document.getElementById("events-list-tbody");
    if (!tbody) return;

    const dealerFilter = document.getElementById("filter-event-dealer")?.value || "ALL";
    const typeFilter = document.getElementById("filter-event-type")?.value || "ALL";
    const locFilter = document.getElementById("filter-event-location")?.value || "ALL";

    let filtered = window.store.events.filter(ev => {
      if (dealerFilter !== "ALL" && ev.dealerId !== dealerFilter) return false;
      if (typeFilter !== "ALL" && ev.eventTypeId !== typeFilter) return false;
      if (locFilter !== "ALL" && !ev.location.toLowerCase().includes(locFilter.toLowerCase())) return false;
      return true;
    });

    tbody.innerHTML = filtered.map((ev, idx) => {
      const dealer = window.store.getDealer(ev.dealerId);
      const branch = window.store.getBranch(ev.dealerId, ev.branchId);
      const et = window.store.getEventType(ev.eventTypeId);
      const act = window.store.getActivity(ev.eventTypeId, ev.activityId);

      return `
        <tr>
          <td>${idx + 1}</td>
          <td><span style="font-size: 0.8rem; color: var(--text-muted);">${ev.date}</span></td>
          <td>
            <strong>${dealer ? dealer.name : 'Unknown Dealer'}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-code-branch"></i> ${branch ? branch.name : '-'}</div>
          </td>
          <td>
            <div style="font-weight: 600; color: var(--fischer-red);">${act ? act.name : '-'}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${et ? et.name : '-'}</div>
          </td>
          <td><span class="badge badge-neutral"><i class="fa-solid fa-location-dot"></i> ${ev.location}</span></td>
          <td><strong>${window.store.formatMoney(ev.amountSpend)}</strong></td>
          <td>
            ${ev.photos && ev.photos.length > 0 ? `
              <div style="display: flex; gap: 4px;">
                ${ev.photos.slice(0, 2).map(p => `
                  <img src="${p}" class="table-img-thumb" onclick="app.viewPhotoModal('${p}', '${act ? act.name : 'Event'}')" />
                `).join("")}
                ${ev.photos.length > 2 ? `<span class="badge badge-neutral">+${ev.photos.length - 2}</span>` : ''}
              </div>
            ` : '<span style="color: var(--text-muted); font-size: 0.75rem;">No photos</span>'}
          </td>
          <td><span class="status-tag ${ev.status === 'Active' ? 'active' : 'inactive'}">${ev.status}</span></td>
          <td>
            <div style="display: flex; gap: 4px;">
              <button class="btn-icon edit" title="View Details" onclick="app.viewEventDetailModal('${ev.id}')"><i class="fa-solid fa-eye"></i></button>
              <button class="btn-icon edit" title="Edit Event" onclick="app.openAddEventModal('${ev.id}')"><i class="fa-solid fa-pencil"></i></button>
              <button class="btn-icon toggle-status" title="Toggle Status" onclick="app.toggleEventStatus('${ev.id}')">
                <i class="fa-solid ${ev.status === 'Active' ? 'fa-ban' : 'fa-check'}"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  resetEventFilters() {
    if (document.getElementById("filter-event-dealer")) document.getElementById("filter-event-dealer").value = "ALL";
    if (document.getElementById("filter-event-type")) document.getElementById("filter-event-type").value = "ALL";
    if (document.getElementById("filter-event-location")) document.getElementById("filter-event-location").value = "ALL";
    this.filterEventsList();
  }

  toggleEventStatus(eventId) {
    const ev = window.store.events.find(e => e.id === eventId);
    if (!ev) return;
    ev.status = ev.status === "Active" ? "Inactive" : "Active";
    window.store.saveState();
    this.showToast(`Status toggled for event`, "info");
    this.filterEventsList();
  }

  viewEventDetailModal(eventId) {
    const ev = window.store.events.find(e => e.id === eventId);
    if (!ev) return;

    const dealer = window.store.getDealer(ev.dealerId);
    const branch = window.store.getBranch(ev.dealerId, ev.branchId);
    const et = window.store.getEventType(ev.eventTypeId);
    const act = window.store.getActivity(ev.eventTypeId, ev.activityId);

    const modalTitle = document.getElementById("generic-modal-title");
    const modalBody = document.getElementById("generic-modal-body");

    modalTitle.textContent = `Event Audit: ${act ? act.name : 'Event'}`;
    modalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--fischer-red);">${act ? act.name : 'Activity'}</h3>
            <div style="font-size: 0.84rem; color: var(--text-muted);">${et ? et.name : 'Category'} | ${ev.date}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Cost Incurred</div>
            <div style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary);">${window.store.formatMoney(ev.amountSpend)}</div>
          </div>
        </div>

        <div class="grid-2-col">
          <div class="card" style="margin-bottom: 0; padding: 12px; background: var(--bg-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">DEALER & OUTLET</div>
            <div style="font-weight: 600; margin-top: 4px;">${dealer ? dealer.name : '-'}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-code-branch"></i> ${branch ? branch.name : '-'}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${ev.location}</div>
          </div>
          <div class="card" style="margin-bottom: 0; padding: 12px; background: var(--bg-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">STATUS & NOTES</div>
            <div style="margin-top: 4px;"><span class="status-tag ${ev.status === 'Active' ? 'active' : 'inactive'}">${ev.status}</span></div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 6px;">${ev.notes || 'No notes logged.'}</div>
          </div>
        </div>

        <div>
          <label class="form-label" style="font-weight: 700;"><i class="fa-solid fa-camera"></i> Attached Visual Proofs (${ev.photos ? ev.photos.length : 0})</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; margin-top: 8px;">
            ${(ev.photos || []).map(p => `
              <img src="${p}" style="width: 100%; height: 110px; object-fit: cover; border-radius: var(--radius-md); cursor: pointer;" onclick="app.viewPhotoModal('${p}', '${act ? act.name : 'Proof'}')" />
            `).join("")}
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 14px;">
          <button class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Close</button>
        </div>
      </div>
    `;

    document.getElementById("generic-modal").classList.add("active");
  }

  /* ==========================================================================
     7. Dealer Sales Tracking View (Target Badging)
     ========================================================================== */
  renderSales() {
    const container = document.getElementById("dealer-sales-container");
    if (!container) return;

    const dealers = window.store.dealers;

    container.innerHTML = `
      <div class="page-title-row">
        <div>
          <h2 class="page-title">Dealer Sales Tracking</h2>
          <p class="page-subtitle">Record and benchmark branch sales figures with target badging rules (<60% Red, 60-80% Orange, 80-100% Blue, 100%+ Green).</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="app.exportTableToCSV('sales-table', 'fischer_dealer_sales.csv')"><i class="fa-solid fa-file-export"></i> Export CSV</button>
        </div>
      </div>

      <!-- Target Badging Legend Banner -->
      <div class="card" style="background: #FFFFFF; margin-bottom: 20px;">
        <div class="card-body" style="padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: gap; gap: 12px;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);"><i class="fa-solid fa-shield-halved" style="color: var(--fischer-red);"></i> Sales Target Badging Matrix:</div>
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <span class="badge badge-danger"><i class="fa-solid fa-circle-exclamation"></i> Less than 60% (Critical)</span>
            <span class="badge badge-warning"><i class="fa-solid fa-triangle-exclamation"></i> 60% - 80% (Moderate)</span>
            <span class="badge badge-info"><i class="fa-solid fa-check"></i> 80% - 100% (On Track)</span>
            <span class="badge badge-success"><i class="fa-solid fa-award"></i> 100%+ (Overachieved)</span>
          </div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="rounded-filter-bar">
        <div class="filter-pill-item">
          <span class="filter-pill-label">Filter by Dealer</span>
          <select id="filter-sales-dealer" class="filter-pill-control" onchange="app.filterSalesList()">
            <option value="ALL">All Dealers</option>
            ${dealers.map(d => `<option value="${d.id}">${d.name}</option>`).join("")}
          </select>
        </div>
        <div class="filter-pill-item">
          <span class="filter-pill-label">Achievement Badging</span>
          <select id="filter-sales-badge" class="filter-pill-control" onchange="app.filterSalesList()">
            <option value="ALL">All Badges</option>
            <option value="danger">&lt; 60% Critical (Red)</option>
            <option value="warning">60 - 80% (Moderate)</option>
            <option value="info">80 - 100% (On Track)</option>
            <option value="success">100%+ (Overachieved)</option>
          </select>
        </div>
        <button class="btn-filter-reset" onclick="app.resetSalesFilters()">Reset</button>
      </div>

      <!-- Sales Records Table -->
      <div class="card">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <h3 class="card-title"><i class="fa-solid fa-chart-line"></i> Recorded Sales Logs</h3>
          <button class="btn btn-sm btn-primary" id="btn-add-sales" onclick="app.openAddSalesModal()"><i class="fa-solid fa-receipt"></i> Add Sales Record</button>
        </div>
        <div class="table-responsive">
          <table class="data-table" id="sales-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Dealer & Outlet</th>
                <th>Period</th>
                <th>Supervisor</th>
                <th>Sales Amount</th>
                <th>Branch Target</th>
                <th>Achievement Badging</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="sales-list-tbody">
              <!-- Rendered dynamically -->
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.filterSalesList();
  }

  openAddSalesModal(salesId = null) {
    const isEdit = !!salesId;
    const sale = isEdit ? window.store.sales.find(s => s.id === salesId) : null;
    const dealers = window.store.dealers;
    const modalBody = document.getElementById("generic-modal-body");
    const modalTitle = document.getElementById("generic-modal-title");

    modalTitle.innerHTML = `<i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-receipt'}" style="color: var(--fischer-red); margin-right: 8px;"></i> ${isEdit ? 'Edit Sales Record' : 'Add Sales Record'}`;

    const defaultStart = sale ? sale.startDate : (new Date().toISOString().slice(0, 7) + "-01");
    const defaultEnd = sale ? sale.endDate : new Date().toISOString().split("T")[0];

    modalBody.innerHTML = `
      <form id="form-sales-modal" onsubmit="app.handleSaveSalesModal(event, '${salesId || ''}')">
        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Select Dealer <span class="req">*</span></label>
            <select id="modal-sales-dealer" class="form-control" required onchange="app.handleModalSalesDealerChange(this.value)">
              <option value="">-- Select Dealer --</option>
              ${dealers.map(d => `<option value="${d.id}" ${sale && sale.dealerId === d.id ? 'selected' : ''}>${d.name} (${d.city || d.location})</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Select Branch <span class="req">*</span></label>
            <select id="modal-sales-branch" class="form-control" required>
              <option value="">-- Select Branch --</option>
            </select>
          </div>
        </div>

        <div class="grid-2-col">
          <div class="form-group">
            <label class="form-label">Date Period From <span class="req">*</span></label>
            <input type="date" id="modal-sales-start-date" class="form-control" value="${defaultStart}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Date Period To <span class="req">*</span></label>
            <input type="date" id="modal-sales-end-date" class="form-control" value="${defaultEnd}" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Sales Amount (${window.store.currency}) <span class="req">*</span></label>
          <input type="number" id="modal-sales-amount" class="form-control" placeholder="e.g. 52500" value="${sale ? sale.salesAmount : ''}" required>
        </div>

        <div class="form-group">
          <label class="form-label">Remarks / Growth Driver</label>
          <textarea id="modal-sales-notes" class="form-control" rows="3" placeholder="Key drivers, road show impact, large contractor order...">${sale ? (sale.notes || '') : ''}</textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-color);">
          <button type="button" class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> ${isEdit ? 'Update Sales Record' : 'Record Sales'}</button>
        </div>
      </form>
    `;

    // Populate dependent branch dropdown
    const selectedDealerId = sale ? sale.dealerId : (dealers[0] ? dealers[0].id : "");
    if (!sale && dealers.length > 0) {
      const dSelect = document.getElementById("modal-sales-dealer");
      if (dSelect) dSelect.value = selectedDealerId;
    }
    this.handleModalSalesDealerChange(selectedDealerId, sale ? sale.branchId : null);

    document.getElementById("generic-modal").classList.add("active");
  }

  handleModalSalesDealerChange(dealerId, selectedBranchId = null) {
    const branchSelect = document.getElementById("modal-sales-branch") || document.getElementById("sales-branch-input");
    if (!branchSelect) return;
    branchSelect.innerHTML = '<option value="">-- Select Branch --</option>';

    const dealer = window.store.getDealer(dealerId);
    if (dealer && dealer.branches) {
      dealer.branches.forEach(b => {
        const opt = document.createElement("option");
        opt.value = b.id;
        opt.textContent = `${b.name} (${b.location})`;
        if (selectedBranchId && b.id === selectedBranchId) {
          opt.selected = true;
        }
        branchSelect.appendChild(opt);
      });
      if (!selectedBranchId && dealer.branches.length > 0) {
        branchSelect.value = dealer.branches[0].id;
      }
    }
  }

  handleSalesDealerChange(dealerId) {
    this.handleModalSalesDealerChange(dealerId);
  }

  handleSaveSalesModal(e, salesId = null) {
    e.preventDefault();
    const dealerId = (document.getElementById("modal-sales-dealer") || document.getElementById("sales-dealer-input"))?.value;
    const branchId = (document.getElementById("modal-sales-branch") || document.getElementById("sales-branch-input"))?.value;
    const startDate = (document.getElementById("modal-sales-start-date") || document.getElementById("sales-start-date"))?.value;
    const endDate = (document.getElementById("modal-sales-end-date") || document.getElementById("sales-end-date"))?.value;
    const amount = Number((document.getElementById("modal-sales-amount") || document.getElementById("sales-amount-input"))?.value) || 0;
    const notes = (document.getElementById("modal-sales-notes") || document.getElementById("sales-notes-input"))?.value.trim() || "";

    if (!dealerId || !branchId || !startDate || !amount) {
      this.showToast("Please fill all required sales fields", "error");
      return;
    }

    if (salesId) {
      const sale = window.store.sales.find(s => s.id === salesId);
      if (sale) {
        sale.dealerId = dealerId;
        sale.branchId = branchId;
        sale.startDate = startDate;
        sale.endDate = endDate;
        sale.monthYear = startDate.substring(0, 7);
        sale.salesAmount = amount;
        sale.notes = notes;
        window.store.saveState();
        this.closeAllModals();
        this.showToast("Sales record updated successfully!", "success");
        this.filterSalesList();
      }
    } else {
      const newSale = {
        id: "sal_" + Date.now(),
        dealerId,
        branchId,
        startDate,
        endDate,
        monthYear: startDate.substring(0, 7),
        salesAmount: amount,
        notes
      };
      window.store.sales.unshift(newSale);
      window.store.saveState();
      this.closeAllModals();
      this.showToast("Sales logged and target calculated!", "success");
      this.filterSalesList();
    }
  }

  handleSaveSales(e) {
    this.handleSaveSalesModal(e);
  }

  deleteSalesRecord(salesId) {
    if (confirm("Are you sure you want to delete this sales log?")) {
      window.store.sales = window.store.sales.filter(s => s.id !== salesId);
      window.store.saveState();
      this.showToast("Sales record deleted", "info");
      this.filterSalesList();
    }
  }

  filterSalesList() {
    const tbody = document.getElementById("sales-list-tbody");
    if (!tbody) return;

    const dealerFilter = document.getElementById("filter-sales-dealer")?.value || "ALL";
    const badgeFilter = document.getElementById("filter-sales-badge")?.value || "ALL";

    let filtered = window.store.sales.filter(s => {
      if (dealerFilter !== "ALL" && s.dealerId !== dealerFilter) return false;
      return true;
    });

    tbody.innerHTML = filtered.map((s, idx) => {
      const dealer = window.store.getDealer(s.dealerId);
      const branch = window.store.getBranch(s.dealerId, s.branchId);
      const sup = dealer ? window.store.getSupervisor(dealer.supervisorId) : null;
      const branchTarget = branch ? branch.target : (dealer ? Math.round(dealer.salesTarget / (dealer.branches?.length || 1)) : 0);
      const badge = window.store.getAchievementBadge(s.salesAmount, branchTarget);

      if (badgeFilter !== "ALL") {
        if (badgeFilter === "danger" && badge.pct >= 60) return '';
        if (badgeFilter === "warning" && (badge.pct < 60 || badge.pct > 80)) return '';
        if (badgeFilter === "info" && (badge.pct <= 80 || badge.pct >= 100)) return '';
        if (badgeFilter === "success" && badge.pct < 100) return '';
      }

      return `
        <tr>
          <td>${idx + 1}</td>
          <td>
            <strong>${dealer ? dealer.name : 'Unknown'}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-code-branch"></i> ${branch ? branch.name : '-'}</div>
          </td>
          <td><span style="font-size: 0.78rem; color: var(--text-muted);">${s.startDate} ~ ${s.endDate}</span></td>
          <td><span class="badge badge-neutral">${sup ? sup.name : '-'}</span></td>
          <td><strong>${window.store.formatMoney(s.salesAmount)}</strong></td>
          <td><span style="color: var(--text-muted); font-size: 0.82rem;">${window.store.formatMoney(branchTarget)}</span></td>
          <td>
            <span class="badge ${badge.class}">${badge.label} (${badge.text})</span>
          </td>
          <td><span style="font-size: 0.78rem; color: var(--text-muted);">${s.notes || '-'}</span></td>
          <td>
            <div style="display: flex; gap: 4px;">
              <button class="btn-icon edit" title="Edit Sales Record" onclick="app.openAddSalesModal('${s.id}')"><i class="fa-solid fa-pencil"></i></button>
              <button class="btn-icon delete" title="Delete Record" onclick="app.deleteSalesRecord('${s.id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  resetSalesFilters() {
    if (document.getElementById("filter-sales-dealer")) document.getElementById("filter-sales-dealer").value = "ALL";
    if (document.getElementById("filter-sales-badge")) document.getElementById("filter-sales-badge").value = "ALL";
    this.filterSalesList();
  }

  /* ==========================================================================
     8. Reports & Gap Comparison Analytics Hub
     ========================================================================== */

  // A. Sales / Marketing Head Report
  renderHeadReport() {
    const container = document.getElementById("reports-head-container");
    if (!container) return;

    const heads = window.store.salesHeads;
    const totalSales = window.store.sales.reduce((sum, s) => sum + Number(s.salesAmount || 0), 0);
    const totalSpend = window.store.events.reduce((sum, e) => sum + Number(e.amountSpend || 0), 0);

    container.innerHTML = `
      <div class="page-title-row">
        <div>
          <h2 class="page-title">Sales / Marketing Head Report</h2>
          <p class="page-subtitle">Monthly and regional performance overview of sales and marketing heads.</p>
        </div>
        <div class="page-actions">
          <div class="nav-tabs-bar" style="margin-bottom: 0; border-bottom: none;">
            <button class="tab-btn active" onclick="app.switchReportTab(this, 'monthly')">Monthly</button>
            <button class="tab-btn" onclick="app.switchReportTab(this, 'yearly')">Yearly</button>
            <button class="tab-btn" onclick="app.switchReportTab(this, 'weekly')">Weekly</button>
            <button class="tab-btn" onclick="app.switchReportTab(this, 'custom')">Custom Date</button>
          </div>
          <div class="page-action-buttons">
            <button class="btn btn-secondary" onclick="window.print()"><i class="fa-solid fa-print"></i> Print</button>
            <button class="btn btn-primary" onclick="app.exportTableToCSV('head-report-table', 'sales_head_report.csv')"><i class="fa-solid fa-download"></i> Export</button>
          </div>
        </div>
      </div>

      <!-- KPI Summary Cards (Dashboard Card Design) -->
      <div class="metrics-row-6">
        <!-- Card 1: Total Heads with Wave Graphic -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon red"><i class="fa-solid fa-user-tie"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Heads</div>
              <div class="ref-card-value">${heads.length}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text up"><i class="fa-solid fa-globe"></i> Across all zones</div>
          </div>
          <svg class="ref-wave-bg" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0,80 C150,140 350,20 500,90 L500,150 L0,150 Z" fill="#E30613"></path>
          </svg>
        </div>

        <!-- Card 2: Total Supervisors with Purple Sparkline -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon purple"><i class="fa-solid fa-users"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Supervisors</div>
              <div class="ref-card-value">${window.store.supervisors.length}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text purple"><i class="fa-solid fa-users"></i> Field leaders</div>
            <svg class="ref-sparkline-svg" viewBox="0 0 60 24">
              <path d="M0,18 Q15,4 30,12 T60,6" fill="none" stroke="#7C3AED" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Card 3: Total Sales with Progress Track -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon green"><i class="fa-solid fa-sack-dollar"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Sales (${window.store.currency})</div>
              <div class="ref-card-value">${window.store.formatMoney(totalSales).replace(window.store.currency + ' ', '')}</div>
            </div>
          </div>
          <div class="ref-card-bottom" style="margin-top: 14px;">
            <div class="ref-progress-track">
              <div class="ref-progress-fill green" style="width: 82%;"></div>
            </div>
          </div>
        </div>

        <!-- Card 4: Total Event Spend with Orange Progress Track -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon orange"><i class="fa-solid fa-bullhorn"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Event Spend (${window.store.currency})</div>
              <div class="ref-card-value">${window.store.formatMoney(totalSpend).replace(window.store.currency + ' ', '')}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text orange"><i class="fa-solid fa-chart-line"></i> Active budget</div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid-2-col" style="margin-bottom: 24px;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><i class="fa-solid fa-chart-column"></i> Sales vs Target by Sales / Marketing Head</h3>
          </div>
          <div class="card-body" style="height: 280px;">
            <canvas id="chart-head-sales-target"></canvas>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><i class="fa-solid fa-pie-chart"></i> Dealers Distribution by Head</h3>
          </div>
          <div class="card-body" style="height: 280px;">
            <canvas id="chart-head-dealer-dist"></canvas>
          </div>
        </div>
      </div>

      <!-- Detailed Breakdown Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="fa-solid fa-table"></i> Sales / Marketing Head Performance Details</h3>
        </div>
        <div class="table-responsive">
          <table class="data-table" id="head-report-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Sales / Marketing Head</th>
                <th>Region</th>
                <th>Supervisors</th>
                <th>Dealers</th>
                <th>Sales Amount</th>
                <th>Event Spend</th>
                <th>Target</th>
                <th>Achievement</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${heads.map((h, idx) => {
                const sups = window.store.supervisors.filter(s => s.headId === h.id);
                const dealers = window.store.dealers.filter(d => d.headId === h.id);
                const headSales = window.store.sales.filter(s => {
                  const deal = window.store.getDealer(s.dealerId);
                  return deal && deal.headId === h.id;
                }).reduce((sum, s) => sum + Number(s.salesAmount || 0), 0);

                const headSpend = window.store.events.filter(e => {
                  const deal = window.store.getDealer(e.dealerId);
                  return deal && deal.headId === h.id;
                }).reduce((sum, e) => sum + Number(e.amountSpend || 0), 0);

                const headTarget = dealers.reduce((sum, d) => sum + Number(d.salesTarget || 0), 0);
                const badge = window.store.getAchievementBadge(headSales, headTarget);

                return `
                  <tr>
                    <td>${idx + 1}</td>
                    <td><strong>${h.name}</strong></td>
                    <td><span class="badge badge-neutral">${h.region}</span></td>
                    <td>${sups.length}</td>
                    <td>${dealers.length}</td>
                    <td><strong>${window.store.formatMoney(headSales)}</strong></td>
                    <td><span style="color: var(--fischer-red); font-weight: 600;">${window.store.formatMoney(headSpend)}</span></td>
                    <td>${window.store.formatMoney(headTarget)}</td>
                    <td><span class="badge ${badge.class}">${badge.label}</span></td>
                    <td><span class="status-tag ${h.status === 'Active' ? 'active' : 'inactive'}">${h.status}</span></td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.renderHeadReportCharts();
  }

  renderHeadReportCharts() {
    const ctxBar = document.getElementById("chart-head-sales-target");
    if (ctxBar) {
      if (this.charts.headBar) this.charts.headBar.destroy();
      const heads = window.store.salesHeads;
      const labels = heads.map(h => h.name);
      const sales = heads.map(h => {
        return window.store.sales.filter(s => {
          const deal = window.store.getDealer(s.dealerId);
          return deal && deal.headId === h.id;
        }).reduce((sum, s) => sum + Number(s.salesAmount || 0), 0);
      });
      const targets = heads.map(h => {
        return window.store.dealers.filter(d => d.headId === h.id).reduce((sum, d) => sum + Number(d.salesTarget || 0), 0);
      });

      this.charts.headBar = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            { label: 'Sales (' + window.store.currency + ')', data: sales, backgroundColor: '#E30613', borderRadius: 4 },
            { label: 'Target (' + window.store.currency + ')', data: targets, backgroundColor: '#94A3B8', borderRadius: 4 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true, ticks: { callback: v => `${v/1000}k` } } }
        }
      });
    }

    const ctxPie = document.getElementById("chart-head-dealer-dist");
    if (ctxPie) {
      if (this.charts.headPie) this.charts.headPie.destroy();
      const heads = window.store.salesHeads;
      const labels = heads.map(h => h.name);
      const data = heads.map(h => window.store.dealers.filter(d => d.headId === h.id).length);

      this.charts.headPie = new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels,
          datasets: [{ data, backgroundColor: ['#E30613', '#2563EB', '#10B981', '#F59E0B', '#8B5CF6'] }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }

  // B. Sales Supervisor Performance Report (Uploaded Reference Layout)
  renderSupervisorReport() {
    const container = document.getElementById("reports-supervisor-container");
    if (!container) return;

    const sups = window.store.supervisors;
    let totalBranches = 0;
    let totalTarget = 0;
    window.store.dealers.forEach(d => {
      totalBranches += (d.branches ? d.branches.length : 0);
      totalTarget += Number(d.salesTarget || 0);
    });

    const totalSales = window.store.sales.reduce((sum, s) => sum + Number(s.salesAmount || 0), 0);
    const achievementPct = totalTarget > 0 ? Math.round((totalSales / totalTarget) * 100) : 82;

    container.innerHTML = `
      <!-- 1. Hero Header Banner -->
      <div class="page-hero-banner">
        <div>
          <div class="page-hero-welcome">WELCOME TO FISCHER</div>
          <h2 class="page-hero-title">Sales Supervisor Report (Monthly)</h2>
          <p class="page-hero-subtitle">Track performance, analyze growth and drive success.</p>
        </div>
        <div class="page-hero-actions">
          <div class="hero-pill-select"><i class="fa-regular fa-calendar"></i> Mar 2024</div>
          <button class="hero-export-btn" onclick="app.exportTableToCSV('sup-performance-details-table', 'sales_supervisor_report.csv')">
            <i class="fa-solid fa-download"></i> Export
          </button>
        </div>
      </div>

      <!-- 2. Rounded Filter Bar -->
      <div class="rounded-filter-bar">
        <div class="filter-pill-item">
          <span class="filter-pill-label">Month <span class="req">*</span></span>
          <select class="filter-pill-control" id="rep-filter-month">
            <option value="2024-03">Mar 2024</option>
            <option value="2024-02">Feb 2024</option>
            <option value="2024-01">Jan 2024</option>
          </select>
        </div>
        <div class="filter-pill-item">
          <span class="filter-pill-label">Sales Supervisor</span>
          <select class="filter-pill-control" id="rep-filter-sup">
            <option value="ALL">👤 All Supervisors</option>
            ${sups.map(s => `<option value="${s.id}">${s.name}</option>`).join("")}
          </select>
        </div>
        <div class="filter-pill-item">
          <span class="filter-pill-label">Dealer</span>
          <select class="filter-pill-control" id="rep-filter-dealer">
            <option value="ALL">🏪 All Dealers</option>
            ${window.store.dealers.map(d => `<option value="${d.id}">${d.name}</option>`).join("")}
          </select>
        </div>
        <div class="filter-pill-item">
          <span class="filter-pill-label">Branch</span>
          <select class="filter-pill-control" id="rep-filter-branch">
            <option value="ALL">🏢 All Branches</option>
          </select>
        </div>
        <div class="filter-pill-item">
          <span class="filter-pill-label">Location</span>
          <select class="filter-pill-control" id="rep-filter-loc">
            <option value="ALL">📍 All Locations</option>
            <option value="Dubai">Dubai</option>
            <option value="Sharjah">Sharjah</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
            <option value="Ajman">Ajman</option>
            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
          </select>
        </div>
        <button class="btn-filter-view" onclick="app.showToast('Supervisor report refreshed for selected filters', 'success')">
          <i class="fa-solid fa-magnifying-glass"></i> View Report
        </button>
        <button class="btn-filter-reset" onclick="app.renderSupervisorReport()">Reset</button>
      </div>

      <!-- 3. Exact 6 Metrics Cards Row -->
      <div class="metrics-row-6">
        <!-- Card 1: Total Sales (AED) with Wave Graphic -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon red"><i class="fa-solid fa-coins"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Sales (${window.store.currency})</div>
              <div class="ref-card-value">${window.store.formatMoney(totalSales).replace(window.store.currency + ' ', '')}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text up"><i class="fa-solid fa-arrow-up"></i> +12% <span style="font-weight: 500; color: #64748B;">vs. previous month</span></div>
          </div>
          <svg class="ref-wave-bg" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0,80 C150,140 350,20 500,90 L500,150 L0,150 Z" fill="#E30613"></path>
          </svg>
        </div>

        <!-- Card 2: Total Target (AED) with Orange Progress Track -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon orange"><i class="fa-solid fa-bullseye"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Target (${window.store.currency})</div>
              <div class="ref-card-value">${window.store.formatMoney(totalTarget).replace(window.store.currency + ' ', '')}</div>
            </div>
          </div>
          <div class="ref-card-bottom" style="flex-direction: column; align-items: flex-start; gap: 6px;">
            <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.72rem; font-weight: 700; color: #FF7A00;">
              <span>Target Progress</span>
              <span>${achievementPct}%</span>
            </div>
            <div class="ref-progress-track">
              <div class="ref-progress-fill orange" style="width: ${Math.min(achievementPct, 100)}%;"></div>
            </div>
          </div>
        </div>

        <!-- Card 3: Achievement with Green Capsule Bar -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon green"><i class="fa-solid fa-trophy"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Achievement</div>
              <div class="ref-card-value">${achievementPct}%</div>
            </div>
          </div>
          <div class="ref-card-bottom" style="margin-top: 14px;">
            <div class="ref-progress-track">
              <div class="ref-progress-fill green" style="width: ${Math.min(achievementPct, 100)}%;"></div>
            </div>
          </div>
        </div>

        <!-- Card 4: Total Supervisors with Purple Sparkline -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon purple"><i class="fa-solid fa-users"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Supervisors</div>
              <div class="ref-card-value">${sups.length}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text purple"><i class="fa-solid fa-users"></i> ↑ +0</div>
            <svg class="ref-sparkline-svg" viewBox="0 0 60 24">
              <path d="M0,18 Q15,4 30,12 T60,6" fill="none" stroke="#7C3AED" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Card 5: Total Dealers with Blue Sparkline -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon blue"><i class="fa-solid fa-store"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Dealers</div>
              <div class="ref-card-value">${window.store.dealers.length}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text blue"><i class="fa-solid fa-arrow-up"></i> +2</div>
            <svg class="ref-sparkline-svg" viewBox="0 0 60 24">
              <path d="M0,20 Q15,16 30,8 T60,4" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Card 6: Total Branches with Teal Sparkline -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon teal"><i class="fa-solid fa-building"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Branches</div>
              <div class="ref-card-value">${totalBranches}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text teal"><i class="fa-solid fa-arrow-up"></i> +3</div>
            <svg class="ref-sparkline-svg" viewBox="0 0 60 24">
              <path d="M0,22 Q20,18 35,10 T60,2" fill="none" stroke="#0D9488" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 4. Two Charts Row -->
      <div class="grid-2-col" style="margin-bottom: 24px;">
        <!-- Left: Sales vs Target by Sales Supervisor -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><span class="card-title-badge" style="background: rgba(227,6,19,0.1); color: #E30613;"><i class="fa-solid fa-chart-column"></i></span> Sales vs Target by Sales Supervisor</h3>
          </div>
          <div class="card-body" style="height: 300px;">
            <canvas id="chart-sup-sales-vs-target"></canvas>
          </div>
        </div>

        <!-- Right: Supervisors by Target Achievement Donut -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><span class="card-title-badge" style="background: rgba(16,185,129,0.1); color: #10B981;"><i class="fa-solid fa-chart-pie"></i></span> Supervisors by Target Achievement</h3>
          </div>
          <div class="card-body" style="height: 300px; display: flex; align-items: center; justify-content: space-between; gap: 16px;">
            <div style="flex: 1; height: 100%; position: relative;">
              <canvas id="chart-sup-achievement-donut"></canvas>
            </div>
            <div style="width: 170px; display: flex; flex-direction: column; gap: 10px; font-size: 0.8rem;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #10B981;"></span> 100% and above</span>
                <strong>2 <span style="color: #64748B; font-weight: normal;">40%</span></strong>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #F59E0B;"></span> 60% - 80%</span>
                <strong>2 <span style="color: #64748B; font-weight: normal;">40%</span></strong>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #EF4444;"></span> Less than 60%</span>
                <strong>1 <span style="color: #64748B; font-weight: normal;">20%</span></strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. Sales Supervisor Performance Details Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><span class="card-title-badge" style="background: rgba(249,115,22,0.1); color: #F97316;"><i class="fa-solid fa-table-list"></i></span> Sales Supervisor Performance Details</h3>
        </div>
        <div class="table-responsive">
          <table class="data-table" id="sup-performance-details-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Sales Supervisor</th>
                <th>No. of Dealers</th>
                <th>No. of Branches</th>
                <th>Sales Amount (${window.store.currency})</th>
                <th>Sales Target (${window.store.currency})</th>
                <th>Achievement</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${(() => {
                const sampleRows = [
                  { name: "Ramesh Kumar", dealers: 6, branches: 14, sales: 75200, target: 90000, ach: "84%", status: "On Track", statusClass: "ontrack" },
                  { name: "Sara Ahmed", dealers: 4, branches: 8, sales: 48600, target: 60000, ach: "81%", status: "On Track", statusClass: "ontrack" },
                  { name: "Mohammed Ali", dealers: 3, branches: 7, sales: 39800, target: 50000, ach: "80%", status: "Needs Attention", statusClass: "attention" },
                  { name: "Anita Sharma", dealers: 4, branches: 9, sales: 57300, target: 70000, ach: "82%", status: "On Track", statusClass: "ontrack" },
                  { name: "David Lee", dealers: 1, branches: 4, sales: 24900, target: 50000, ach: "50%", status: "At Risk", statusClass: "risk" }
                ];

                return sampleRows.map((r, idx) => `
                  <tr>
                    <td>${idx + 1}</td>
                    <td><strong style="font-size: 0.9rem;">${r.name}</strong></td>
                    <td>${r.dealers}</td>
                    <td>${r.branches}</td>
                    <td><strong>${r.sales.toLocaleString()}</strong></td>
                    <td>${r.target.toLocaleString()}</td>
                    <td><span class="badge ${r.statusClass === 'risk' ? 'badge-danger' : (r.statusClass === 'attention' ? 'badge-warning' : 'badge-success')}">${r.ach}</span></td>
                    <td><span class="status-pill ${r.statusClass}">${r.status}</span></td>
                  </tr>
                `).join("");
              })()}
            </tbody>
            <tfoot style="background: #F8FAFC; font-weight: 700;">
              <tr>
                <td colspan="2"><strong>Total</strong></td>
                <td><strong>18</strong></td>
                <td><strong>42</strong></td>
                <td><strong>245,800</strong></td>
                <td><strong>300,000</strong></td>
                <td><span class="badge badge-success">82%</span></td>
                <td>-</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `;

    this.renderSupervisorReportCharts();
  }

  renderSupervisorReportCharts() {
    // 1. Sales vs Target Bar Chart
    const ctxBar = document.getElementById("chart-sup-sales-vs-target");
    if (ctxBar) {
      if (this.charts.supReportBar) this.charts.supReportBar.destroy();

      this.charts.supReportBar = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Ramesh Kumar', 'Sara Ahmed', 'Mohammed Ali', 'Anita Sharma', 'David Lee'],
          datasets: [
            {
              label: 'Sales Amount',
              data: [75200, 48600, 39800, 57300, 24900],
              backgroundColor: '#E30613',
              borderRadius: 6,
              barPercentage: 0.6
            },
            {
              label: 'Sales Target',
              data: [90000, 60000, 50000, 70000, 50000],
              backgroundColor: '#C7D2FE',
              borderRadius: 6,
              barPercentage: 0.6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', align: 'end', labels: { boxWidth: 10, font: { family: 'Inter', size: 12 } } },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${window.store.currency} ${ctx.raw.toLocaleString()}`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: (v) => `${v.toLocaleString()}` },
              grid: { color: '#F1F5F9' }
            },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // 2. Target Achievement Donut
    const ctxDonut = document.getElementById("chart-sup-achievement-donut");
    if (ctxDonut) {
      if (this.charts.supReportDonut) this.charts.supReportDonut.destroy();

      this.charts.supReportDonut = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
          labels: ['100% and above', '60% - 80%', 'Less than 60%'],
          datasets: [{
            data: [2, 2, 1],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
            borderWidth: 3,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          cutout: '70%'
        }
      });
    }
  }

  // C. Dealer & Branch Sales Report
  renderDealerReport() {
    const container = document.getElementById("reports-dealer-container");
    if (!container) return;

    const dealers = window.store.dealers;

    container.innerHTML = `
      <div class="page-title-row">
        <div>
          <h2 class="page-title">Dealer & Branch Sales Report</h2>
          <p class="page-subtitle">Deep dive into dealer performance, individual branch sales volume, location metrics and target compliance.</p>
        </div>
        <div class="page-actions">
          <div class="page-action-buttons">
            <button class="btn btn-secondary" onclick="window.print()"><i class="fa-solid fa-print"></i> Print</button>
            <button class="btn btn-primary" onclick="app.exportTableToCSV('dealer-report-table', 'dealer_branch_report.csv')"><i class="fa-solid fa-download"></i> Export</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="fa-solid fa-store"></i> Branch Sales Benchmarks</h3>
        </div>
        <div class="table-responsive">
          <table class="data-table" id="dealer-report-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Dealer</th>
                <th>Branch Outlet</th>
                <th>Location / Emirate</th>
                <th>Supervisor</th>
                <th>Actual Sales</th>
                <th>Branch Target</th>
                <th>Target Achievement</th>
                <th>Events Conducted</th>
                <th>Branch Spend</th>
              </tr>
            </thead>
            <tbody>
              ${(() => {
                let rows = [];
                let counter = 1;
                dealers.forEach(d => {
                  const sup = window.store.getSupervisor(d.supervisorId);
                  (d.branches || []).forEach(b => {
                    const bSales = window.store.sales
                      .filter(s => s.dealerId === d.id && s.branchId === b.id)
                      .reduce((sum, s) => sum + Number(s.salesAmount || 0), 0);

                    const bEvents = window.store.events.filter(e => e.dealerId === d.id && e.branchId === b.id);
                    const bSpend = bEvents.reduce((sum, e) => sum + Number(e.amountSpend || 0), 0);
                    const bTarget = b.target || Math.round(d.salesTarget / (d.branches.length || 1));
                    const badge = window.store.getAchievementBadge(bSales, bTarget);

                    rows.push(`
                      <tr>
                        <td>${counter++}</td>
                        <td><strong>${d.name}</strong></td>
                        <td><span style="font-weight: 600;"><i class="fa-solid fa-code-branch"></i> ${b.name}</span></td>
                        <td><span class="badge badge-neutral">${b.location}</span></td>
                        <td>${sup ? sup.name : '-'}</td>
                        <td><strong>${window.store.formatMoney(bSales)}</strong></td>
                        <td>${window.store.formatMoney(bTarget)}</td>
                        <td><span class="badge ${badge.class}">${badge.label} (${badge.text})</span></td>
                        <td><span class="badge badge-info">${bEvents.length} Events</span></td>
                        <td><span style="color: var(--fischer-red); font-weight: 600;">${window.store.formatMoney(bSpend)}</span></td>
                      </tr>
                    `);
                  });
                });
                return rows.join("");
              })()}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // D. Promotion Spend vs Sales Gap Comparison Report (The Main Value Driver)
  renderGapAnalysisReport() {
    const container = document.getElementById("reports-gap-container");
    if (!container) return;

    const totalSales = window.store.sales.reduce((sum, s) => sum + Number(s.salesAmount || 0), 0);
    const totalSpend = window.store.events.reduce((sum, e) => sum + Number(e.amountSpend || 0), 0);
    const overallROI = totalSpend > 0 ? (totalSales / totalSpend).toFixed(1) : 0;
    const spendPercentage = totalSales > 0 ? ((totalSpend / totalSales) * 100).toFixed(1) : 0;

    container.innerHTML = `
      <div class="page-title-row">
        <div>
          <h2 class="page-title">Promotion Spend vs. Sales Gap Analysis</h2>
          <p class="page-subtitle">Understand correlation, ROI and gaps between promotional / branding expenditure and actual dealer revenue output.</p>
        </div>
        <div class="page-actions">
          <div class="page-action-buttons">
            <button class="btn btn-secondary" onclick="window.print()"><i class="fa-solid fa-print"></i> Print</button>
            <button class="btn btn-primary" onclick="app.exportTableToCSV('gap-report-table', 'promotion_sales_gap_analysis.csv')"><i class="fa-solid fa-download"></i> Export</button>
          </div>
        </div>
      </div>

      <!-- Highlights Banner (Dashboard Card Design) -->
      <div class="metrics-row-3">
        <!-- Card 1: Total Promo Investment (AED) with Wave Graphic -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon red"><i class="fa-solid fa-hand-holding-dollar"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Total Promo Investment (${window.store.currency})</div>
              <div class="ref-card-value">${window.store.formatMoney(totalSpend).replace(window.store.currency + ' ', '')}</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text" style="color: #64748B;"><i class="fa-solid fa-chart-pie" style="color: #E30613;"></i> ${spendPercentage}% of total revenue</div>
          </div>
          <svg class="ref-wave-bg" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0,80 C150,140 350,20 500,90 L500,150 L0,150 Z" fill="#E30613"></path>
          </svg>
        </div>

        <!-- Card 2: Sales Revenue Output (AED) with Progress Track -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon green"><i class="fa-solid fa-arrow-trend-up"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Sales Revenue Output (${window.store.currency})</div>
              <div class="ref-card-value">${window.store.formatMoney(totalSales).replace(window.store.currency + ' ', '')}</div>
            </div>
          </div>
          <div class="ref-card-bottom" style="flex-direction: column; align-items: flex-start; gap: 6px;">
            <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.72rem; font-weight: 700; color: #10B981;">
              <span><i class="fa-solid fa-bolt"></i> Strong Conversion</span>
              <span>100%</span>
            </div>
            <div class="ref-progress-track">
              <div class="ref-progress-fill green" style="width: 100%;"></div>
            </div>
          </div>
        </div>

        <!-- Card 3: Overall Promotion ROI with Purple Sparkline -->
        <div class="ref-stat-card">
          <div class="ref-card-header">
            <div class="ref-card-icon purple"><i class="fa-solid fa-calculator"></i></div>
            <div class="ref-card-title-box">
              <div class="ref-card-label">Overall Promotion ROI</div>
              <div class="ref-card-value">${overallROI}x</div>
            </div>
          </div>
          <div class="ref-card-bottom">
            <div class="ref-trend-text purple"><i class="fa-solid fa-arrow-trend-up"></i> 1 : ${overallROI} Multiplier</div>
            <svg class="ref-sparkline-svg" viewBox="0 0 60 24">
              <path d="M0,18 Q15,4 30,12 T60,6" fill="none" stroke="#7C3AED" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Main Correlation Chart -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="fa-solid fa-chart-line"></i> Spend vs Sales Correlation by Dealer</h3>
        </div>
        <div class="card-body" style="height: 340px;">
          <canvas id="chart-gap-correlation"></canvas>
        </div>
      </div>

      <!-- Gap Matrix Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="fa-solid fa-table-columns"></i> Dealer Promotion-to-Sales Comparison Breakdown</h3>
        </div>
        <div class="table-responsive">
          <table class="data-table" id="gap-report-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Dealer Name</th>
                <th>Location</th>
                <th>Event Activities Conducted</th>
                <th>Total Event Spend (${window.store.currency})</th>
                <th>Total Sales Generated (${window.store.currency})</th>
                <th>Spend to Sales Ratio</th>
                <th>Revenue Multiplier (ROI)</th>
                <th>Efficiency Assessment</th>
              </tr>
            </thead>
            <tbody>
              ${window.store.dealers.map((d, idx) => {
                const dEvents = window.store.events.filter(e => e.dealerId === d.id);
                const dSpend = dEvents.reduce((sum, e) => sum + Number(e.amountSpend || 0), 0);
                const dSales = window.store.sales.filter(s => s.dealerId === d.id).reduce((sum, s) => sum + Number(s.salesAmount || 0), 0);
                const ratio = dSales > 0 ? ((dSpend / dSales) * 100).toFixed(1) + "%" : "0%";
                const roi = dSpend > 0 ? (dSales / dSpend).toFixed(1) + "x" : "N/A";

                let assessmentBadge = '<span class="badge badge-success">High Return</span>';
                if (dSpend > 0 && dSales / dSpend < 10) {
                  assessmentBadge = '<span class="badge badge-warning">Needs Review</span>';
                }
                if (dSpend === 0 && dSales > 0) {
                  assessmentBadge = '<span class="badge badge-info">Organic Sales</span>';
                }

                return `
                  <tr>
                    <td>${idx + 1}</td>
                    <td><strong>${d.name}</strong></td>
                    <td><span class="badge badge-neutral">${d.city || d.location}</span></td>
                    <td><span class="badge badge-neutral">${dEvents.length} Activities</span></td>
                    <td><strong style="color: var(--fischer-red);">${window.store.formatMoney(dSpend)}</strong></td>
                    <td><strong style="color: #15803D;">${window.store.formatMoney(dSales)}</strong></td>
                    <td><span style="font-weight: 600;">${ratio}</span></td>
                    <td><span class="badge badge-primary">${roi}</span></td>
                    <td>${assessmentBadge}</td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.renderGapCharts();
  }

  renderGapCharts() {
    const ctx = document.getElementById("chart-gap-correlation");
    if (!ctx) return;
    if (this.charts.gapChart) this.charts.gapChart.destroy();

    const dealers = window.store.dealers;
    const labels = dealers.map(d => d.name);
    const spendData = dealers.map(d => {
      return window.store.events.filter(e => e.dealerId === d.id).reduce((sum, e) => sum + Number(e.amountSpend || 0), 0);
    });
    const salesData = dealers.map(d => {
      return window.store.sales.filter(s => s.dealerId === d.id).reduce((sum, s) => sum + Number(s.salesAmount || 0), 0);
    });

    this.charts.gapChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Promotional Spend (' + window.store.currency + ')',
            data: spendData,
            backgroundColor: 'rgba(227, 6, 19, 0.85)',
            borderRadius: 6,
            yAxisID: 'y'
          },
          {
            type: 'line',
            label: 'Sales Revenue (' + window.store.currency + ')',
            data: salesData,
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            fill: true,
            tension: 0.3,
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: '#2563EB',
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${window.store.currency} ${ctx.raw.toLocaleString()}`
            }
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: { display: true, text: 'Promotional Spend' },
            grid: { color: '#F1F5F9' }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: { display: true, text: 'Sales Revenue' },
            grid: { drawOnChartArea: false }
          }
        }
      }
    });
  }

  switchReportTab(btn, period) {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    this.activeReportPeriod = period;
    this.showToast(`Report filtered for: ${period.toUpperCase()}`, "info");
  }

  /* ==========================================================================
     Helper Utilities (Modals, Toasts, Photo Lightbox, CSV Export)
     ========================================================================== */
  viewPhotoModal(imageUrl, caption = "Photo Proof") {
    const modalTitle = document.getElementById("generic-modal-title");
    const modalBody = document.getElementById("generic-modal-body");

    modalTitle.textContent = caption;
    modalBody.innerHTML = `
      <div class="image-lightbox-view">
        <img src="${imageUrl}" alt="${caption}" />
        <div style="margin-top: 12px; font-size: 0.9rem; color: var(--text-muted);">${caption}</div>
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: 18px;">
        <button class="btn btn-secondary modal-close-trigger" onclick="app.closeAllModals()">Close</button>
      </div>
    `;

    document.getElementById("generic-modal").classList.add("active");
  }

  closeAllModals() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
    document.querySelectorAll(".modal-box").forEach(b => b.classList.remove("modal-lg"));
  }

  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const icons = {
      success: '<i class="fa-solid fa-circle-check" style="color: #22C55E;"></i>',
      error: '<i class="fa-solid fa-triangle-exclamation" style="color: #EF4444;"></i>',
      info: '<i class="fa-solid fa-circle-info" style="color: #3B82F6;"></i>'
    };

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `${icons[type] || ''} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  exportTableToCSV(tableId, filename = "export.csv") {
    const table = document.getElementById(tableId);
    if (!table) {
      this.showToast("Table not found for export", "error");
      return;
    }

    let csv = [];
    const rows = table.querySelectorAll("tr");
    rows.forEach(row => {
      const cols = row.querySelectorAll("td, th");
      let rowData = [];
      cols.forEach(col => {
        let text = col.innerText.replace(/(\r\n|\n|\r)/gm, " ").trim();
        text = text.replace(/"/g, '""');
        rowData.push(`"${text}"`);
      });
      csv.push(rowData.join(","));
    });

    const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    this.showToast(`Exported ${filename} successfully!`, "success");
  }
}

// Global Application Instance
window.addEventListener("DOMContentLoaded", () => {
  window.app = new AppController();
});
