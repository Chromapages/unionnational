export type IndustryKey = "restaurants" | "construction";
type Topic = { title: string; description: string };
export type IndustryServiceContent = {
    name: string; directory: string; eyebrow: string; title: string; intro: string;
    metadataTitle: string; metadataDescription: string; image: string; imageAlt: string;
    cta: string; overviewLink: string; problemTitle: string; problemIntro: string; problems: string[];
    flowTitle: string; flowIntro: string; flow: string[];
    topicsTitle: string; topicsIntro: string; topics: Topic[];
    processTitle: string; process: Topic[]; fitTitle: string; fitIntro: string; fit: string[];
    faqTitle: string; faqs: { question: string; answer: string }[];
    formTitle: string; formIntro: string; privacy: string;
};

const content: Record<"en" | "es", Record<IndustryKey, IndustryServiceContent>> = {
    en: {
        restaurants: {
            name: "Restaurants", directory: "Who we help", eyebrow: "Restaurant owners and operators",
            title: "Restaurant CFO Partnership",
            intro: "Fractional CFO support for restaurant owners and operators. We connect financial reporting, food and labor cost analysis, menu economics and cash-flow planning with the decisions you make about your business.",
            metadataTitle: "Restaurant CFO Partnership | Union National Tax",
            metadataDescription: "Restaurant CFO services from Union National Tax: financial reporting, food and labor cost analysis, menu economics and cash-flow planning for owners and operators.",
            image: "/images/industries/food.png", imageAlt: "Illustration of a restaurant storefront, chef’s hat and dining utensils",
            cta: "Discuss restaurant support", overviewLink: "See the services",
            problemTitle: "Which decisions are hardest to make today?",
            problemIntro: "A busy dining room does not answer every question about how the business is doing. You might recognize one of these situations.",
            problems: ["Sales look healthy, but cash still feels unpredictable.", "Food purchases, waste and menu pricing are difficult to compare.", "Labor costs are hard to interpret alongside sales and scheduling.", "Financial reports arrive without a clear next action."],
            flowTitle: "Connect the dining room with the decisions behind it.",
            flowIntro: "What you buy, how you staff, what you sell and when you pay are connected. Our CFO guidance brings those areas into a clearer financial view for operating and growth decisions.",
            flow: ["Food purchases", "People and schedules", "Menu and sales mix", "Upcoming payments"],
            topicsTitle: "CFO services built around restaurant operations.",
            topicsIntro: "The Restaurant CFO Partnership connects your financial information with the way your restaurant operates. The engagement defines the reporting, analysis and ongoing support your business needs.",
            topics: [
                { title: "Financial reporting", description: "Bring sales and operating costs together in financial reports that support business decisions." },
                { title: "Food and labor cost analysis", description: "Review food purchases, labor and sales together to understand the costs behind restaurant performance." },
                { title: "Menu economics", description: "Connect ingredient costs and sales mix with menu pricing and product decisions." },
                { title: "Cash-flow planning", description: "Plan for payroll, suppliers, rent and other payments using a forward view of cash needs." },
            ],
            processTitle: "From financial review to an ongoing CFO partnership.",
            process: [
                { title: "Review the business", description: "Start with your current financial records, cost structure, reporting and business priorities." },
                { title: "Define the CFO support", description: "Agree the reporting, analysis, cash-flow planning and responsibilities for your engagement." },
                { title: "Put the numbers to work", description: "Use ongoing financial reviews and CFO guidance to inform restaurant operating and growth decisions." },
            ],
            fitTitle: "Financial leadership for restaurant owners and operators.",
            fitIntro: "The partnership is for owners looking beyond historical reports toward clearer financial management and decision support. Start with your current setup and the support you need.",
            fit: ["The type of restaurant business you run", "The systems and reports you currently use", "The food, labor, menu or cash question you want to discuss"],
            faqTitle: "Before you get in touch",
            faqs: [
                { question: "What should I include in my inquiry?", answer: "A brief description of your restaurant, the systems you use and the question you want to address is enough to introduce the conversation. Keep confidential records out of the public form." },
                { question: "Does sending an inquiry book a meeting?", answer: "No. This form sends an inquiry to UNT. Its confirmation does not reserve a calendar appointment or establish an engagement." },
                { question: "What does the Restaurant CFO Partnership focus on?", answer: "Financial reporting, food and labor cost analysis, menu economics and cash-flow planning. Your engagement sets the specific scope, responsibilities and fees; this page does not promise a fixed price or financial result." },
            ],
            formTitle: "Talk through the next step for your restaurant.",
            formIntro: "Tell UNT about your restaurant and the financial support you need. Start a conversation about the Restaurant CFO Partnership.",
            privacy: "Do not send tax returns, SSNs, EINs, account credentials or financial files through this public form.",
        },
        construction: {
            name: "Construction", directory: "Who we help", eyebrow: "Contractors and construction business owners",
            title: "Construction CFO Partnership",
            intro: "Fractional CFO support for construction business owners. We connect job costing, work-in-progress reporting, billing visibility and cash-flow planning with decisions about active projects and the business as a whole.",
            metadataTitle: "Construction CFO Partnership | Union National Tax",
            metadataDescription: "Construction CFO services from Union National Tax: job costing, work-in-progress reporting, billing visibility and cash-flow planning for construction businesses.",
            image: "/images/industries-construction-site.webp", imageAlt: "Construction professional looking across an active building site",
            cta: "Discuss construction support", overviewLink: "See the services",
            problemTitle: "Where is the picture hardest to see?",
            problemIntro: "An active schedule can make it difficult to connect what happens on a job with what appears in the books. You might be working through questions like these.",
            problems: ["The estimate and final job costs are difficult to compare.", "Changes happen in the field before they appear in the numbers.", "Billing and collections do not line up with payroll and supplier payments.", "The business is busy, but profit varies across projects."],
            flowTitle: "Follow the job from the estimate to the cash.",
            flowIntro: "A bid, recorded costs, an invoice and a payment each tell a different part of the story. CFO reporting connects them so you can review project performance and business cash needs together.",
            flow: ["What was estimated", "What has been spent", "What has been billed", "What has been collected"],
            topicsTitle: "CFO services built around the work you deliver.",
            topicsIntro: "The Construction CFO Partnership brings project-level numbers into the wider financial picture. Your engagement defines the reporting, planning and advisory responsibilities.",
            topics: [
                { title: "Job costing", description: "Review labor, materials, subcontractor costs and overhead against the project estimate." },
                { title: "Work-in-progress reporting", description: "Bring project progress and recorded financial information into a consistent reporting view." },
                { title: "Billing and estimating feedback", description: "Connect approved changes, billing status and cost variances with project and estimating decisions." },
                { title: "Cash-flow planning", description: "Plan around project receipts, payroll, suppliers and other business payments." },
            ],
            processTitle: "From project review to an ongoing CFO partnership.",
            process: [
                { title: "Review the business and jobs", description: "Start with current project reporting, cost information, billing patterns and financial priorities." },
                { title: "Define the CFO support", description: "Agree the reporting, cash-flow planning and advisory responsibilities for the engagement." },
                { title: "Use the information", description: "Use ongoing financial reviews and CFO guidance to inform project and business decisions." },
            ],
            fitTitle: "Financial leadership for construction business owners.",
            fitIntro: "The partnership focuses on the financial side of running jobs and managing the business. Begin with your reporting setup, project work and the support you need.",
            fit: ["The kinds of projects your business takes on", "How you currently record costs and track billing", "The estimating, job-cost or cash-timing question you want to discuss"],
            faqTitle: "Before you get in touch",
            faqs: [
                { question: "What should I share before the first conversation?", answer: "Start with a general description of your construction business and the questions you want to discuss. Do not upload project contracts, tax documents, account information or financial files through the public inquiry form." },
                { question: "Does the CFO partnership include managing projects or crews?", answer: "The CFO services described here focus on financial reporting, planning and guidance. Any additional operations or project-management work must be confirmed in the engagement scope; do not assume it includes field supervision, safety oversight or legal responsibilities." },
                { question: "Does sending an inquiry book a meeting?", answer: "No. The form sends an inquiry. A successful submission is not a booked appointment, a service agreement or a promise of a particular result." },
            ],
            formTitle: "Talk through the next step for your construction business.",
            formIntro: "Tell UNT about your construction business and the financial support you need. Start a conversation about the Construction CFO Partnership.",
            privacy: "Do not send tax returns, SSNs, EINs, project contracts, account credentials or financial files through this public form.",
        },
    },
    es: {
        restaurants: {
            name: "Restaurantes", directory: "A quién ayudamos", eyebrow: "Propietarios y operadores de restaurantes",
            title: "Alianza CFO para restaurantes",
            intro: "Apoyo de dirección financiera externa (CFO) para propietarios y operadores de restaurantes. Conectamos los informes financieros, el análisis de costos de alimentos y personal, la economía del menú y la planificación del flujo de efectivo con las decisiones de su negocio.",
            metadataTitle: "Alianza CFO para restaurantes | Union National Tax",
            metadataDescription: "Servicios CFO de Union National Tax para restaurantes: informes financieros, análisis de costos de alimentos y personal, economía del menú y planificación del flujo de efectivo.",
            image: "/images/industries/food.png", imageAlt: "Ilustración de un restaurante, un gorro de chef y utensilios de mesa",
            cta: "Hablemos del apoyo para su restaurante", overviewLink: "Conozca los servicios",
            problemTitle: "¿Qué decisiones son más difíciles hoy?",
            problemIntro: "Un comedor lleno no responde todas las preguntas sobre el negocio. Tal vez reconozca alguna de estas situaciones.",
            problems: ["Las ventas parecen buenas, pero el efectivo sigue siendo impredecible.", "Es difícil comparar compras de alimentos, desperdicios y precios del menú.", "Cuesta interpretar los costos de personal junto con ventas y horarios.", "Los informes financieros llegan sin un siguiente paso claro."],
            flowTitle: "Conecte el comedor con las decisiones del negocio.",
            flowIntro: "Las compras, el personal, lo que vende y cuándo paga están relacionados. Nuestra orientación CFO reúne esas áreas en una visión financiera más clara para sus decisiones operativas y de crecimiento.",
            flow: ["Compras de alimentos", "Personal y horarios", "Menú y mezcla de ventas", "Próximos pagos"],
            topicsTitle: "Servicios CFO adaptados a las operaciones de restaurantes.",
            topicsIntro: "La Alianza CFO para restaurantes conecta su información financiera con la operación del negocio. La contratación define los informes, el análisis y el apoyo continuo que necesita su restaurante.",
            topics: [
                { title: "Informes financieros", description: "Reúna las ventas y los costos operativos en informes financieros que apoyen las decisiones del negocio." },
                { title: "Análisis de costos de alimentos y personal", description: "Revise las compras de alimentos, el personal y las ventas en conjunto para entender los costos detrás del desempeño del restaurante." },
                { title: "Economía del menú", description: "Conecte los costos de ingredientes y la mezcla de ventas con las decisiones sobre precios y productos del menú." },
                { title: "Planificación del flujo de efectivo", description: "Planifique la nómina, los proveedores, el alquiler y otros pagos con una visión de las necesidades futuras de efectivo." },
            ],
            processTitle: "De la revisión financiera a una alianza CFO continua.",
            process: [
                { title: "Revise el negocio", description: "Empiece con sus registros financieros actuales, estructura de costos, informes y prioridades del negocio." },
                { title: "Defina el apoyo CFO", description: "Acuerde los informes, el análisis, la planificación del flujo de efectivo y las responsabilidades de la contratación." },
                { title: "Ponga los números a trabajar", description: "Use las revisiones financieras continuas y la orientación CFO para apoyar las decisiones operativas y de crecimiento del restaurante." },
            ],
            fitTitle: "Dirección financiera para propietarios y operadores de restaurantes.",
            fitIntro: "La alianza está dirigida a propietarios que buscan ir más allá de los informes históricos para contar con una gestión financiera más clara y apoyo en sus decisiones. Empiece por su situación actual y el apoyo que necesita.",
            fit: ["El tipo de restaurante que dirige", "Los sistemas e informes que utiliza", "La pregunta sobre alimentos, personal, menú o efectivo que quiere tratar"],
            faqTitle: "Antes de ponerse en contacto",
            faqs: [
                { question: "¿Qué debo incluir en mi consulta?", answer: "Una descripción breve del restaurante, los sistemas que utiliza y la pregunta que desea abordar permite presentar la conversación. No incluya documentos confidenciales en el formulario público." },
                { question: "¿Enviar una consulta reserva una cita?", answer: "No. Este formulario envía una consulta a UNT. La confirmación no reserva una cita en el calendario ni establece una contratación." },
                { question: "¿En qué se centra la Alianza CFO para restaurantes?", answer: "En informes financieros, análisis de costos de alimentos y personal, economía del menú y planificación del flujo de efectivo. La contratación define el alcance específico, las responsabilidades y los honorarios; esta página no promete un precio fijo ni un resultado financiero." },
            ],
            formTitle: "Hablemos del siguiente paso para su restaurante.",
            formIntro: "Cuente a UNT sobre su restaurante y el apoyo financiero que necesita. Inicie una conversación sobre la Alianza CFO para restaurantes.",
            privacy: "No envíe declaraciones fiscales, SSN, EIN, credenciales de cuentas ni archivos financieros a través de este formulario público.",
        },
        construction: {
            name: "Construcción", directory: "A quién ayudamos", eyebrow: "Contratistas y propietarios de empresas constructoras",
            title: "Alianza CFO para empresas constructoras",
            intro: "Apoyo de dirección financiera externa (CFO) para propietarios de empresas constructoras. Conectamos los costos por obra, los informes de obras en curso, la visibilidad de la facturación y la planificación del flujo de efectivo con las decisiones sobre proyectos activos y el negocio en conjunto.",
            metadataTitle: "Alianza CFO para empresas constructoras | Union National Tax",
            metadataDescription: "Servicios CFO de Union National Tax para construcción: costos por obra, informes de obras en curso, visibilidad de facturación y planificación del flujo de efectivo.",
            image: "/images/industries-construction-site.webp", imageAlt: "Profesional de construcción observando una obra activa",
            cta: "Hablemos del apoyo para su constructora", overviewLink: "Conozca los servicios",
            problemTitle: "¿Dónde es más difícil ver el panorama?",
            problemIntro: "Un calendario lleno puede dificultar conectar lo que sucede en la obra con lo que muestran los libros. Tal vez esté considerando preguntas como estas.",
            problems: ["Cuesta comparar el presupuesto con los costos finales de la obra.", "Los cambios ocurren en el campo antes de aparecer en los números.", "Los cobros no coinciden con la nómina y los pagos a proveedores.", "El negocio tiene trabajo, pero la ganancia cambia entre proyectos."],
            flowTitle: "Siga la obra desde el presupuesto hasta el cobro.",
            flowIntro: "El presupuesto, los costos registrados, la factura y el pago cuentan partes distintas de la historia. Los informes CFO los conectan para revisar juntos el desempeño de los proyectos y las necesidades de efectivo del negocio.",
            flow: ["Lo presupuestado", "Lo gastado", "Lo facturado", "Lo cobrado"],
            topicsTitle: "Servicios CFO adaptados a las obras que realiza.",
            topicsIntro: "La Alianza CFO para empresas constructoras integra los números de cada proyecto en el panorama financiero del negocio. La contratación define las responsabilidades de información, planificación y asesoramiento.",
            topics: [
                { title: "Costos por obra", description: "Revise la mano de obra, los materiales, los subcontratistas y los gastos generales frente al presupuesto del proyecto." },
                { title: "Informes de obras en curso (WIP)", description: "Combine el avance de cada obra con la información financiera registrada en informes consistentes." },
                { title: "Facturación y revisión de presupuestos", description: "Conecte los cambios aprobados, el estado de la facturación y las desviaciones de costos con las decisiones sobre proyectos y presupuestos." },
                { title: "Planificación del flujo de efectivo", description: "Planifique en función de los cobros de proyectos, la nómina, los proveedores y otros pagos del negocio." },
            ],
            processTitle: "De la revisión de proyectos a una alianza CFO continua.",
            process: [
                { title: "Revise el negocio y las obras", description: "Empiece con los informes actuales de proyectos, la información de costos, las pautas de facturación y las prioridades financieras." },
                { title: "Defina el apoyo CFO", description: "Acuerde los informes, la planificación del flujo de efectivo y las responsabilidades de asesoramiento de la contratación." },
                { title: "Use la información", description: "Use las revisiones financieras continuas y la orientación CFO para apoyar las decisiones sobre proyectos y el negocio." },
            ],
            fitTitle: "Dirección financiera para propietarios de empresas constructoras.",
            fitIntro: "La alianza se centra en las finanzas de las obras y la gestión del negocio. Empiece por sus informes actuales, sus proyectos y el apoyo que necesita.",
            fit: ["Los tipos de proyectos que realiza", "Cómo registra costos y sigue la facturación", "La pregunta sobre presupuestos, costos o efectivo que quiere tratar"],
            faqTitle: "Antes de ponerse en contacto",
            faqs: [
                { question: "¿Qué debo compartir antes de conversar?", answer: "Empiece con una descripción general de su constructora y las preguntas que desea tratar. No cargue contratos, documentos fiscales, datos de cuentas ni archivos financieros en el formulario público." },
                { question: "¿La alianza CFO incluye dirigir proyectos o cuadrillas?", answer: "Los servicios CFO descritos aquí se centran en informes financieros, planificación y orientación. Cualquier trabajo adicional de operaciones o gestión de proyectos debe confirmarse en el alcance de la contratación; no suponga que incluye supervisión de obra, seguridad o responsabilidades legales." },
                { question: "¿Enviar una consulta reserva una cita?", answer: "No. El formulario envía una consulta. El envío exitoso no es una cita reservada, un acuerdo de servicios ni una promesa de resultados." },
            ],
            formTitle: "Hablemos del siguiente paso para su constructora.",
            formIntro: "Cuente a UNT sobre su constructora y el apoyo financiero que necesita. Inicie una conversación sobre la Alianza CFO para empresas constructoras.",
            privacy: "No envíe declaraciones fiscales, SSN, EIN, contratos, credenciales de cuentas ni archivos financieros a través de este formulario público.",
        },
    },
};

export function getIndustryServiceContent(industry: IndustryKey, locale: string): IndustryServiceContent {
    return content[locale === "es" ? "es" : "en"][industry];
}
