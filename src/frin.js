/* ==========================================================================
   Frin CSS — optional JavaScript
   --------------------------------------------------------------------------
   Tiny, dependency-free enhancements for interactive components.
   Only progressive enhancement: components still render without this file.

   - Modals:  any [data-frin-open-modal="myModal"] opens #myModal
   - Dropdowns: .frin-dropdown__toggle toggles .is-open on parent
   - Tabs:    .frin-tabs wires up tablist / panel switching (ARIA aware)
   - Navbar:  .frin-navbar__toggle toggles .is-open on the nav

   Exposes window.Frin with init() (auto-runs on DOMContentLoaded).
   ========================================================================== */
(function (global) {
  "use strict";

  function on(el, evt, fn, opts) {
    if (el) el.addEventListener(evt, fn, opts);
  }

  /* ---- Modals ---------------------------------------------------------- */
  function initModals() {
    document.querySelectorAll("[data-frin-open-modal]").forEach(function (trigger) {
      on(trigger, "click", function (e) {
        e.preventDefault();
        var modal = document.getElementById(trigger.getAttribute("data-frin-open-modal"));
        if (!modal) return;
        modal.classList.add("is-open");
        modal.removeAttribute("hidden");
        var focusable = modal.querySelector(".frin-modal__close, [autofocus], button, input, select, textarea, a[href]");
        if (focusable) focusable.focus();
      });
    });

    document.querySelectorAll(".frin-modal").forEach(function (modal) {
      function close() {
        modal.classList.remove("is-open");
        modal.setAttribute("hidden", "");
      }
      modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.closest(".frin-modal__close") || e.target.closest("[data-frin-close-modal]")) close();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("is-open")) close();
      });
    });
  }

  /* ---- Dropdowns ------------------------------------------------------- */
  function initDropdowns() {
    document.querySelectorAll(".frin-dropdown").forEach(function (dd) {
      var toggle = dd.querySelector(".frin-dropdown__toggle");
      on(toggle, "click", function (e) {
        e.stopPropagation();
        var willOpen = !dd.classList.contains("is-open");
        document.querySelectorAll(".frin-dropdown.is-open").forEach(function (o) {
          if (o !== dd) o.classList.remove("is-open");
        });
        dd.classList.toggle("is-open", willOpen);
      });
      dd.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { dd.classList.remove("is-open"); if (toggle) toggle.focus(); }
      });
    });
    document.addEventListener("click", function () {
      document.querySelectorAll(".frin-dropdown.is-open").forEach(function (o) {
        o.classList.remove("is-open");
      });
    });
  }

  /* ---- Tabs ------------------------------------------------------------ */
  function initTabs() {
    document.querySelectorAll(".frin-tabs").forEach(function (tabs) {
      var tablist = tabs.querySelector('[role="tablist"], .frin-tabs__list');
      var tabsEls = tabs.querySelectorAll('[role="tab"], .frin-tabs__tab');
      var panels = tabs.querySelectorAll('[role="tabpanel"], .frin-tabs__panel');

      function activate(tab, setFocus) {
        var id = tab.getAttribute("aria-controls") ||
                 tab.getAttribute("data-panel");
        tabsEls.forEach(function (t) {
          var selected = t === tab;
          t.setAttribute("aria-selected", selected ? "true" : "false");
          t.classList.toggle("is-active", selected);
          t.setAttribute("tabindex", selected ? "0" : "-1");
        });
        panels.forEach(function (p) {
          var match = (id && p.id === id) ||
                      p.getAttribute("data-panel") === tab.getAttribute("data-panel");
          p.classList.toggle("is-active", !!match);
          if (match) p.removeAttribute("hidden"); else p.setAttribute("hidden", "");
        });
        if (setFocus) tab.focus();
      }

      tabsEls.forEach(function (tab, i) {
        on(tab, "click", function () { activate(tab, false); });
        on(tab, "keydown", function (e) {
          var next = null;
          if (e.key === "ArrowRight") next = tabsEls[i + 1] || tabsEls[0];
          else if (e.key === "ArrowLeft") next = tabsEls[i - 1] || tabsEls[tabsEls.length - 1];
          else if (e.key === "Home") next = tabsEls[0];
          else if (e.key === "End") next = tabsEls[tabsEls.length - 1];
          if (next) { e.preventDefault(); activate(next, true); }
        });
      });

      // ensure first tab active by default
      var first = tabs.querySelector('[aria-selected="true"], .frin-tabs__tab.is-active');
      if (first) activate(first, false);
    });
  }

  /* ---- Navbar toggle --------------------------------------------------- */
  function initNavbar() {
    document.querySelectorAll(".frin-navbar__toggle").forEach(function (btn) {
      on(btn, "click", function () {
        var nav = btn.closest(".frin-navbar").querySelector(".frin-navbar__nav");
        if (nav) {
          var open = nav.classList.toggle("is-open");
          btn.setAttribute("aria-expanded", String(open));
        }
      });
    });
  }

  /* ---- Accordion ------------------------------------------------------- */
  function initAccordions() {
    document.querySelectorAll(".frin-accordion").forEach(function (acc) {
      var items = acc.querySelectorAll(".frin-accordion__item");
      items.forEach(function (item) {
        var trigger = item.querySelector(".frin-accordion__trigger");
        var panel = item.querySelector(".frin-accordion__panel");
        if (!trigger) return;
        var panelId = panel ? panel.id : null;
        if (panel && !panelId) { panel.id = "acc-" + Math.random().toString(36).slice(2, 8); }
        trigger.setAttribute("aria-expanded", item.classList.contains("is-open") ? "true" : "false");
        if (panel) trigger.setAttribute("aria-controls", panel.id);
        on(trigger, "click", function () {
          var willOpen = !item.classList.contains("is-open");
          // optional: close siblings when single-open behaviour is requested
          if (willOpen && acc.hasAttribute("data-single")) {
            items.forEach(function (it) {
              if (it !== item) {
                it.classList.remove("is-open");
                var t = it.querySelector(".frin-accordion__trigger");
                if (t) t.setAttribute("aria-expanded", "false");
              }
            });
          }
          item.classList.toggle("is-open", willOpen);
          trigger.setAttribute("aria-expanded", String(willOpen));
        });
      });
    });
  }

  /* ---- Toast ----------------------------------------------------------- */
  function showToast(opts) {
    opts = opts || {};
    var container = document.querySelector(".frin-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "frin-toast-container";
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }
    var toast = document.createElement("div");
    toast.className = "frin-toast" + (opts.variant ? " frin-toast--" + opts.variant : "");
    toast.setAttribute("role", "status");
    toast.innerHTML =
      '<div class="frin-toast__body">' +
        (opts.title ? '<span class="frin-toast__title"></span>' : '') +
        '<span class="frin-toast__msg"></span>' +
      '</div>' +
      '<button class="frin-toast__close" aria-label="Dismiss">×</button>';
    if (opts.title) toast.querySelector(".frin-toast__title").textContent = opts.title;
    toast.querySelector(".frin-toast__msg").textContent = opts.message || "";
    toast.querySelector(".frin-toast__close").addEventListener("click", function () { dismiss(toast); });
    container.appendChild(toast);
    var ttl = opts.duration || 4000;
    if (ttl > 0) setTimeout(function () { dismiss(toast); }, ttl);
    return toast;
  }
  function dismiss(toast) {
    toast.classList.add("is-leaving");
    setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 200);
  }

  function init() {
    initModals();
    initDropdowns();
    initTabs();
    initNavbar();
    initAccordions();
  }

  global.Frin = { init: init, showToast: showToast };

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})(window);
