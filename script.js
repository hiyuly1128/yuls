(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  function h(tag, props = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    for (const kid of kids.flat()) if (kid != null) el.append(kid);
    return el;
  }

  const welcome = $("#welcome");
  const library = $("#library");
  const bookView = $("#bookView");
  const order = Object.keys(BOOKS);
  let lastOpener = null;

  /* ---------- views + routing (#library, #book/about) ---------- */
  let currentView = null;
  function setView(name) {
    document.body.dataset.view = name;
    welcome.hidden = name !== "welcome";
    library.hidden = name !== "library";
    if (currentView !== name) window.scrollTo(0, 0);
    currentView = name;
  }

  function route() {
    const hash = location.hash.replace(/^#/, "");
    if (hash.startsWith("book/") && BOOKS[hash.slice(5)]) {
      setView("library");
      renderBook(hash.slice(5));
      return;
    }
    closeBookUI();
    if (hash === "library" || hash === "notes") setView("library");
    else setView("welcome");
    if (hash === "notes") requestAnimationFrame(() => $("#notes").scrollIntoView());
  }
  window.addEventListener("hashchange", route);

  $$(".card").forEach(c => c.addEventListener("click", () => { location.hash = "#library"; }));
  $("#backToWelcome").addEventListener("click", () => { location.hash = ""; });

  /* ---------- clock ---------- */
  const clockTime = $("#clockTime");
  const clockDate = $("#clockDate");
  function tick() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    clockTime.replaceChildren(hh, h("span", { class: "colon", text: ":" }), mm);
    clockDate.textContent = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- season flower ---------- */
  const SEASONS = ["winter", "spring", "summer", "fall"];
  const SEASON_NAMES = { winter: "Winter", spring: "Spring", summer: "Summer", fall: "Fall" };
  function seasonFor(d) {
    const m = d.getMonth();
    if (m === 11 || m < 2) return "winter";
    if (m < 5) return "spring";
    if (m < 8) return "summer";
    return "fall";
  }
  function starPoints(cx, cy, R, r, n) {
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
      const rad = i % 2 === 0 ? R : r;
      const a = (Math.PI / n) * i - Math.PI / 2;
      pts.push((cx + rad * Math.cos(a)).toFixed(1) + "," + (cy + rad * Math.sin(a)).toFixed(1));
    }
    return pts.join(" ");
  }
  $("#petals").setAttribute("points", starPoints(50, 34, 34, 20, 8));

  let season = seasonFor(new Date());
  function applySeason() {
    document.body.dataset.season = season;
    $("#seasonLabel").textContent = SEASON_NAMES[season];
  }
  applySeason();
  $("#vase").addEventListener("click", () => {
    season = SEASONS[(SEASONS.indexOf(season) + 1) % SEASONS.length];
    applySeason();
  });

  /* ---------- spines ---------- */
  $$(".book").forEach(btn => {
    const id = btn.dataset.book;
    const data = BOOKS[id];
    if (!data) return;
    $(".spine", btn).textContent = data.title;
    btn.setAttribute("aria-label", `Open book: ${data.title}`);
    btn.addEventListener("click", () => { lastOpener = btn; location.hash = "#book/" + id; });
  });

  /* ---------- full-screen book ---------- */
  function renderBook(id) {
    const b = BOOKS[id];
    const head = $("#bookHead");
    head.style.background = b.color;
    head.style.color = b.ink;
    $("#bookTitle").textContent = b.title;
    $("#bookSub").textContent = b.subtitle || "";

    const body = $("#bookBody");
    body.replaceChildren();
    for (const s of b.sections) {
      const sec = h("section", {}, h("h3", { text: s.heading }));
      if (s.text) sec.append(h("p", { text: s.text }));
      if (s.items) {
        for (const it of s.items) {
          const entry = h("div", { class: "entry" }, h("h4", { text: it.title }));
          if (it.meta) entry.append(h("p", { class: "meta", text: it.meta }));
          if (it.text) entry.append(h("p", { text: it.text }));
          if (it.link) entry.append(h("p", {}, h("a", { href: it.link, target: "_blank", rel: "noopener", text: it.linkText || "Open" })));
          sec.append(entry);
        }
      }
      if (s.links) {
        const ul = h("ul", { class: "links" });
        for (const key of s.links) {
          if (key === "email" && SITE.email) ul.append(h("li", {}, "Email: ", h("a", { href: "mailto:" + SITE.email, text: SITE.email })));
          if (key === "github" && SITE.github) ul.append(h("li", {}, "GitHub: ", h("a", { href: SITE.github, target: "_blank", rel: "noopener", text: SITE.github.replace(/^https?:\/\//, "") })));
          if (key === "linkedin" && SITE.linkedin) ul.append(h("li", {}, "LinkedIn: ", h("a", { href: SITE.linkedin, target: "_blank", rel: "noopener", text: "Connect with me" })));
        }
        if (!ul.children.length) ul.append(h("li", { text: "Contact details coming soon." }));
        sec.append(ul);
      }
      body.append(sec);
    }

    const i = order.indexOf(id);
    const prev = order[(i - 1 + order.length) % order.length];
    const next = order[(i + 1) % order.length];
    $("#bookNav").replaceChildren(
      h("button", { type: "button", text: "\u2190 " + BOOKS[prev].title, onclick: () => { location.hash = "#book/" + prev; } }),
      h("button", { type: "button", text: BOOKS[next].title + " \u2192", onclick: () => { location.hash = "#book/" + next; } })
    );

    bookView.hidden = false;
    bookView.scrollTop = 0;
    document.body.classList.add("book-open");
    $("#bookClose").focus({ preventScroll: true });
  }

  function closeBookUI() {
    if (bookView.hidden) return;
    bookView.hidden = true;
    document.body.classList.remove("book-open");
    if (lastOpener) lastOpener.focus({ preventScroll: true });
  }

  $("#bookClose").addEventListener("click", () => { location.hash = "#library"; });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !bookView.hidden) location.hash = "#library";
  });

  /* ---------- notes ---------- */
  function renderNotes() {
    const list = $("#notesList");
    list.replaceChildren();
    if (!NOTES.length) {
      list.append(h("p", { class: "empty", text: "No notes yet. Be the first to leave one." }));
      return;
    }
    for (const n of [...NOTES].reverse()) {
      list.append(
        h("div", { class: "note" },
          h("p", { text: n.text }),
          h("small", { text: "\u2014 " + (n.name || "A visitor") + (n.date ? ", " + n.date : "") })
        )
      );
    }
  }
  renderNotes();

  $("#stickies").addEventListener("click", e => {
    e.preventDefault();
    $("#notes").scrollIntoView({ behavior: "smooth" });
    $("#noteText").focus({ preventScroll: true });
  });

  $("#noteForm").addEventListener("submit", e => {
    e.preventDefault();
    const status = $("#noteStatus");
    const name = $("#noteName").value.trim();
    const text = $("#noteText").value.trim();
    status.className = "status";
    if (!text) {
      status.textContent = "Write a note first.";
      status.classList.add("err");
      return;
    }
    if (!SITE.email) {
      status.textContent = "Notes aren't connected yet. Check back soon.";
      status.classList.add("err");
      return;
    }
    const subject = "Note for your library" + (name ? " from " + name : "");
    const bodyText = text + (name ? "\n\n\u2014 " + name : "");
    location.href = "mailto:" + encodeURIComponent(SITE.email).replace("%40", "@") +
      "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(bodyText);
    status.textContent = "Opening your email app. Thank you! Notes appear here once Yul publishes them.";
    $("#noteText").value = "";
  });

  $("#year").textContent = new Date().getFullYear();

  route();
})();
