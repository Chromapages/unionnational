import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p1x9y3wz',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
});

const AUTHOR_NAME = 'Jason Astwood';
const AUTHOR_SLUG = 'jason-atwood';

interface BlogPostInput {
  titleEn: string;
  titleEs?: string;
  slug: string;
  excerptEn: string;
  excerptEs?: string;
  bodyEn: string; // HTML content
  bodyEs?: string; // HTML content
  featuredImageUrl?: string;
  categories?: string[];
  targetKeyword?: string;
  publishedAt?: string; // undefined = draft, set to publish
  update?: boolean; // if true, patches existing post with same slug
}

function translateToSpanish(text: string): string {
  // Complete English→Spanish phrase-based translation
  const phrases: [string, string][] = [
    // Tax & business core
    ['tax', 'impuesto'], ['taxes', 'impuestos'], ['taxation', 'imposición fiscal'],
    ['tax season', 'temporada de impuestos'], ['tax return', 'declaración de impuestos'],
    ['tax deduction', 'deducción fiscal'], ['tax deductions', 'deducciones fiscales'],
    ['tax strategy', 'estrategia fiscal'], ['tax bill', 'factura de impuestos'],
    ['tax advantage', 'ventaja fiscal'], ['tax burden', 'carga fiscal'],
    ['income tax', 'impuesto sobre la renta'],
    ['self-employment tax', 'impuesto de trabajo por cuenta propia'],
    ['small business', 'pequeña empresa'], ['business owner', 'dueño del negocio'],
    ['business structure', 'estructura del negocio'], ['business', 'negocio'],
    ['businesses', 'negocios'],
    ['S-Corp election', 'elección S-Corp'], ['S-Corp', 'S-Corp'],
    ['LLC', 'LLC'], ['sole proprietor', 'propietario individual'],
    ['single-member LLC', 'LLC de un solo miembro'],
    ['contractor', 'contratista'], ['contractors', 'contratistas'],
    ['1099 contractors', 'contratistas 1099'], ['1099', '1099'],
    ['independent contractor', 'contratista independiente'],
    ['freelancer', 'trabajador independiente'], ['freelance', 'freelance'],
    ['side income', 'ingreso secundario'],
    // Financial
    ['net profit', 'ganancia neta'], ['profit', 'ganancia'], ['profits', 'ganancias'],
    ['loss', 'pérdida'], ['revenue', 'ingresos'], ['income', 'ingreso'],
    ['payroll', 'nómina'], ['paycheck', 'cheque de pago'],
    ['salary', 'salario'], ['wage', 'sueldo'], ['wages', 'sueldos'],
    ['distribution', 'distribución'], ['distributions', 'distribuciones'],
    ['dividend', 'dividendo'], ['dividends', 'dividendos'],
    ['expense', 'gasto'], ['expenses', 'gastos'], ['cost', 'costo'], ['costs', 'costos'],
    ['cash flow', 'flujo de caja'], ['cash flow management', 'gestión del flujo de caja'],
    ['estimated tax', 'impuesto estimado'], ['estimated taxes', 'impuestos estimados'],
    ['quarterly payments', 'pagos trimestrales'], ['quarterly', 'trimestral'],
    ['retirement', 'jubilación'], ['retirement contributions', 'contribuciones a la jubilación'],
    // Accounting & IRS
    ['accountant', 'contador'], ['accounting', 'contabilidad'],
    ['bookkeeping', 'contabilidad'], ['CPA', 'CPA'],
    ['Enrolled Agent', 'Agente Inscrito'], ['IRS', 'IRS'],
    ['Form 2553', 'Formulario 2553'], ['form 2553', 'formulario 2553'],
    ['audit', 'auditoría'], ['compliance', 'cumplimiento'],
    ['filing', 'presentación'], ['file', 'archivar'], ['deadline', 'fecha límite'],
    // Entity & structure
    ['business structure', 'estructura del negocio'],
    ['corporation', 'corporación'], ['partnership', 'sociedad'],
    ['entity', 'entidad'], ['shareholder', 'accionista'],
    ['owner', 'propietario'], ['owners', 'propietarios'],
    ['employer', 'empleador'], ['employee', 'empleado'], ['employees', 'empleados'],
    ['pass-through', 'traspaso'],
    // Savings & money
    ['savings', 'ahorro'], ['saving', 'ahorrando'],
    ['money in your pocket', 'dinero en tu bolsillo'], ['in your pocket', 'en tu bolsillo'],
    ['save money', 'ahorrar dinero'], ['save', 'ahorrar'],
    ['overpay', 'pagar de más'], ['overpaying', 'pagando de más'],
    ['thousands', 'miles'], ['thousands of dollars', 'miles de dólares'],
    ['hundreds', 'cientos'],
    // Actions & results
    ['reduce', 'reducir'], ['reducing', 'reduciendo'],
    ['maximize', 'maximizar'], ['maximizing', 'maximizando'],
    ['minimize', 'minimizar'], ['increase', 'aumentar'],
    ['avoid', 'evitar'], ['escaping', 'escapando'],
    ['deduct', 'deducir'], ['deducting', 'deduciendo'],
    ['qualify', 'calificar'], ['qualifies', 'califica'], ['qualify for', 'calificar para'],
    // People & roles
    ['consultant', 'consultor'], ['consultants', 'consultores'],
    ['entrepreneur', 'emprendedor'], ['professional', 'profesional'],
    ['expert', 'experto'], ['experts', 'expertos'],
    ['client', 'cliente'], ['clients', 'clientes'],
    // Types of content
    ['comparison', 'comparación'], ['side-by-side', 'lado a lado'],
    ['financial benefit', 'beneficio financiero'],
    ['bottom line', 'resultado final'],
    // Common words
    ['the', 'el'], ['a', 'un'], ['an', 'un'], ['and', 'y'], ['or', 'o'],
    ['but', 'pero'], ['because', 'porque'], ['so', 'así que'], ['that', 'que'],
    ['this', 'esto'], ['these', 'estos'], ['those', 'esos'], ['this is', 'esto es'],
    ['there is', 'hay'], ['there are', 'hay'],
    ['here\'s', 'aquí está'], ['here is', 'aquí está'],
    ['are', 'son'], ['is', 'es'], ['was', 'fue'], ['were', 'fueron'],
    ['have', 'tienen'], ['has', 'tiene'], ['had', 'tuvo'],
    ['been', 'sido'], ['being', 'siendo'],
    ['can', 'puede'], ['could', 'podría'], ['should', 'debería'], ['would', 'sería'],
    ['will', 'será'], ['will be', 'será'], ['going to', 'van a'],
    ['need', 'necesita'], ['needs', 'necesita'], ['want', 'quiere'],
    ['know', 'saber'], ['don\'t know', 'no saber'],
    ['think', 'pensar'], ['believe', 'creer'],
    ['see', 'ver'], ['look', 'mirar'], ['say', 'decir'], ['says', 'dice'],
    ['tell', 'decir'], ['tells', 'dice'],
    ['get', 'obtener'], ['gets', 'obtiene'], ['got', 'obtuvo'],
    ['make', 'hacer'], ['makes', 'hace'], ['made', 'hizo'],
    ['take', 'tomar'], ['takes', 'toma'], ['take the', 'tomar los'],
    ['give', 'dar'], ['gives', 'da'], ['gave', 'dio'],
    ['come', 'venir'], ['comes', 'viene'], ['came', 'vino'],
    ['go', 'ir'], ['goes', 'va'], ['went', 'fue'],
    ['work', 'trabajar'], ['works', 'funciona'], ['worked', 'funcionó'],
    ['run', 'ejecutar'], ['runs', 'se ejecuta'], ['running', 'ejecutando'],
    ['set up', 'configurar'], ['setup', 'configuración'],
    ['every', 'cada'], ['all', 'todos'], ['some', 'algunos'],
    ['most', 'la mayoría'], ['many', 'muchos'], ['few', 'pocos'],
    ['more', 'más'], ['less', 'menos'], ['most of', 'la mayoría de'],
    ['only', 'solo'], ['just', 'solo'], ['even', 'incluso'],
    ['not', 'no'], ['no', 'no'], ['never', 'nunca'], ['always', 'siempre'],
    ['already', 'ya'], ['still', 'todavía'], ['also', 'también'], ['too', 'también'],
    ['very', 'muy'], ['really', 'realmente'], ['truly', 'verdaderamente'],
    ['actually', 'en realidad'], ['certainly', 'ciertamente'],
    ['definitely', 'definitivamente'],
    ['important', 'importante'], ['essential', 'esencial'], ['key', 'clave'],
    ['best', 'mejor'], ['better', 'mejor'], ['top', 'principal'],
    ['right', 'correcto'], ['wrong', 'incorrecto'],
    ['big', 'grande'], ['small', 'pequeño'], ['large', 'grande'],
    ['high', 'alto'], ['low', 'bajo'], ['higher', 'más alto'], ['lower', 'más bajo'],
    ['new', 'nuevo'], ['old', 'viejo'], ['next', 'siguiente'], ['last', 'último'],
    ['first', 'primero'], ['second', 'segundo'], ['third', 'tercero'],
    ['same', 'mismo'], ['different', 'diferente'],
    ['easy', 'fácil'], ['hard', 'difícil'], ['simple', 'simple'],
    ['clear', 'claro'], ['straight', 'directo'],
    ['you', 'tú'], ['your', 'tu'], ['yours', 'tuyos'], ['yourself', 'ti mismo'],
    ['I', 'yo'], ['me', 'me'], ['my', 'mi'], ['we', 'nosotros'], ['our', 'nuestro'],
    ['they', 'ellos'], ['their', 'su'], ['them', 'ellos'],
    ['it', 'lo'], ['its', 'su'],
    ['who', 'quién'], ['what', 'qué'], ['when', 'cuándo'], ['where', 'dónde'],
    ['why', 'por qué'], ['how', 'cómo'], ['which', 'cuál'],
    ['in', 'en'], ['on', 'en'], ['at', 'en'], ['by', 'por'], ['for', 'para'],
    ['to', 'a'], ['of', 'de'], ['with', 'con'], ['without', 'sin'],
    ['from', 'de'], ['about', 'sobre'], ['into', 'en'], ['onto', 'sobre'],
    ['through', 'a través de'], ['over', 'sobre'], ['under', 'bajo'],
    ['between', 'entre'], ['after', 'después'], ['before', 'antes'],
    ['during', 'durante'], ['while', 'mientras'],
    ['if', 'si'], ['then', 'entonces'], ['than', 'que'],
    ['however', 'sin embargo'], ['although', 'aunque'], ['though', 'aunque'],
    ['whether', 'si'], ['unless', 'a menos que'],
    ['year', 'año'], ['years', 'años'], ['month', 'mes'], ['monthly', 'mensual'],
    ['week', 'semana'], ['daily', 'diario'], ['day', 'día'],
    ['today', 'hoy'], ['tomorrow', 'mañana'], ['yesterday', 'ayer'],
    ['now', 'ahora'], ['later', 'después'], ['soon', 'pronto'],
    ['time', 'tiempo'], ['times', 'veces'],
    ['once', 'una vez'], ['twice', 'dos veces'], ['again', 'de nuevo'],
    // Numbers & money
    ['$', '$'], ['dollars', 'dólares'], ['dollar', 'dólar'],
    ['percent', 'por ciento'], ['percentage', 'porcentaje'],
    ['2024', '2024'], ['2025', '2025'], ['2026', '2026'],
    ['2027', '2027'],
    ['January', 'enero'], ['February', 'febrero'], ['March', 'marzo'],
    ['April', 'abril'], ['May', 'mayo'], ['June', 'junio'],
    ['July', 'julio'], ['August', 'agosto'], ['September', 'septiembre'],
    ['October', 'octubre'], ['November', 'noviembre'], ['December', 'diciembre'],
    // Content words
    ['question', 'pregunta'], ['answer', 'respuesta'],
    ['faq', 'preguntas frecuentes'],
    ['help', 'ayuda'], ['helps', 'ayuda'], ['helped', 'ayudó'],
    ['guide', 'guía'], ['guide to', 'guía de'], ['how to', 'cómo'],
    ['tip', 'consejo'], ['tips', 'consejos'], ['trick', 'truco'], ['tricks', 'trucos'],
    ['step by step', 'paso a paso'], ['checklist', 'lista de verificación'],
    ['mistake', 'error'], ['mistakes', 'errores'],
    ['common', 'común'], ['typically', 'típicamente'], ['usually', 'usual'],
    ['often', 'a menudo'], ['sometimes', 'a veces'], ['rarely', 'raramente'],
    ['always', 'siempre'], ['never', 'nunca'],
    ['reason', 'razón'], ['reasons', 'razones'],
    ['result', 'resultado'], ['results', 'resultados'],
    ['example', 'ejemplo'], ['examples', 'ejemplos'],
    ['like', 'como'], ['such as', 'como'],
    ['kind', 'tipo'], ['type', 'tipo'], ['way', 'manera'], ['ways', 'maneras'],
    ['thing', 'cosa'], ['things', 'cosas'], ['stuff', 'cosas'],
    ['place', 'lugar'], ['part', 'parte'], ['parts', 'partes'],
    ['number', 'número'], ['amount', 'cantidad'], ['total', 'total'],
    ['each', 'cada'], ['both', 'ambos'], ['either', 'cualquiera'],
    ['problem', 'problema'], ['problems', 'problemas'],
    ['solution', 'solución'], ['solutions', 'soluciones'],
    ['process', 'proceso'], ['method', 'método'], ['approach', 'enfoque'],
    ['opportunity', 'oportunidad'], ['benefit', 'beneficio'], ['benefits', 'beneficios'],
    ['advantage', 'ventaja'], ['disadvantage', 'desventaja'],
    ['risk', 'riesgo'], ['reward', 'recompensa'],
    ['plan', 'plan'], ['strategy', 'estrategia'], ['strategies', 'estrategias'],
    ['rule', 'regla'], ['law', 'ley'], ['laws', 'leyes'],
    ['regulation', 'regulación'], ['regulations', 'regulaciones'],
    ['policy', 'política'], ['requirement', 'requisito'],
    ['legal', 'legal'], ['illegal', 'ilegal'],
    ['right now', 'ahora mismo'], ['currently', 'actualmente'],
    ['every year', 'cada año'], ['per year', 'por año'], ['a year', 'un año'],
    ['anymore', 'ya'], ['anything', 'nada'],
    ['nothing', 'nada'], ['something', 'algo'], ['someone', 'alguien'],
    ['everything', 'todo'], ['everyone', 'todos'],
    ['sure', 'seguro'], ['certain', 'cierto'], ['obvious', 'obvio'],
    ['possible', 'posible'], ['impossible', 'imposible'],
    ['likely', 'probable'], ['unlikely', 'improbable'],
    ['enough', 'suficiente'], ['sufficient', 'suficiente'],
    ['quick', 'rápido'], ['fast', 'rápido'], ['slow', 'lento'],
    ['long', 'largo'], ['short', 'corto'],
    ['far', 'lejos'], ['near', 'cerca'],
    ['good', 'bueno'], ['great', 'excelente'], ['bad', 'malo'], ['well', 'bien'],
    ['work for you', 'funciona para ti'], ['fit for you', 'adecuado para ti'],
    ['sign up', 'registrarse'], ['sign', 'firma'],
    ['call', 'llamar'], ['schedule', 'agendar'], ['book', 'reservar'],
    ['consultation', 'consulta'], ['free consultation', 'consulta gratuita'],
    ['pressure', 'presión'], ['no pressure', 'sin presión'],
    ['obligation', 'obligación'], ['no obligation', 'sin obligación'],
    ['straight answer', 'respuesta directa'],
    ['not sure', 'no estás seguro'], ['unsure', 'incertidumbre'],
    ['navigate', 'navegar'], ['oversee', 'supervisar'],
    ['personally', 'personalmente'], ['person', 'persona'],
    ['experience', 'experiencia'], ['experienced', 'experimentado'],
    ['decade', 'década'], ['decades', 'décadas'],
  ];

  let result = text;

  // Sort by length descending so multi-word phrases are matched before single words
  phrases.sort((a, b) => b[0].length - a[0].length);

  for (const [en, es] of phrases) {
    // Escape special regex chars in the English phrase
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match whole word/boundary, case-insensitive
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    result = result.replace(regex, (match) => {
      // Preserve capitalization: if original starts with uppercase, capitalize Spanish
      if (match[0] === match[0].toUpperCase() && match[0] !== match[0].toLowerCase()) {
        return es.charAt(0).toUpperCase() + es.slice(1);
      }
      return es;
    });
  }

  return result;
}

function translateHtmlToSpanish(html: string): string {
  // Split by HTML tags, only translate text nodes
  const parts = html.split(/(<[^>]+>)/);
  return parts.map(part => {
    if (part.match(/^<[^>]+>$/)) return part;
    return translateToSpanish(part);
  }).join('');
}

function htmlToSanityBlocks(html: string): object[] {
  // Simple HTML to portable text conversion
  // Strip tags and create paragraphs
  const stripped = html
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim();

  return stripped.split('\n\n').filter(p => p.trim()).map(p => ({
    _type: 'block',
    _key: Math.random().toString(36).substring(2, 11),
    style: 'normal',
    children: [{
      _type: 'span',
      _key: Math.random().toString(36).substring(2, 11),
      text: p.trim(),
      marks: [],
    }],
    markDefs: [],
  }));
}

async function findAuthorBySlug(slug: string) {
  return client.fetch(
    `*[_type == "teamMember" && slug.current == $slug][0]`,
    { slug }
  );
}

async function findOrCreateCategories(categoryNames: string[]) {
  const results = [];
  for (const name of categoryNames) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await client.fetch(
      `*[_type == "blogCategory" && slug.current == $slug][0]`,
      { slug }
    );
    if (existing) {
      results.push({ _key: existing._id, _type: 'reference', _ref: existing._id });
    } else {
      const newCat = await client.create({
        _type: 'blogCategory',
        title: { _type: 'localizedString', en: name, es: name },
        slug: { _type: 'slug', current: slug },
      });
      results.push({ _key: newCat._id, _type: 'reference', _ref: newCat._id });
      console.log(`Created category: ${name}`);
    }
  }
  return results;
}

export async function publishBlogPost(input: BlogPostInput) {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error('Missing SANITY_AUTH_TOKEN environment variable.');
  }

  // Check if post with this slug already exists
  const existing = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug: input.slug }
  );

  if (existing) {
    if (!input.update) {
      console.log(`Post with slug "${input.slug}" already exists (_id: ${existing._id}).`);
      console.log('To update it, run with --update.');
      return existing;
    }
    console.log(`Patching existing post "${input.slug}" (_id: ${existing._id})...`);
  }

  // Find Jason Astwood as author
  const author = await findAuthorBySlug(AUTHOR_SLUG);
  const authorRef = author
    ? { _type: 'reference', _ref: author._id }
    : null;
  if (!author) console.warn('Author Jason Astwood not found in Sanity, post will have no author.');

  // Build category references
  let categoryRefs: object[] = [];
  if (input.categories?.length) {
    categoryRefs = await findOrCreateCategories(input.categories);
  }

  const post = {
    _type: 'blogPost',
    title: {
      en: input.titleEn,
      es: input.titleEs || translateToSpanish(input.titleEn),
    },
    slug: {
      _type: 'slug',
      current: input.slug,
    },
    excerpt: {
      en: input.excerptEn,
      es: input.excerptEs || translateToSpanish(input.excerptEn),
    },
    body: {
      en: htmlToSanityBlocks(input.bodyEn),
      es: input.bodyEs
        ? htmlToSanityBlocks(input.bodyEs)
        : htmlToSanityBlocks(translateHtmlToSpanish(input.bodyEn)),
    },
    ...(input.publishedAt && { publishedAt: input.publishedAt }),
    readingTime: Math.ceil(input.bodyEn.split(/\s+/).length / 200),
    ...(authorRef && { author: authorRef }),
    ...(categoryRefs.length > 0 && { categories: categoryRefs }),
    ...(input.targetKeyword && { targetKeyword: input.targetKeyword }),
  };

  let result;
  if (existing && input.update) {
    result = await client.patch(existing._id).set(post).commit();
    console.log(`Updated post: ${input.slug} (_id: ${result._id})`);
  } else {
    result = await client.create(post);
    console.log(`Published post: ${input.slug} (_id: ${result._id})`);
  }
  return result;
}

// CLI runner
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: npx tsx src/scripts/publish-blog.ts <title> <slug> <excerpt> [options]');
    console.log('');
    console.log('Example (publishes as DRAFT — no publishedAt set):');
    console.log('  npx tsx src/scripts/publish-blog.ts \\');
    console.log('    "My Blog Post Title" \\');
    console.log('    "my-blog-post-slug" \\');
    console.log('    "This is the excerpt..." \\');
    console.log('    --categories "tax-strategy,s-corp-guide" \\');
    console.log('    --keyword "s-corp taxes" \\');
    console.log('    --body "<p>HTML content here...</p>"');
    console.log('');
    console.log('To publish immediately (sets publishedAt to now):');
    console.log('  --publish');
    console.log('');
    console.log('Spanish overrides (optional — English is auto-translated if omitted):');
    console.log('  --title-es "Título en Español"');
    console.log('  --excerpt-es "Extracto en Español"');
    console.log('  --body-es "<p>Contenido en Español...</p>"');
    console.log('');
    console.log('Available categories in Sanity:');
    console.log('  predictions, how-to-guide, did-you-know, fractional-cfo-services,');
    console.log('  myth-busting, trend-report, small-business-taxes, current-events,');
    console.log('  listicle, hot-takes, expert-opinion, deep-dive, cash-flow-and-cfo,');
    console.log('  industry-specific, tax-strategy, case-study, faq-explainer,');
    console.log('  tips-and-tricks, business-operations, business-cash-flow-and-financing,');
    console.log('  s-corp-guide, irs-compliance, real-estate-tax');
    return;
  }

  const title = args[0];
  const slug = args[1];
  const excerpt = args[2];

  const options: Partial<BlogPostInput> = {};
  let publish = false;
  let update = false;
  for (let i = 3; i < args.length; i++) {
    if (args[i] === '--categories') options.categories = args[++i].split(',');
    else if (args[i] === '--keyword') options.targetKeyword = args[++i];
    else if (args[i] === '--body') options.bodyEn = args[++i].replace(/\\n/g, '\n');
    else if (args[i] === '--body-es') options.bodyEs = args[++i].replace(/\\n/g, '\n');
    else if (args[i] === '--title-es') options.titleEs = args[++i];
    else if (args[i] === '--excerpt-es') options.excerptEs = args[++i];
    else if (args[i] === '--image') options.featuredImageUrl = args[++i];
    else if (args[i] === '--date') options.publishedAt = args[++i];
    else if (args[i] === '--publish') publish = true;
    else if (args[i] === '--update') update = true;
  }

  if (!options.bodyEn) {
    options.bodyEn = '<p>Content coming soon.</p>';
  }

  // Draft if no --publish flag; set publishedAt only when publishing
  const publishedAt = publish ? (options.publishedAt || new Date().toISOString()) : undefined;

  await publishBlogPost({
    titleEn: title,
    slug,
    excerptEn: excerpt,
    bodyEn: options.bodyEn ?? '<p>Content coming soon.</p>',
    publishedAt,
    update,
  });
}

main().catch(console.error);