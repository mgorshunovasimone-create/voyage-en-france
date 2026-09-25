
(function(){
  "use strict";

  var IMG_SRC = "assets/map/france-map.png";

  var TENSES = ["Présent","Passé composé","Imparfait","Futur simple","Conditionnel","Subjonctif"];

  var QUEST_IFRAME = {
    cafe_flore: "assets/quests/cafe_flore.html",
    menu: "assets/quests/menu.html",
    potin: "assets/quests/potin.html",
    allure: "assets/quests/allure.html",
    lea_avis: "assets/quests/lea_avis.html",
    louvre_atmo: "assets/quests/louvre_atmo.html",
    louvre_info: "assets/quests/louvre_info.html",
    louvre_potin: "assets/quests/louvre_potin.html",
    louvre_allure: "assets/quests/louvre_allure.html",
    louvre_lea: "assets/quests/louvre_lea.html",
    couture: "assets/quests/couture.html",
    couture_boutique: "assets/quests/couture_boutique.html",
    couture_potin: "assets/quests/couture_potin.html",
    couture_pantalon: "assets/quests/couture_pantalon.html",
    couture_dispute: "assets/quests/couture_dispute.html"
  };
  var CITIES = {
    paris: { name:"Париж", x:729, y:445, parent:null, cost:0, capital:true,
      hero:"assets/heroes/paris.jpg",
      themes:[
        {icon:"☕", img:"assets/themes/paris--cafe-boheme-montparnasse.jpg", title:"Кафе и богема Монпарнаса", desc:"Экзистенциалисты, поэты и чёрный кофе — лексика спора.", quest:"cafe_flore"},
        {icon:"🖼️", img:"assets/themes/paris--louvre-orsay.jpg", title:"Лувр и Орсе", desc:"От классики до импрессионистов — язык живописи.", quest:"louvre"},
        {icon:"👗", img:"assets/themes/paris--maison-haute-couture.jpg", title:"Дом высокой моды", desc:"Лексика вкуса, силуэта и стиля.", quest:"couture"}
      ]},
    hauts_de_france: { name:"О-де-Франс", x:821, y:262, parent:"paris", cost:15,
      hero:"assets/heroes/hauts_de_france.jpg",
      themes:[
        {icon:"🧱", img:"assets/themes/hauts_de_france--heritage-flamand.jpg", title:"Фламандское наследие", desc:"Архитектура на стыке двух культур."},
        {icon:"🎈", img:"assets/themes/hauts_de_france--jules-verne.jpg", title:"Жюль Верн", desc:"Воздушные шары и рождение приключенческого романа."},
        {icon:"🐎", title:"Шато де Шантийи", desc:"Ренессансный замок, сады и знаменитое кружево.", img:"assets/themes/hauts_de_france--chateau-de-chantilly.jpg"}
      ]},
    normandie: { name:"Нормандия", x:481, y:432, parent:"paris", cost:15,
      hero:"assets/heroes/normandie.jpg",
      themes:[
        {icon:"⚔️", img:"assets/themes/normandie--jeanne-darc.jpg", title:"Жанна д’Арк", desc:"Легенда и площадь, которая помнит."},
        {icon:"🏰", img:"assets/themes/normandie--mont-saint-michel.jpg", title:"Мон-Сен-Мишель", desc:"Аббатство-остров посреди приливов Ла-Манша."},
        {icon:"🧀", img:"assets/themes/normandie--fromages-normandie.jpg", title:"Сыры Нормандии", desc:"Камамбер, ливаро, пон-л’эвек — родина мягких сыров."}
      ]},
    bretagne: { name:"Бретань", x:221, y:542, parent:"paris", cost:25,
      hero:"assets/heroes/bretagne.jpg",
      themes:[
        {icon:"🎶", img:"assets/themes/bretagne--harpe-celtique.jpg", title:"Кельтская арфа", desc:"Музыка и наследие кельтов Бретани."},
        {icon:"🚢", img:"assets/themes/bretagne--phares-navigation.jpg", title:"Маяки и мореплавание", desc:"Скалистые берега и огни на страже моряков."},
        {icon:"🦐", img:"assets/themes/bretagne--fruits-de-mer.jpg", title:"Морепродукты", desc:"Устрицы, крабы и лангустины Атлантики."}
      ]},
    nouvelle_aquitaine: { name:"Нувель-Акитен", x:516, y:1072, parent:"bretagne", cost:20,
      hero:"assets/heroes/nouvelle_aquitaine.jpg",
      themes:[
        {icon:"🍷", img:"assets/themes/nouvelle_aquitaine--terroir-vin.jpg", title:"Терруар и вино", desc:"Шато, дегустация, миллезим."},
        {icon:"🏛️", img:"assets/themes/nouvelle_aquitaine--age-dor-architecture.jpg", title:"Золотой век архитектуры", desc:"Фасады XVIII века у Гаронны."},
        {icon:"⚓", img:"assets/themes/nouvelle_aquitaine--port-de-la-lune.jpg", title:"Порт Луны", desc:"Купцы и атлантическая торговля."}
      ]},
    occitanie: { name:"Окситания", x:666, y:1037, parent:"nouvelle_aquitaine", cost:15,
      hero:"assets/heroes/occitanie.jpg",
      themes:[
        {icon:"✈️", img:"assets/themes/occitanie--aeropostale.jpg", title:"Аэропосталь", desc:"Сент-Экзюпери и рождение Airbus."},
        {icon:"🪕", img:"assets/themes/occitanie--troubadours.jpg", title:"Трубадуры", desc:"Поэты и музыканты юга — куртуазная любовь на langue d’oc."},
        {icon:"🧱", img:"assets/themes/occitanie--ville-rose.jpg", title:"Розовый город", desc:"«Ville rose» — лексика цвета."}
      ]},
    provence: { name:"Прованс", x:1066, y:1047, parent:"occitanie", cost:20,
      hero:"assets/heroes/provence.jpg",
      themes:[
        {icon:"🛥️", img:"assets/themes/provence--saint-tropez.jpg", title:"Сен-Тропе", desc:"Яхты, пальмы и родина пляжного шика."},
        {icon:"🎨", img:"assets/themes/provence--lumiere-provence.jpg", title:"Свет Прованса в живописи", desc:"Ван Гог, Сезанн и Матисс — почему художники ехали именно сюда."},
        {icon:"💜", img:"assets/themes/provence--champs-de-lavande.jpg", title:"Лавандовые поля", desc:"Плато Валансоль и словарь ароматов юга."}
      ]}
  };
  var ORDER = ["paris","hauts_de_france","normandie","bretagne","nouvelle_aquitaine","occitanie","provence"];

  var QUESTS = {
    cafe_flore: {
      title: "Кафе и богема Монпарнаса",
      reward: 15,
      stages: [
        { type: "iframe", category: "observe", label: "Атмосфера", src: QUEST_IFRAME.cafe_flore },
        { type: "iframe", category: "menu", label: "Меню", src: QUEST_IFRAME.menu },
        { type: "iframe", category: "news", label: "Слухи", src: QUEST_IFRAME.potin },
        { type: "iframe", category: "magazine", label: "Мода", src: QUEST_IFRAME.allure },
        { type: "iframe", category: "dispute", label: "Спор", src: QUEST_IFRAME.lea_avis }
      ]
    },
    louvre: {
      title: "Лувр и Орсе",
      reward: 15,
      stages: [
        { type: "iframe", category: "observe", label: "Атмосфера", src: QUEST_IFRAME.louvre_atmo },
        { type: "iframe", category: "menu", label: "Интерактив", src: QUEST_IFRAME.louvre_info },
        { type: "iframe", category: "news", label: "Слухи", src: QUEST_IFRAME.louvre_potin },
        { type: "iframe", category: "magazine", label: "Журнал", src: QUEST_IFRAME.louvre_allure },
        { type: "iframe", category: "dispute", label: "Спор", src: QUEST_IFRAME.louvre_lea }
      ]
    },
    couture: {
      title: "Дом высокой моды",
      reward: 15,
      stages: [
        { type: "iframe", category: "observe", label: "Атмосфера", src: QUEST_IFRAME.couture },
        { type: "iframe", category: "menu", label: "Бутик", src: QUEST_IFRAME.couture_boutique },
        { type: "iframe", category: "news", label: "Слухи", src: QUEST_IFRAME.couture_potin },
        { type: "iframe", category: "magazine", label: "Журнал", src: QUEST_IFRAME.couture_pantalon },
        { type: "iframe", category: "dispute", label: "Спор", src: QUEST_IFRAME.couture_dispute }
      ]
    }
  };

  var STORAGE_KEY = "voyage-en-france-state-v5";
  function loadState(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) { var p = JSON.parse(raw); if (p && Array.isArray(p.unlocked) && typeof p.croissants === "number") { p.questProgress = p.questProgress || {}; return p; } }
    } catch(e) {}
    return { unlocked: ["paris"], croissants: 0, current: "paris", questProgress: {} };
  }
  function saveState(){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {} }

  var state = loadState();
  var svg = document.getElementById("map");
  var mapWrap = document.getElementById("mapWrap");
  var popover = document.getElementById("popover");
  var croissantCount = document.getElementById("croissantCount");
  var croissantNote = document.getElementById("croissantNote");
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  var openId = null, pinned = false, hideTimer = null;

  function svgNS(tag){ return document.createElementNS("http://www.w3.org/2000/svg", tag); }

  function drawRail(x1,y1,x2,y2,open){
    var g = svgNS("g"); g.setAttribute("class","route"+(open?" open":""));
    var dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy) || 1;
    var ux=dx/len, uy=dy/len, px=-uy, py=ux, gauge=4;

    var ballast = svgNS("line");
    ballast.setAttribute("x1",x1); ballast.setAttribute("y1",y1); ballast.setAttribute("x2",x2); ballast.setAttribute("y2",y2);
    ballast.setAttribute("class","ballast");
    g.appendChild(ballast);

    var spacing = 17, steps = Math.max(2, Math.round(len/spacing));
    for (var i=1;i<steps;i++){
      var t=i/steps, cx=x1+dx*t, cy=y1+dy*t;
      var tie = svgNS("line");
      tie.setAttribute("x1", cx+px*7); tie.setAttribute("y1", cy+py*7);
      tie.setAttribute("x2", cx-px*7); tie.setAttribute("y2", cy-py*7);
      tie.setAttribute("class","tie");
      g.appendChild(tie);
    }

    [-1,1].forEach(function(sign){
      var rail = svgNS("line");
      rail.setAttribute("x1", x1+px*gauge*sign); rail.setAttribute("y1", y1+py*gauge*sign);
      rail.setAttribute("x2", x2+px*gauge*sign); rail.setAttribute("y2", y2+py*gauge*sign);
      rail.setAttribute("class","rail");
      g.appendChild(rail);
    });

    return g;
  }
  function isUnlocked(id){ return state.unlocked.indexOf(id) !== -1; }
  function toast(msg){
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function(){ toastEl.classList.remove("show"); }, 2200);
  }

  function renderMap(){
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var img = svgNS("image");
    img.setAttributeNS("http://www.w3.org/1999/xlink","href", IMG_SRC);
    img.setAttribute("href", IMG_SRC);
    img.setAttribute("x",0); img.setAttribute("y",0); img.setAttribute("width",1362); img.setAttribute("height",1294);
    img.setAttribute("preserveAspectRatio","xMidYMid meet");
    svg.appendChild(img);

    ORDER.forEach(function(id){
      var c = CITIES[id];
      if (!c.parent) return;
      var p = CITIES[c.parent];
      var open = isUnlocked(id) && isUnlocked(c.parent);
      svg.appendChild(drawRail(p.x, p.y, c.x, c.y, open));
    });

    ORDER.forEach(function(id){
      var c = CITIES[id];
      var unlocked = isUnlocked(id), current = state.current === id;
      var g = svgNS("g");
      g.setAttribute("class","node"+(unlocked?" unlocked":" locked")+(current?" current":""));
      g.setAttribute("tabindex","0"); g.setAttribute("role","button");
      g.setAttribute("aria-label", c.name + (unlocked ? "" : " — закрыт, нужен билет"));

      var haloR = c.capital ? 16 : 13;
      var dotR = c.capital ? 9 : 7;

      var hit = svgNS("circle"); hit.setAttribute("class","hit"); hit.setAttribute("cx",c.x); hit.setAttribute("cy",c.y); hit.setAttribute("r",haloR+12);
      g.appendChild(hit);

      var pulse = svgNS("circle"); pulse.setAttribute("class","pulse"); pulse.setAttribute("cx",c.x); pulse.setAttribute("cy",c.y); pulse.setAttribute("r",haloR);
      g.appendChild(pulse);

      var halo = svgNS("circle"); halo.setAttribute("class","halo"); halo.setAttribute("cx",c.x); halo.setAttribute("cy",c.y); halo.setAttribute("r",haloR);
      g.appendChild(halo);

      var dot = svgNS("circle"); dot.setAttribute("class","dot"); dot.setAttribute("cx",c.x); dot.setAttribute("cy",c.y); dot.setAttribute("r",dotR);
      g.appendChild(dot);

      g.addEventListener("mouseenter", function(cid){ return function(){ openCityPreview(cid); }; }(id));
      g.addEventListener("mouseleave", function(cid){ return function(){ scheduleHidePreview(); }; }(id));
      // pointerdown fires immediately on both mouse and touch (unlike click, which on many
      // mobile browsers needs a first "hover" tap before it fires on elements with :hover CSS).
      g.addEventListener("pointerdown", function(cid){ return function(e){ e.preventDefault(); e.stopPropagation(); enterCity(cid); }; }(id));
      g.addEventListener("click", function(cid){ return function(e){ e.stopPropagation(); }; }(id));
      g.addEventListener("keydown", function(cid){ return function(ev){ if (ev.key==="Enter"||ev.key===" "){ ev.preventDefault(); enterCity(cid); } }; }(id));

      svg.appendChild(g);
    });
  }

  /* ---------- popover ---------- */
  function scheduleHide(){ if (pinned) return; clearTimeout(hideTimer); hideTimer = setTimeout(closePopover, 200); }
  function cancelHide(){ clearTimeout(hideTimer); }
  function closePopover(){ openId=null; pinned=false; popover.classList.remove("show"); }
  popover.addEventListener("mouseenter", cancelHide);
  popover.addEventListener("mouseleave", scheduleHide);
  mapWrap.addEventListener("click", function(e){
    if (!e.target.closest(".node") && !e.target.closest(".popover")) closePopover();
    if (!e.target.closest(".node") && !e.target.closest(".preview-cards") && !e.target.closest(".preview-peek")) closeCityPreview();
  });

  function buildPopoverHTML(id){
    var c = CITIES[id];

    var html = '<div class="card-stack">';
    c.themes.forEach(function(t){
      var init = t.title.replace(/[«»"'.]/g,"").trim().slice(0,2).toUpperCase();
      html += '<div class="stack-card"' + (t.quest ? ' data-quest="'+t.quest+'" tabindex="0"' : '') + '><div class="card-inner">'
        + '<div class="icon-wrap">' + (t.img ? '<img src="'+t.img+'" alt="" loading="lazy">' : t.icon)
        + '<span class="corner-arrow">↗</span>'
        + '<span class="init-badge">' + init + '</span>'
        + '</div>'
        + '<span class="eyebrow">Тема квеста</span>'
        + '<h4>' + t.title + '</h4>'
        + '<p class="desc">' + t.desc + '</p>'
        + '<hr class="divider">'
        + (t.quest ? '<span class="footer-tag quest-go">'+questStatusLabel(t.quest)+'</span>' : '<span class="footer-tag">Скоро</span>')
        + '</div></div>';
    });
    html += '</div>';

    var parent = CITIES[c.parent];
    if (!isUnlocked(c.parent)){
      html += '<div class="pop-foot"><div class="chip lockmsg">🔒 Сначала: <b>'+parent.name+'</b></div></div>';
      return html;
    }

    var afford = state.croissants >= c.cost;
    html += '<div class="pop-foot"><div class="chip">🥐 '+c.cost+'<button class="buy-btn" id="popBuyBtn" '+(afford?'':'disabled')+'>Купить билет</button></div>';
    if (!afford) html += '<div class="chip-note">Не хватает '+(c.cost-state.croissants)+'</div>';
    html += '</div>';
    return html;
  }

  function openPopover(id, pin){
    clearTimeout(hideTimer);
    openId = id; if (pin) pinned = true;
    popover.innerHTML = buildPopoverHTML(id);
    var buyBtn = document.getElementById("popBuyBtn");
    if (buyBtn) buyBtn.addEventListener("click", function(){ buyTicket(id); });

    var pt = svg.createSVGPoint(); pt.x = CITIES[id].x; pt.y = CITIES[id].y;
    var screenPt = pt.matrixTransform(svg.getScreenCTM());
    var wrapRect = mapWrap.getBoundingClientRect();
    var localX = screenPt.x - wrapRect.left, localY = screenPt.y - wrapRect.top;

    var below = CITIES[id].y < 320;
    popover.classList.toggle("below", below);
    popover.style.left = localX + "px";
    popover.style.top = (below ? localY + 20 : localY - 20) + "px";
    popover.classList.add("show");
    clampFloating(popover);
  }

  /* ---------- unlocked-city preview: mini card deck above the pin, city peek below ---------- */
  var previewCardsEl = document.getElementById("previewCards");
  var previewPeekEl = document.getElementById("previewPeek");
  var previewId = null;

  function buildMiniDeckHTML(c){
    return '<div class="mini-deck">' + c.themes.map(function(t){
      return '<div class="mini-card"><div class="mini-inner">'
        + '<div class="mini-thumb-wrap">' + (t.img ? '<img src="'+t.img+'" alt="" loading="lazy">' : t.icon) + '</div>'
        + '<span class="mini-title">'+t.title+'</span>'
        + '</div></div>';
    }).join("") + '</div>';
  }
  function openCityPreview(id){
    clearTimeout(hideTimer);
    previewId = id;
    var c = CITIES[id];
    previewCardsEl.innerHTML = buildMiniDeckHTML(c);
    var heroSrc = getCityHeroSrc(id);
    previewPeekEl.innerHTML = '<button type="button" class="city-peek" id="popCityPeek" aria-label="Войти в '+c.name+'">'
      + (heroSrc ? '<img src="'+heroSrc+'" alt="">' : '') + '<span class="peek-badge">→</span></button>';
    document.getElementById("popCityPeek").addEventListener("click", function(e){ e.stopPropagation(); enterCity(id); });

    var pt = svg.createSVGPoint(); pt.x = c.x; pt.y = c.y;
    var screenPt = pt.matrixTransform(svg.getScreenCTM());
    var wrapRect = mapWrap.getBoundingClientRect();
    var localX = screenPt.x - wrapRect.left, localY = screenPt.y - wrapRect.top;

    previewCardsEl.style.left = localX + "px"; previewCardsEl.style.top = (localY - 20) + "px";
    previewPeekEl.style.left = localX + "px"; previewPeekEl.style.top = (localY + 20) + "px";
    previewCardsEl.classList.add("show");
    previewPeekEl.classList.add("show");
    clampFloating(previewCardsEl);
    clampFloating(previewPeekEl);
  }
  function closeCityPreview(){
    previewId = null;
    previewCardsEl.classList.remove("show");
    previewPeekEl.classList.remove("show");
  }
  function scheduleHidePreview(){ clearTimeout(hideTimer); hideTimer = setTimeout(closeCityPreview, 200); }
  function cancelHidePreview(){ clearTimeout(hideTimer); }
  [previewCardsEl, previewPeekEl].forEach(function(el){
    el.addEventListener("mouseenter", cancelHidePreview);
    el.addEventListener("mouseleave", scheduleHidePreview);
  });

  function clampFloating(el){
    el.style.setProperty("--shiftx", "0px");
    el.style.setProperty("--shifty", "0px");
    var rect = el.getBoundingClientRect();
    var margin = 10, sx = 0, sy = 0;
    if (rect.left < margin) sx = margin - rect.left;
    else if (rect.right > window.innerWidth - margin) sx = (window.innerWidth - margin) - rect.right;
    if (rect.top < margin) sy = margin - rect.top;
    else if (rect.bottom > window.innerHeight - margin) sy = (window.innerHeight - margin) - rect.bottom;
    if (sx) el.style.setProperty("--shiftx", sx + "px");
    if (sy) el.style.setProperty("--shifty", sy + "px");
  }

  function buyTicket(id){
    var c = CITIES[id];
    if (state.croissants < c.cost){ toast("Не хватает круассанов на билет"); return; }
    state.croissants -= c.cost;
    state.unlocked.push(id);
    state.current = id;
    saveState();
    renderMap();
    renderHeader();
    closePopover();
    toast("Билет куплен — добро пожаловать в "+c.name+"!");
  }

  function renderHeader(){ croissantCount.textContent = state.croissants; }

  /* ---------- city portal (dive-in transition, CSS-driven) ---------- */
  var portalWindow = document.getElementById("portalWindow");
  var portalWindowImg = document.getElementById("portalWindowImg");
  var cityScreen = document.getElementById("cityScreen");
  var cityBackBtn = document.getElementById("cityBack");
  var cityHeroImgEl = document.getElementById("cityHeroImg");
  var cityQuestListEl = document.getElementById("cityQuestList");
  var pageEl = document.querySelector(".page");
  var activeCityId = null;
  var portalBusy = false;
  var CITY_HERO_CACHE = {};

  function getCityHeroSrc(id){
    var c = CITIES[id];
    if (c.hero) return c.hero;
    var withImg = c.themes.filter(function(t){ return t.img; })[0];
    return withImg ? withImg.img : null;
  }
  function getCityHeroImg(id){
    if (CITY_HERO_CACHE[id]) return CITY_HERO_CACHE[id];
    var src = getCityHeroSrc(id);
    if (!src) return null;
    var img = new Image();
    img.src = src;
    CITY_HERO_CACHE[id] = img;
    return img;
  }
  function buildCityQuestCardHTML(t){
    return '<button type="button" class="city-quest-card"' + (t.quest ? ' data-quest="'+t.quest+'"' : ' disabled') + '>'
      + (t.img ? '<img class="cq-photo" src="'+t.img+'" alt="" loading="lazy">' : '<div class="cq-photo cq-icon">'+t.icon+'</div>')
      + '<div class="cq-info"><h4>'+t.title+'</h4><p>'+t.desc+'</p>'
      + (t.quest ? '<span class="footer-tag quest-go">'+questStatusLabel(t.quest)+'</span>' : '<span class="footer-tag">Скоро</span>')
      + '</div></button>';
  }
  function renderCityQuestList(id){
    var c = CITIES[id];
    cityQuestListEl.innerHTML = c.themes.map(buildCityQuestCardHTML).join("");
    cityQuestListEl.querySelectorAll("[data-quest]").forEach(function(card){
      card.addEventListener("click", function(){ openQuest(card.getAttribute("data-quest")); });
    });
  }
  function showCityScreen(id, heroSrc){
    activeCityId = id;
    cityHeroImgEl.src = heroSrc || "";
    renderCityQuestList(id);
    cityScreen.classList.add("show");
    cityScreen.classList.remove("entering"); void cityScreen.offsetWidth; cityScreen.classList.add("entering");
  }

  // seed (small, pin-anchored) transform for a given screen point, using a
  // UNIFORM scale so the photo never stretches while the window is tiny.
  function seedTransform(px, py){
    var vw = window.innerWidth, vh = window.innerHeight;
    var scale = Math.min(0.24, 110/vw);
    var w = vw*scale, h = vh*scale;
    var tx = px - w/2, ty = py - h/2;
    return { transform: "translate("+tx+"px,"+ty+"px) scale("+scale+")", radius: (90/scale) };
  }

  function enterCity(id){
    if (portalBusy) return;
    if (id !== "paris"){ closeCityPreview(); showComingSoon(id); return; }
    if (!isUnlocked(id)) return;
    portalBusy = true;
    closePopover();
    closeCityPreview();
    var c = CITIES[id];
    var heroSrc = getCityHeroSrc(id);
    var pt = svg.createSVGPoint(); pt.x = c.x; pt.y = c.y;
    var screenPt = pt.matrixTransform(svg.getScreenCTM());
    var seed = seedTransform(screenPt.x, screenPt.y);

    portalWindowImg.src = heroSrc || "";
    portalWindow.classList.add("busy");
    portalWindow.style.transition = "none";
    portalWindow.style.borderRadius = seed.radius + "px";
    portalWindow.style.transform = seed.transform;
    // force reflow so the browser registers the seed state before animating
    void portalWindow.offsetWidth;
    pageEl.classList.add("diving");

    function run(){
      portalWindow.style.transition = "transform .85s cubic-bezier(.65,0,.35,1), border-radius .85s cubic-bezier(.65,0,.35,1)";
      portalWindow.style.transform = "translate(0px,0px) scale(1)";
      portalWindow.style.borderRadius = "0px";
      portalWindow.addEventListener("transitionend", function done(e){
        if (e.propertyName !== "transform") return;
        portalWindow.removeEventListener("transitionend", done);
        pageEl.classList.remove("diving");
        showCityScreen(id, heroSrc);
        setTimeout(function(){ portalWindow.classList.remove("busy"); }, 260);
        portalBusy = false;
      });
    }
    var img = getCityHeroImg(id);
    if (img && !img.complete) img.onload = run; else requestAnimationFrame(run);
  }

  function exitCity(){
    if (!activeCityId || portalBusy) { cityScreen.classList.remove("show"); activeCityId = null; return; }
    portalBusy = true;
    var id = activeCityId;
    var c = CITIES[id];
    var heroSrc = getCityHeroSrc(id);
    var pt = svg.createSVGPoint(); pt.x = c.x; pt.y = c.y;
    var screenPt = pt.matrixTransform(svg.getScreenCTM());
    var seed = seedTransform(screenPt.x, screenPt.y);

    portalWindowImg.src = heroSrc || "";
    portalWindow.classList.add("busy");
    portalWindow.style.transition = "none";
    portalWindow.style.borderRadius = "0px";
    portalWindow.style.transform = "translate(0px,0px) scale(1)";
    void portalWindow.offsetWidth;

    cityScreen.classList.remove("show");
    pageEl.classList.add("diving");

    requestAnimationFrame(function(){
      portalWindow.style.transition = "transform .6s cubic-bezier(.5,0,.75,0), border-radius .6s cubic-bezier(.5,0,.75,0)";
      portalWindow.style.transform = seed.transform;
      portalWindow.style.borderRadius = seed.radius + "px";
      portalWindow.addEventListener("transitionend", function done(e){
        if (e.propertyName !== "transform") return;
        portalWindow.removeEventListener("transitionend", done);
        portalWindow.classList.remove("busy");
        pageEl.classList.remove("diving");
        activeCityId = null;
        portalBusy = false;
      });
    });
  }
  cityBackBtn.addEventListener("click", exitCity);

  /* ---------- modals ---------- */
  var modalBackdrop = document.getElementById("modalBackdrop");
  var modalBody = document.getElementById("modalBody");
  var modalCard = document.getElementById("modalCard");
  function openModal(html){ modalBody.innerHTML = html; modalBackdrop.classList.add("show"); }
  function closeModal(){ modalBackdrop.classList.remove("show"); modalBody.innerHTML = ""; }
  function showComingSoon(id){
    var c = CITIES[id];
    openModal(
      '<h2>'+c.name+'</h2>'
      + '<p style="color:var(--ink-soft);font-size:14.5px;line-height:1.55;margin:0;">'
      + 'Этот город ещё в пути — квесты здесь появятся совсем скоро. Пока можно гулять по Парижу 🥐'
      + '</p>'
    );
  }
  document.getElementById("modalClose").addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", function(e){ if (e.target === modalBackdrop) closeModal(); });

  /* ---------- quest player (full screen, staged) ---------- */
  var questScreen = document.getElementById("questScreen");
  var questExitBtn = document.getElementById("questExit");
  var questHubImg = document.getElementById("questHubImg");
  var questIconsEl = document.getElementById("questIcons");
  var questViewport = document.getElementById("questViewport");

  var activeQuestKey = null;

  // Icons are shared across every quest in the game — a stage's "category"
  // decides which badge it gets, so future quests reuse the same visual language.
  // Sticker-style category badges (cropped from the person's Paris scrapbook collage),
  // reused across every quest: same 5 rubrics regardless of city or theme.
  // Sticker-style category badges (die-cut from the person's Paris scrapbook collage,
  // background removed), reused across every quest: same 5 rubrics regardless of city/theme.
  var QUEST_CATEGORY_ICON = {
    observe: '<img src="assets/icons/icon-observe.png" alt="" loading="lazy">',
    menu: '<img src="assets/icons/icon-menu.png" alt="" loading="lazy">',
    news: '<img src="assets/icons/icon-news.png" alt="" loading="lazy">',
    magazine: '<img src="assets/icons/icon-magazine.png" alt="" loading="lazy">',
    dispute: '<img src="assets/icons/icon-dispute.png" alt="" loading="lazy">'
  };

  function questProgressFor(key){
    state.questProgress = state.questProgress || {};
    var p = state.questProgress[key];
    // migrate old stepper-format progress ({stage, done}) into the new {visited, done} shape
    if (!p || typeof p.visited !== "object" || p.visited === null){
      p = { visited: {}, done: !!(p && p.done) };
      state.questProgress[key] = p;
    }
    return p;
  }
  function saveQuestProgress(key, visited, done){
    state.questProgress = state.questProgress || {};
    state.questProgress[key] = { visited: visited, done: !!done };
    saveState();
  }
  function questStatusLabel(key){
    var qp = (state.questProgress || {})[key];
    if (qp && qp.done) return "Пройдено ✓";
    if (qp && qp.visited && Object.keys(qp.visited).length) return "Продолжить →";
    return "Начать →";
  }

  function loadIframeSrc(ifr, src){
    // src is now a real file path (assets/quests/*.html) served by the site itself,
    // so the browser can just request it directly — no more base64/blob decoding needed.
    ifr.src = src;
  }

  function renderQuestHub(key){
    var quest = QUESTS[key];
    var prog = questProgressFor(key);
    var heroSrc = getCityHeroSrc(activeCityId) || (quest.stages.filter(function(s){return s.img;})[0] || {}).img;
    questHubImg.src = heroSrc || "";
    questIconsEl.innerHTML = quest.stages.map(function(stage, i){
      var visited = !!prog.visited[i];
      return '<button type="button" class="quest-icon-btn' + (visited ? " visited" : "") + '" data-stage="' + i + '">'
        + '<span class="quest-icon-badge">' + (QUEST_CATEGORY_ICON[stage.category] || QUEST_CATEGORY_ICON.observe)
        + '<span class="quest-icon-check">✓</span></span>'
        + '<span class="quest-icon-label">' + (stage.label || "") + '</span>'
        + '</button>';
    }).join("");
    questIconsEl.querySelectorAll("[data-stage]").forEach(function(btn){
      btn.addEventListener("click", function(){ openQuestStage(key, parseInt(btn.getAttribute("data-stage"), 10)); });
    });
  }

  function openQuestStage(key, index){
    var quest = QUESTS[key];
    var stage = quest.stages[index];
    questViewport.innerHTML = "";
    var ifr = document.createElement("iframe");
    ifr.title = "Квест";
    questViewport.appendChild(ifr);
    loadIframeSrc(ifr, stage.src);
    questViewport.classList.add("show");

    questExitBtn.textContent = "←";
    questExitBtn.setAttribute("aria-label", "Назад к заданиям");
    questExitBtn.onclick = closeQuestStage;

    var prog = questProgressFor(key);
    var visited = prog.visited || {};
    if (!visited[index]){
      visited[index] = true;
      var allDone = quest.stages.every(function(s, i){ return visited[i]; });
      saveQuestProgress(key, visited, allDone || prog.done);
      if (allDone && !prog.done) awardQuestReward(key);
    }
  }

  function closeQuestStage(){
    questViewport.classList.remove("show");
    setTimeout(function(){ questViewport.innerHTML = ""; }, 250);
    questExitBtn.textContent = "←";
    questExitBtn.setAttribute("aria-label", "Назад к карте");
    questExitBtn.onclick = closeQuestScreen;
    if (activeQuestKey) renderQuestHub(activeQuestKey);
  }

  function awardQuestReward(key){
    var quest = QUESTS[key];
    state.croissants += quest.reward;
    saveState(); renderHeader();
    croissantNote.classList.remove("bump"); void croissantNote.offsetWidth; croissantNote.classList.add("bump");
    toast("Квест пройден: +"+quest.reward+" круассанов");
  }

  function openQuest(key){
    var quest = QUESTS[key];
    if (!quest) return;
    activeQuestKey = key;
    renderQuestHub(key);
    questExitBtn.textContent = "←";
    questExitBtn.setAttribute("aria-label", "Назад к карте");
    questExitBtn.onclick = closeQuestScreen;
    questScreen.classList.add("show");
    questScreen.classList.remove("entering"); void questScreen.offsetWidth; questScreen.classList.add("entering");
  }

  function closeQuestScreen(){
    questScreen.classList.remove("show");
    setTimeout(function(){ questViewport.innerHTML = ""; questViewport.classList.remove("show"); }, 340);
    if (activeCityId) renderCityQuestList(activeCityId);
  }


  document.addEventListener("keydown", function(e){
    if (e.key === "Escape"){
      if (questScreen.classList.contains("show")){ closeQuestScreen(); return; }
      if (cityScreen.classList.contains("show")){ exitCity(); return; }
      closeModal(); closePopover(); closeCityPreview();
    }
  });

  document.getElementById("rulesBtn").addEventListener("click", function(){
    var grid = TENSES.map(function(t){
      return '<div class="rule-card"><span class="rname">'+t+'</span><span class="rsoon">🔒 правило скоро</span></div>';
    }).join("");
    openModal('<h2>Грамматическая тетрадь</h2><div class="rule-grid">'+grid+'</div>');
  });

  document.getElementById("dailyBtn").addEventListener("click", function(){
    openModal(
      '<h2>Задание дня</h2>' +
      '<div class="practice-wrap">' +
      '<div class="daily-card"><div><h3>Ежедневное задание</h3><p>Вопросы по всем изученным правилам вперемешку — так лексика не забывается и копятся круассаны на билеты.</p></div><button class="ghost" disabled>Скоро</button></div>' +
      '<div class="daily-card"><div><h3>Отработка нового правила</h3><p>Когда правило только открыто — вопросы только по нему, без смешивания.</p></div><button class="ghost" disabled>Скоро</button></div>' +
      '<div class="daily-card"><div><h3>Демо: получить круассаны</h3><p>Пока заданий нет — жмите, чтобы посмотреть обмен «тренировка → билет».</p></div><button class="ghost" id="demoEarnBtn">+ круассаны</button></div>' +
      '<p class="demo-note">Кнопка выше — временная заглушка вместо настоящих упражнений.</p></div>'
    );
    document.getElementById("demoEarnBtn").addEventListener("click", function(){
      var gained = 8 + Math.floor(Math.random()*8);
      state.croissants += gained;
      saveState(); renderHeader();
      croissantNote.classList.remove("bump"); void croissantNote.offsetWidth; croissantNote.classList.add("bump");
      toast("+"+gained+" круассанов (демо)");
    });
  });

  window.addEventListener("resize", function(){ if (openId && pinned) openPopover(openId, true); });

  var bgVideo = document.getElementById("bgVideo");
  if (bgVideo){
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion){
      bgVideo.addEventListener("playing", function(){ bgVideo.classList.add("show"); });
      var playPromise = bgVideo.play();
      if (playPromise && playPromise.catch) playPromise.catch(function(){});
    }
  }

  renderMap();
  renderHeader();
})();
