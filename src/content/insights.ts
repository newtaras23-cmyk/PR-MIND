type LocalizedText = { en: string; uk: string; fr: string; es: string };
type LocalizedList = { en: string[]; uk: string[]; fr: string[]; es: string[] };

type InsightSection = {
  heading: LocalizedText;
  paragraphs: LocalizedList;
};

type InsightFaqItem = {
  question: LocalizedText;
  answer: LocalizedText;
};

type Insight = {
  slug: string;
  publishedAt: string;
  relatedPillar: string;
  rubric?: string;
  title: LocalizedText;
  summary: LocalizedText;
  intro: LocalizedText;
  keyPoints: LocalizedList;
  sections: InsightSection[];
  faq: InsightFaqItem[];
};

export const insights: Insight[] = [
  {
    slug: "online-reputation-and-revenue",
    publishedAt: "2026-01-15",
    relatedPillar: "analytics",
    title: {
      en: "Why does online reputation influence revenue?",
      uk: "Чому онлайн-репутація впливає на дохід?",
      fr: "Why does online reputation influence revenue?", // TODO: translate
      es: "Why does online reputation influence revenue?", // TODO: translate
    },
    summary: {
      en: "A clear view of how online perception changes trust, conversion, and business outcomes.",
      uk: "Чітке пояснення того, як онлайн-враження впливає на довіру, конверсію та бізнес-результати.",
      fr: "A clear view of how online perception changes trust, conversion, and business outcomes.", // TODO: translate
      es: "A clear view of how online perception changes trust, conversion, and business outcomes.", // TODO: translate
    },
    intro: {
      en: "Online reputation influences revenue because most buyers research a name before they commit to a decision, and what they find either confirms or undermines the pitch they already heard. A search result, a review, or a stale profile can add friction to a deal that otherwise looked closed.",
      uk: "Онлайн-репутація впливає на дохід, тому що більшість покупців перевіряють ім’я перед прийняттям рішення, і те, що вони знаходять, або підтверджує, або підриває вже почуту пропозицію. Результат пошуку, відгук чи застарілий профіль можуть додати тертя в угоду, яка здавалась закритою.",
      fr: "Online reputation influences revenue because most buyers research a name before they commit to a decision.", // TODO: translate
      es: "Online reputation influences revenue because most buyers research a name before they commit to a decision.", // TODO: translate
    },
    keyPoints: {
      en: [
        "Reputation risk rarely blocks a deal outright — it slows the decision down by inviting extra scrutiny.",
        "Verification happens before any sales conversation, outside the seller’s control.",
        "A reputation audit maps search results, reviews, and social mentions before any fix is planned.",
        "Removing friction from the decision is a measurable, if indirect, revenue lever.",
      ],
      uk: [
        "Репутаційний ризик рідко блокує угоду одразу — він сповільнює рішення, провокуючи додаткову перевірку.",
        "Перевірка відбувається ще до будь-якої розмови про продаж, поза контролем продавця.",
        "Аудит репутації фіксує результати пошуку, відгуки й соціальні згадки перед плануванням будь-яких виправлень.",
        "Усунення тертя в рішенні — вимірюваний, хоч і непрямий, важіль доходу.",
      ],
      fr: ["Reputation risk rarely blocks a deal outright — it slows the decision down by inviting extra scrutiny."], // TODO: translate
      es: ["Reputation risk rarely blocks a deal outright — it slows the decision down by inviting extra scrutiny."], // TODO: translate
    },
    sections: [
      {
        heading: {
          en: "The moment of verification",
          uk: "Момент перевірки",
          fr: "The moment of verification", // TODO: translate
          es: "The moment of verification", // TODO: translate
        },
        paragraphs: {
          en: [
            "Before a call, a purchase, or a partnership, people quietly verify. They search the name, scan the first page, and check reviews. This happens outside any sales process you control, which is exactly why it matters.",
          ],
          uk: [
            "Перед дзвінком, покупкою чи партнерством люди тихо перевіряють. Вони шукають ім’я, переглядають першу сторінку і читають відгуки. Це відбувається поза будь-яким процесом продажу, який ви контролюєте — саме тому це важливо.",
          ],
          fr: ["Before a call, a purchase, or a partnership, people quietly verify."], // TODO: translate
          es: ["Before a call, a purchase, or a partnership, people quietly verify."], // TODO: translate
        },
      },
      {
        heading: {
          en: "Where the friction shows up",
          uk: "Де виникає тертя",
          fr: "Where the friction shows up", // TODO: translate
          es: "Where the friction shows up", // TODO: translate
        },
        paragraphs: {
          en: [
            "Reputation risk rarely kills a deal outright — it slows it down. A decision-maker who finds mixed signals asks more questions, loops in more people, and delays. Removing that friction is a measurable, if indirect, revenue lever.",
          ],
          uk: [
            "Репутаційний ризик рідко вбиває угоду одразу — він її сповільнює. Особа, яка приймає рішення і знаходить суперечливі сигнали, ставить більше запитань, залучає більше людей і зволікає. Усунення цього тертя — вимірюваний, хоч і непрямий, важіль доходу.",
          ],
          fr: ["Reputation risk rarely kills a deal outright — it slows it down."], // TODO: translate
          es: ["Reputation risk rarely kills a deal outright — it slows it down."], // TODO: translate
        },
      },
    ],
    faq: [
      {
        question: {
          en: "Does online reputation really affect sales?",
          uk: "Чи справді онлайн-репутація впливає на продажі?",
          fr: "Does online reputation really affect sales?", // TODO: translate
          es: "Does online reputation really affect sales?", // TODO: translate
        },
        answer: {
          en: "It affects the speed and confidence of a decision more than the decision itself — mixed signals slow deals down and invite extra scrutiny.",
          uk: "Вона впливає на швидкість і впевненість рішення більше, ніж на саме рішення — суперечливі сигнали сповільнюють угоди й провокують додаткову перевірку.",
          fr: "It affects the speed and confidence of a decision more than the decision itself.", // TODO: translate
          es: "It affects the speed and confidence of a decision more than the decision itself.", // TODO: translate
        },
      },
      {
        question: {
          en: "Where should a reputation audit start?",
          uk: "З чого варто починати аудит репутації?",
          fr: "Where should a reputation audit start?", // TODO: translate
          es: "Where should a reputation audit start?", // TODO: translate
        },
        answer: {
          en: "With a full map of what appears on the first page of search and what mentions already exist across review platforms and social channels.",
          uk: "З повної карти того, що з’являється на першій сторінці пошуку, та наявних згадувань на платформах відгуків і в соціальних каналах.",
          fr: "With a full map of what appears on the first page of search and social channels.", // TODO: translate
          es: "With a full map of what appears on the first page of search and social channels.", // TODO: translate
        },
      },
    ],
  },
  {
    slug: "search-results-and-trust",
    publishedAt: "2026-02-03",
    relatedPillar: "serp",
    title: {
      en: "How does the first page of search shape trust in seconds?",
      uk: "Як перша сторінка пошуку формує довіру за лічені секунди?",
      fr: "How does the first page of search shape trust in seconds?", // TODO: translate
      es: "How does the first page of search shape trust in seconds?", // TODO: translate
    },
    summary: {
      en: "What people see first often becomes the strongest signal of authority and credibility.",
      uk: "Те, що люди бачать першим, часто стає найсильнішим сигналом авторитетності та довіри.",
      fr: "What people see first often becomes the strongest signal of authority and credibility.", // TODO: translate
      es: "What people see first often becomes the strongest signal of authority and credibility.", // TODO: translate
    },
    intro: {
      en: "The first page of search shapes trust in seconds because people scan it as a verdict, not a directory. A cluttered or outdated top 10 reads as risk; a clean, controlled one reads as authority — and that impression forms before a single link is clicked.",
      uk: "Перша сторінка пошуку формує довіру за лічені секунди, бо люди сприймають її як вердикт, а не як каталог. Захаращений або застарілий топ-10 читається як ризик; чистий і контрольований — як авторитетність, і це враження формується ще до першого кліку.",
      fr: "The first page of search shapes trust in seconds because people scan it as a verdict, not a directory.", // TODO: translate
      es: "The first page of search shapes trust in seconds because people scan it as a verdict, not a directory.", // TODO: translate
    },
    keyPoints: {
      en: [
        "What ranks matters less than what it says — an outdated or unrelated top result signals neglect.",
        "A managed search presence combines owned properties, third-party mentions, and technical SEO.",
        "Technical fixes and new content can shift rankings within weeks.",
        "Displacing entrenched negative results typically takes a sustained, multi-month program.",
      ],
      uk: [
        "Позиція в рейтингу важить менше, ніж зміст — застарілий чи нерелевантний результат сигналізує про занедбаність.",
        "Керована присутність у пошуку поєднує власні ресурси, згадки третіх сторін і технічне SEO.",
        "Технічні виправлення й новий контент можуть змінити позиції за кілька тижнів.",
        "Витіснення усталеного негативу зазвичай вимагає тривалої, багатомісячної програми.",
      ],
      fr: ["What ranks matters less than what it says — an outdated or unrelated top result signals neglect."], // TODO: translate
      es: ["What ranks matters less than what it says — an outdated or unrelated top result signals neglect."], // TODO: translate
    },
    sections: [
      {
        heading: {
          en: "Position is only half the signal",
          uk: "Позиція — лише половина сигналу",
          fr: "Position is only half the signal", // TODO: translate
          es: "Position is only half the signal", // TODO: translate
        },
        paragraphs: {
          en: [
            "What ranks matters less than what it says. A high-ranking page with an outdated title, a thin profile, or an unrelated result creates the same doubt as negative content — it signals neglect.",
          ],
          uk: [
            "Що важливіше за позицію в рейтингу — це те, про що говорить сторінка. Високоранжована сторінка із застарілим заголовком, слабким профілем чи нерелевантним результатом створює той самий сумнів, що й негативний контент — вона сигналізує про занедбаність.",
          ],
          fr: ["What ranks matters less than what it says."], // TODO: translate
          es: ["What ranks matters less than what it says."], // TODO: translate
        },
      },
      {
        heading: {
          en: "Building a controlled top 10",
          uk: "Побудова контрольованого топ-10",
          fr: "Building a controlled top 10", // TODO: translate
          es: "Building a controlled top 10", // TODO: translate
        },
        paragraphs: {
          en: [
            "A managed search presence combines owned properties, credible third-party mentions, and technical SEO so the visible narrative is the one you intend, not whatever happened to rank.",
          ],
          uk: [
            "Керована присутність у пошуку поєднує власні ресурси, авторитетні згадки третіх сторін і технічне SEO, щоб видимий наратив був саме тим, який ви задумали, а не випадковим результатом ранжування.",
          ],
          fr: ["A managed search presence combines owned properties, third-party mentions, and technical SEO."], // TODO: translate
          es: ["A managed search presence combines owned properties, third-party mentions, and technical SEO."], // TODO: translate
        },
      },
    ],
    faq: [
      {
        question: {
          en: "How fast can search results change?",
          uk: "Наскільки швидко можуть змінюватися результати пошуку?",
          fr: "How fast can search results change?", // TODO: translate
          es: "How fast can search results change?", // TODO: translate
        },
        answer: {
          en: "Technical fixes and new authoritative content can shift within weeks; displacing entrenched results typically takes a sustained, multi-month program.",
          uk: "Технічні виправлення й новий авторитетний контент можуть змінити ситуацію за тижні; витіснення усталених результатів зазвичай вимагає тривалої, багатомісячної програми.",
          fr: "Technical fixes and new authoritative content can shift within weeks.", // TODO: translate
          es: "Technical fixes and new authoritative content can shift within weeks.", // TODO: translate
        },
      },
    ],
  },
  {
    slug: "crisis-reputation-first-48-hours",
    publishedAt: "2026-02-20",
    relatedPillar: "pr",
    title: {
      en: "What should you do in the first 48 hours of a reputation issue?",
      uk: "Що робити у перші 48 годин репутаційної кризи?",
      fr: "What should you do in the first 48 hours of a reputation issue?", // TODO: translate
      es: "What should you do in the first 48 hours of a reputation issue?", // TODO: translate
    },
    summary: {
      en: "A calm, structured response avoids escalation and keeps the narrative under control.",
      uk: "Спокійна й структурована реакція допомагає уникнути ескалації та тримати наратив під контролем.",
      fr: "A calm, structured response avoids escalation and keeps the narrative under control.", // TODO: translate
      es: "A calm, structured response avoids escalation and keeps the narrative under control.", // TODO: translate
    },
    intro: {
      en: "In the first 48 hours of a reputation issue, the priority is a calm, factual response, not speed for its own sake. A rushed statement that needs correcting later causes more damage than a short delay spent getting the facts straight.",
      uk: "У перші 48 годин репутаційної кризи пріоритет — спокійна, фактична реакція, а не швидкість заради швидкості. Поспішна заява, яку потім доведеться виправляти, шкодить більше, ніж коротка затримка, витрачена на з’ясування фактів.",
      fr: "In the first 48 hours of a reputation issue, the priority is a calm, factual response, not speed for its own sake.", // TODO: translate
      es: "In the first 48 hours of a reputation issue, the priority is a calm, factual response, not speed for its own sake.", // TODO: translate
    },
    keyPoints: {
      en: [
        "Confirm what happened, who is affected, and where the story is spreading before any public statement.",
        "Use one primary channel for the official response; contradicting statements escalate a crisis.",
        "A brief, honest holding statement beats a fast but inaccurate one.",
        "Keep the response team small: one decision-maker, one communications lead, one fact-checker.",
      ],
      uk: [
        "З’ясуйте, що сталося, кого це стосується і де поширюється історія, перш ніж робити публічну заяву.",
        "Використовуйте один основний канал для офіційної відповіді — суперечливі заяви загострюють кризу.",
        "Коротка чесна проміжна заява краща за швидку, але неточну.",
        "Тримайте команду реагування невеликою: одна особа, що приймає рішення, один комунікаційний лід, один перевіряючий факти.",
      ],
      fr: ["Confirm what happened, who is affected, and where the story is spreading before any public statement."], // TODO: translate
      es: ["Confirm what happened, who is affected, and where the story is spreading before any public statement."], // TODO: translate
    },
    sections: [
      {
        heading: {
          en: "Hour one: confirm before you respond",
          uk: "Перша година: підтвердьте, перш ніж реагувати",
          fr: "Hour one: confirm before you respond", // TODO: translate
          es: "Hour one: confirm before you respond", // TODO: translate
        },
        paragraphs: {
          en: [
            "Establish what actually happened, who is affected, and where the story is spreading before drafting any public statement. Reacting to a rumor as if it were confirmed fact locks you into a weaker position.",
          ],
          uk: [
            "З’ясуйте, що насправді відбулося, кого це стосується і де поширюється історія, перш ніж готувати будь-яку публічну заяву. Реакція на чутку як на підтверджений факт ставить вас у слабшу позицію.",
          ],
          fr: ["Establish what actually happened, who is affected, and where the story is spreading."], // TODO: translate
          es: ["Establish what actually happened, who is affected, and where the story is spreading."], // TODO: translate
        },
      },
      {
        heading: {
          en: "Day one and two: one channel, one message",
          uk: "Перший і другий день: один канал, одне повідомлення",
          fr: "Day one and two: one channel, one message", // TODO: translate
          es: "Day one and two: one channel, one message", // TODO: translate
        },
        paragraphs: {
          en: [
            "Choose a single primary channel for the official response and keep every other mention consistent with it. Contradicting statements across platforms is what turns a manageable issue into a prolonged crisis.",
          ],
          uk: [
            "Оберіть один основний канал для офіційної відповіді й тримайте всі інші згадки узгодженими з ним. Суперечливі заяви на різних платформах — це те, що перетворює керовану проблему на затяжну кризу.",
          ],
          fr: ["Choose a single primary channel for the official response and keep every other mention consistent with it."], // TODO: translate
          es: ["Choose a single primary channel for the official response and keep every other mention consistent with it."], // TODO: translate
        },
      },
    ],
    faq: [
      {
        question: {
          en: "Should we respond publicly right away?",
          uk: "Чи варто одразу реагувати публічно?",
          fr: "Should we respond publicly right away?", // TODO: translate
          es: "Should we respond publicly right away?", // TODO: translate
        },
        answer: {
          en: "Only once the facts are confirmed. A brief, honest holding statement is safer than a fast but inaccurate one.",
          uk: "Лише після підтвердження фактів. Коротка чесна проміжна заява безпечніша, ніж швидка, але неточна.",
          fr: "Only once the facts are confirmed.", // TODO: translate
          es: "Only once the facts are confirmed.", // TODO: translate
        },
      },
      {
        question: {
          en: "Who should be involved in the first 48 hours?",
          uk: "Хто має бути залучений у перші 48 годин?",
          fr: "Who should be involved in the first 48 hours?", // TODO: translate
          es: "Who should be involved in the first 48 hours?", // TODO: translate
        },
        answer: {
          en: "A small, decisive group: one decision-maker, one communications lead, and whoever can verify the facts — not the entire leadership team.",
          uk: "Невелика, рішуча група: одна особа, що приймає рішення, один комунікаційний лід і той, хто може підтвердити факти — а не вся команда керівництва.",
          fr: "A small, decisive group: one decision-maker, one communications lead, and whoever can verify the facts.", // TODO: translate
          es: "A small, decisive group: one decision-maker, one communications lead, and whoever can verify the facts.", // TODO: translate
        },
      },
    ],
  },
  {
    slug: "chomu-shtuchnyi-intelekt-maie-bachyty-vash-biznes",
    publishedAt: "2026-07-04",
    relatedPillar: "serp",
    rubric: "AI-видимість",
    title: {
      en: "The world we live in: why it matters that AI can see your business",
      uk: "У якому світі ми живемо: чому важливо, щоб штучний інтелект бачив ваш бізнес",
      fr: "The world we live in: why it matters that AI can see your business", // TODO: translate
      es: "The world we live in: why it matters that AI can see your business", // TODO: translate
    },
    summary: {
      en: "Customers increasingly ask ChatGPT, Perplexity, and Gemini instead of Google — and get 3-4 names instead of ten links. Here's how many people already search this way, and how AI decides who to recommend.",
      uk: "Клієнти дедалі частіше питають не Google, а ChatGPT, Perplexity й Gemini — і отримують 3-4 назви замість десяти посилань. Розбираємо, скільки людей уже так шукають і як AI обирає, кого рекомендувати.",
      fr: "Customers increasingly ask ChatGPT, Perplexity, and Gemini instead of Google — and get 3-4 names instead of ten links.", // TODO: translate
      es: "Customers increasingly ask ChatGPT, Perplexity, and Gemini instead of Google — and get 3-4 names instead of ten links.", // TODO: translate
    },
    intro: {
      en: "People increasingly search for products and services through AI, not Google — and get 3-4 concrete names instead of ten links. If you're not among them, the customer never sees you. Being ranked in Google is no longer enough: you need language models like ChatGPT, Perplexity, Gemini, and Claude to recognize and recommend you. This is a new, separate layer of reputation, and it already affects revenue.",
      uk: "Люди дедалі частіше шукають товари й послуги не в Google, а у штучного інтелекту — і отримують не десять посилань, а 3-4 конкретні назви. Якщо серед них немає вас, клієнт вас навіть не побачить. Тому сьогодні мало «бути в топі Google» — потрібно, щоб вас розпізнавали й рекомендували мовні моделі: ChatGPT, Perplexity, Gemini, Claude. Це нова, окрема площина репутації, і вона вже впливає на виручку.",
      fr: "People increasingly search for products and services through AI, not Google.", // TODO: translate
      es: "People increasingly search for products and services through AI, not Google.", // TODO: translate
    },
    keyPoints: {
      en: [
        "Over 1 billion people use AI tools monthly (DataReportal, 2026)",
        "Gartner projects ~25% of search traffic shifting to AI engines by 2026",
        "84% of B2B marketing leaders use AI/LLMs to find vendors (Wynter, 2026)",
        "AI answers show only 3-4 brands — there is no 'page two'",
        "Correlation between Google rank and ChatGPT citation is nearly zero (0.034)",
        "Content updated within 30 days gets 3.2x more AI citations",
      ],
      uk: [
        "Понад 1 млрд людей щомісяця користуються AI-інструментами (DataReportal, 2026)",
        "Gartner прогнозує перехід ~25% пошукового трафіку до AI вже у 2026",
        "84% B2B-директорів шукають постачальників через AI/LLM (Wynter, 2026)",
        "У відповіді AI лише 3-4 бренди — «другої сторінки» не існує",
        "Кореляція між позицією в Google і цитуванням у ChatGPT — майже нульова (0,034)",
        "Контент, оновлений за 30 днів, отримує у 3,2 раза більше AI-цитувань",
      ],
      fr: ["Over 1 billion people use AI tools monthly (DataReportal, 2026)"], // TODO: translate
      es: ["Over 1 billion people use AI tools monthly (DataReportal, 2026)"], // TODO: translate
    },
    sections: [
      {
        heading: {
          en: "The world we already live in",
          uk: "Світ, у якому ми вже живемо",
          fr: "The world we already live in", // TODO: translate
          es: "The world we already live in", // TODO: translate
        },
        paragraphs: {
          en: [
            "Search is no longer a list of blue links. Instead of 'here are 10 sites, choose yourself,' users get a ready answer with a few recommendations.",
            "This isn't limited to retail. In B2B the shift is even sharper: per Wynter (2026), 84% of B2B marketing leaders use AI and language models to find vendors, and half of software buyers, per G2, now start their buying journey in an AI chat rather than Google. During the 2025 holiday season, Adobe recorded an 805% surge in AI-driven traffic to retail sites.",
            "The takeaway is simple: a significant share of your future customers are already asking AI about you, not Google. The only question is what it tells them.",
          ],
          uk: [
            "Пошук перестав бути списком синіх посилань. Замість «ось 10 сайтів, обирайте самі» користувач отримує готову відповідь із кількома рекомендаціями.",
            "І це вже не лише про ритейл. У B2B зсув ще різкіший: за опитуванням Wynter (2026), 84% маркетингових директорів B2B використовують AI та мовні моделі для пошуку постачальників, а половина покупців ПЗ, за даними G2, тепер починає шлях до покупки в AI-чаті, а не в Google. Під час святкового сезону 2025 Adobe зафіксувала зростання AI-трафіку на сайти рітейлу на 805%.",
            "Висновок простий: значна частина ваших майбутніх клієнтів уже питає про вас не Google, а штучний інтелект. Питання лише в тому, що він про вас відповість.",
          ],
          fr: ["Search is no longer a list of blue links."], // TODO: translate
          es: ["Search is no longer a list of blue links."], // TODO: translate
        },
      },
      {
        heading: {
          en: "The big shift: there is no 'page two' in AI search",
          uk: "Головна зміна: у AI-пошуку немає «другої сторінки»",
          fr: "The big shift: there is no 'page two' in AI search", // TODO: translate
          es: "The big shift: there is no 'page two' in AI search", // TODO: translate
        },
        paragraphs: {
          en: [
            "In classic search, being tenth still got you a click. In an AI answer there is no top ten — the model usually names 3-4 brands and stops. You're either among them, or you don't exist for that user.",
            "This isn't the same ranking as Google's. Research shows a near-zero correlation (0.034) between a site's Google position and whether ChatGPT mentions it. Classic SEO signals — backlinks, domain authority — have weak, indirect influence on AI recommendations.",
          ],
          uk: [
            "У класичному пошуку можна було бути десятим і все одно отримати клік. У відповіді AI немає десятки — модель називає зазвичай 3-4 бренди і на цьому зупиняється. Ви або серед них, або вас не існує для цього користувача.",
            "Причому це не той самий рейтинг, що в Google. Дослідження показують майже нульову кореляцію (0,034) між позицією сайту в Google і тим, чи згадає його ChatGPT. Класичні SEO-сигнали — беклінки, домен-авторитет — на рекомендації AI впливають слабо й лише опосередковано.",
          ],
          fr: ["In classic search, being tenth still got you a click."], // TODO: translate
          es: ["In classic search, being tenth still got you a click."], // TODO: translate
        },
      },
      {
        heading: {
          en: "How AI decides who to recommend",
          uk: "Як штучний інтелект обирає, кого рекомендувати",
          fr: "How AI decides who to recommend", // TODO: translate
          es: "How AI decides who to recommend", // TODO: translate
        },
        paragraphs: {
          en: [
            "AI doesn't 'google' you — it draws on what it knows from training data and what it finds live on the web (RAG). Key signals: mentions in authoritative lists and rankings (~41% weight, per Onely); brand mention volume and tone across the web (~35% predictive weight, per SE Ranking); independent reviews (~16%); awards and accreditations (~18%); recognizable entity presence (a clear company description, a Wikipedia page, mentions in respected outlets); and content freshness — content updated within 30 days gets 3.2x more AI citations.",
            "As of 2026, a spot in an AI answer cannot be bought — no major model sells recommendation placements. Visibility is earned, not paid for.",
          ],
          uk: [
            "AI не «гуглить» вас — він спирається на те, що про вас знає з навчальних даних, і на те, що знаходить у мережі в реальному часі (RAG). Ключові сигнали: згадки в авторитетних добірках і рейтингах (~41% ваги, за оцінкою Onely); обсяг і тональність згадок бренду в мережі (~35% ваги предиктора, за SE Ranking); незалежні відгуки (~16%); нагороди й акредитації (~18%); присутність як розпізнаваної сутності (чіткий опис компанії, сторінка у Вікіпедії, згадки в поважних виданнях); свіжість контенту — оновлений за 30 днів контент отримує у 3,2 раза більше AI-цитувань.",
            "Станом на 2026 рік місце у відповіді AI не можна купити — жодна велика модель не продає рекламні позиції в рекомендаціях. Видимість — зароблена, а не оплачена.",
          ],
          fr: ["AI doesn't 'google' you — it draws on training data and live web content."], // TODO: translate
          es: ["AI doesn't 'google' you — it draws on training data and live web content."], // TODO: translate
        },
      },
      {
        heading: {
          en: "Why this is, fundamentally, reputation",
          uk: "Чому це, по суті, — репутація",
          fr: "Why this is, fundamentally, reputation", // TODO: translate
          es: "Why this is, fundamentally, reputation", // TODO: translate
        },
        paragraphs: {
          en: [
            "Look at the list of factors: authoritative mentions, tone, reviews, awards, entity status, fresh positive content. These are exactly the signals reputation management works with — except now the main 'reader' is not just a customer, but the machine recommending you to that customer.",
            "That's why AI visibility work is a natural extension of honest reputation management: building a consistent positive information footprint through real achievements and coverage; earning presence in authoritative sources; helping businesses systematically gather more genuine reviews from real customers; and displacing outdated negative content with current, truthful, well-structured material that language models can find and cite.",
          ],
          uk: [
            "Придивіться до списку факторів: авторитетні згадки, тональність, відгуки, нагороди, статус розпізнаваної сутності, свіжий позитивний контент. Це точно ті самі сигнали, якими керується репутаційний менеджмент — лише тепер їхнім головним «читачем» став не тільки клієнт, а й машина, що радить цьому клієнту.",
            "Тому робота з AI-видимістю — природне продовження чесного керування репутацією: формуємо послідовний позитивний інформаційний фон через реальні досягнення й публікації; заробляємо присутність в авторитетних джерелах; допомагаємо системно збирати більше справжніх відгуків від реальних клієнтів; витісняємо застарілий негатив актуальним, правдивим і добре структурованим контентом.",
          ],
          fr: ["These are exactly the signals reputation management works with."], // TODO: translate
          es: ["These are exactly the signals reputation management works with."], // TODO: translate
        },
      },
    ],
    faq: [
      {
        question: {
          en: "How many people actually look for services through AI?",
          uk: "Скільки людей насправді шукають послуги через AI?",
          fr: "How many people actually look for services through AI?", // TODO: translate
          es: "How many people actually look for services through AI?", // TODO: translate
        },
        answer: {
          en: "Over a billion people use AI tools monthly, more than half of consumers in developed markets use AI for shopping-related tasks at least monthly, and 84% of B2B leaders look for vendors through language models. Gartner projects roughly 25% of search traffic shifting to AI by 2026.",
          uk: "Понад мільярд людей щомісяця користуються AI-інструментами, понад половина покупців у розвинених ринках використовують AI для завдань із покупками щонайменше раз на місяць, а 84% B2B-директорів шукають постачальників через мовні моделі. Gartner прогнозує перехід близько 25% пошукового трафіку до AI вже у 2026 році.",
          fr: "Over a billion people use AI tools monthly.", // TODO: translate
          es: "Over a billion people use AI tools monthly.", // TODO: translate
        },
      },
      {
        question: {
          en: "Can you pay for ChatGPT to recommend your business?",
          uk: "Чи можна заплатити, щоб ChatGPT рекомендував мій бізнес?",
          fr: "Can you pay for ChatGPT to recommend your business?", // TODO: translate
          es: "Can you pay for ChatGPT to recommend your business?", // TODO: translate
        },
        answer: {
          en: "No. As of 2026, no major AI model sells recommendation placements. Visibility is earned through authoritative mentions, genuine reviews, reputation signals, and quality structured content.",
          uk: "Ні. Станом на 2026 рік жодна велика AI-модель не продає позиції в рекомендаціях. Видимість заробляється через авторитетні згадки, справжні відгуки, репутаційні сигнали та якісний структурований контент.",
          fr: "No. No major AI model sells recommendation placements.", // TODO: translate
          es: "No. No major AI model sells recommendation placements.", // TODO: translate
        },
      },
      {
        question: {
          en: "Why does a competitor show up in AI answers while I don't?",
          uk: "Чому конкурент зʼявляється у відповідях AI, а я — ні?",
          fr: "Why does a competitor show up in AI answers while I don't?", // TODO: translate
          es: "Why does a competitor show up in AI answers while I don't?", // TODO: translate
        },
        answer: {
          en: "Most likely the competitor has stronger signals: more mentions in authoritative lists and outlets, a better review profile, clearer entity presence (including Wikipedia), and fresher content. All of these are manageable factors.",
          uk: "Найімовірніше, у конкурента сильніші «сигнали»: він частіше згадується в авторитетних добірках і виданнях, має кращий профіль відгуків, чіткішу присутність як сутність (аж до Вікіпедії) і свіжіший контент. Усе це — керовані фактори.",
          fr: "The competitor likely has stronger authority signals.", // TODO: translate
          es: "The competitor likely has stronger authority signals.", // TODO: translate
        },
      },
      {
        question: {
          en: "Does classic SEO help with AI visibility?",
          uk: "Чи допомагає класичне SEO для AI-видимості?",
          fr: "Does classic SEO help with AI visibility?", // TODO: translate
          es: "Does classic SEO help with AI visibility?", // TODO: translate
        },
        answer: {
          en: "Indirectly. A good site is easier to find and index, but the direct effect of backlinks and Google rank on AI recommendations is close to zero. Separate work is needed — AEO/GEO and reputation signals.",
          uk: "Опосередковано. Гарний сайт легше знаходити й індексувати, але прямий вплив беклінків і позиції в Google на рекомендації AI близький до нуля. Потрібна окрема робота — AEO/GEO та репутаційні сигнали.",
          fr: "Indirectly. Backlinks and Google rank have close to zero direct effect.", // TODO: translate
          es: "Indirectly. Backlinks and Google rank have close to zero direct effect.", // TODO: translate
        },
      },
      {
        question: {
          en: "How fast can what AI says about me change?",
          uk: "Як швидко можна змінити те, що AI каже про мене?",
          fr: "How fast can what AI says about me change?", // TODO: translate
          es: "How fast can what AI says about me change?", // TODO: translate
        },
        answer: {
          en: "On real-time engines (Perplexity, search mode) changes can show within weeks; base models update more slowly. With systematic work, most brands see a measurable increase in AI citations within 3-6 months.",
          uk: "На рушіях реального часу (Perplexity, режим пошуку) зміни можуть проявитися за тижні; базові моделі оновлюються повільніше. За системної роботи більшість брендів фіксують помітне зростання AI-цитувань протягом 3-6 місяців.",
          fr: "Changes on real-time engines can show within weeks.", // TODO: translate
          es: "Changes on real-time engines can show within weeks.", // TODO: translate
        },
      },
    ],
  },
];
