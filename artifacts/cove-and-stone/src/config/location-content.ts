export type LocationContentLink = {
  label: string;
  href: string;
};

export type LocationPageContent = {
  h1: string;
  hero: string;
  introHeading: string;
  intro: string[];
  cards: { title: string; text: string }[];
  planningHeading: string;
  planningText: string;
  planningItems: string[];
  localReference?: {
    label: string;
    href: string;
    context: string;
  };
  relatedLocations: LocationContentLink[];
  relatedProjects?: LocationContentLink[];
};

export const LOCATION_PAGE_CONTENT: Record<string, LocationPageContent> = {
  jacksonville: {
    h1: 'Jacksonville Pool Renovation & Outdoor Living Design',
    hero: 'Cove & Stone plans custom pools, renovations and complete outdoor-living projects across Jacksonville, beginning with the property and how you want to use it.',
    introHeading: 'A Jacksonville address is only the starting point.',
    intro: [
      'Jacksonville includes many distinct neighborhoods and property types, so a useful pool plan starts with the specific parcel—not a citywide template. Home orientation, access, available yard, privacy, drainage and any community or waterfront conditions can change what makes sense.',
      'Cove & Stone can coordinate pool or renovation concepts with a spa, sun shelf, outdoor kitchen, shade, hardscape and lighting in one 3D-reviewed direction. Engineering, permitting and construction requirements are confirmed for the property and jurisdiction; this page does not imply an unverified completed project.',
    ],
    cards: [
      { title: 'Start with the site', text: 'Review the home, access, yard shape and existing conditions before settling on pool geometry or outdoor-room locations.' },
      { title: 'New pool or renovation', text: 'For an existing pool, compare the desired result with the current layout, surfaces, coping, equipment and surrounding space.' },
      { title: 'Plan the whole backyard', text: 'Pool, spa, dining, shade, paths and lighting can be considered together instead of added as disconnected features.' },
      { title: 'Review before construction', text: 'Use a 3D visualization and material selections to discuss proportions, finishes and circulation while changes are still on the design.' },
    ],
    planningHeading: 'Bring the property details into the first conversation.',
    planningText: 'A more useful Jacksonville consultation begins with the specific home and project goals. These details help separate a pool-only plan from a complete outdoor-living scope.',
    planningItems: [
      'Whether the property has an existing pool or starts with an open yard',
      'How the backyard should support swimming, dining, shade or entertaining',
      'Any known access, drainage, utility, association or waterfront constraints',
    ],
    relatedLocations: [
      { label: 'St. Johns pool design', href: '/locations/st-johns/' },
      { label: 'Jacksonville Beaches pool design', href: '/locations/jacksonville-beaches/' },
      { label: 'Deerwood pool design', href: '/locations/deerwood/' },
    ],
    relatedProjects: [
      { label: 'Mandarin pool and turf project — completed', href: '/projects/mandarin-pool-turf-retaining-walls/' },
      { label: 'Jacksonville waterfront design concept', href: '/projects/jacksonville-waterfront/' },
    ],
  },
  'ponte-vedra-beach': {
    h1: 'Ponte Vedra Beach Pool Builder & Outdoor Living',
    hero: 'Custom pool, spa and outdoor-living plans for Ponte Vedra Beach homes, shaped around each property, its architecture and its coastal setting.',
    introHeading: 'Coastal context should inform the design—not dictate a style.',
    intro: [
      'St. Johns County documents natural dunes and beach-restoration context along Ponte Vedra Beach. For a pool project, the design conversation can also consider orientation, sun and shade, views, privacy, drainage and any site-specific coastal or community review; conditions vary by address.',
      'A clean-lined pool, integrated spa or sun shelf can connect to a shaded outdoor room, kitchen, stone or porcelain deck and considered lighting. Cove & Stone develops the visual direction in 3D; this service-area page is design guidance, not a claim that a pictured concept is a completed local installation.',
    ],
    cards: [
      { title: 'Keep the home in view', text: 'Shape pool edges, spa placement and outdoor rooms around the architecture and the views the property can actually support.' },
      { title: 'Balance open sun and shade', text: 'Consider where swimming, lounging and dining happen during the day before placing a pergola or cabana.' },
      { title: 'Select materials for their use', text: 'Review coping, tile, decking and planting as a coordinated palette, then confirm product suitability for each application.' },
      { title: 'See the composition in 3D', text: 'A visualization can make the relationship among the pool, house, shade and outdoor rooms easier to assess before construction.' },
    ],
    planningHeading: 'Start with the parcel, then choose the coastal expression.',
    planningText: 'A Ponte Vedra Beach plan should respond to the property rather than rely on a generic “coastal” look. Confirm any applicable site and community requirements before fixing the layout.',
    planningItems: [
      'Which views, paths and connections to the home should remain open',
      'Where shade and privacy matter most for daily use',
      'What property-specific drainage, access or review conditions need confirmation',
    ],
    localReference: {
      label: 'St. Johns County beach and dune information',
      href: 'https://www.sjcfl.us/departments/beaches',
      context: 'The county source provides regional beach context; it does not establish requirements for an individual parcel.',
    },
    relatedLocations: [
      { label: 'Jacksonville Beaches pool design', href: '/locations/jacksonville-beaches/' },
      { label: 'Nocatee pool design', href: '/locations/nocatee/' },
      { label: 'St. Johns pool design', href: '/locations/st-johns/' },
    ],
    relatedProjects: [
      { label: 'Ponte Vedra Modern design concept', href: '/projects/ponte-vedra-modern/' },
    ],
  },
  nocatee: {
    h1: 'Nocatee Pool Builder for Custom Pools & Outdoor Living',
    hero: 'Plan a custom pool, spa or renovation for your Nocatee home around the lot, neighborhood and any review requirements that apply to your address.',
    introHeading: 'Design for the specific Nocatee neighborhood and lot.',
    intro: [
      'Nocatee is a master-planned community in the Ponte Vedra area with multiple neighborhoods. That makes the exact property important: available yard, home orientation, access and any current association or jurisdiction review should be confirmed before a layout is finalized.',
      'Cove & Stone can bring a custom pool or renovation together with a spa, sun shelf, outdoor kitchen, pergola, decking and lighting, then review the direction in 3D. The final scope depends on the property and approvals; this page does not claim completed work in a particular Nocatee neighborhood.',
    ],
    cards: [
      { title: 'Confirm the review path', text: 'Identify any neighborhood design review, recorded restrictions or authority approvals that apply to the address before committing to a layout.' },
      { title: 'Fit the available yard', text: 'Coordinate the pool footprint with the home, usable circulation, outdoor dining and the space needed for shade or planting.' },
      { title: 'Connect indoor and outdoor use', text: 'Plan doors, paths, kitchen and seating locations with the pool so the backyard works as a connected extension of the home.' },
      { title: 'Compare choices early', text: 'Review pool proportions and material combinations in 3D before final selections and construction coordination.' },
    ],
    planningHeading: 'Make the neighborhood review part of early planning.',
    planningText: 'Nocatee’s different neighborhoods may have different property conditions and review steps. Confirm the requirements for your address directly with the applicable association and authority.',
    planningItems: [
      'The lot plan, available buildable area and known easements or utilities',
      'Any neighborhood approval process and documents required for a submission',
      'Whether the project is a new pool, a renovation or a larger backyard plan',
    ],
    localReference: {
      label: 'Nocatee community and neighborhood information',
      href: 'https://www.nocatee.com/',
      context: 'Use the community’s current information to identify the applicable neighborhood contact and review path for your address.',
    },
    relatedLocations: [
      { label: 'Ponte Vedra Beach pool design', href: '/locations/ponte-vedra-beach/' },
      { label: 'St. Johns pool design', href: '/locations/st-johns/' },
      { label: 'Jacksonville pool design', href: '/locations/jacksonville/' },
    ],
  },
  'st-johns': {
    h1: 'St. Johns Pool Builder & Outdoor Living Design',
    hero: 'Custom pool, spa, renovation and outdoor-living planning for St. Johns homes, with each design and project scope tied to the specific property.',
    introHeading: 'Plan around the property and the way the backyard will be used.',
    intro: [
      '“St. Johns” can refer to a broad area rather than one uniform neighborhood. The parcel address, home layout, access, drainage and any community requirements all matter when deciding where a pool, spa and outdoor rooms should go.',
      'Cove & Stone can coordinate pool geometry, a sun shelf, outdoor kitchen, shade structures, hardscape and lighting as one visual plan. Engineering, permitting and construction requirements depend on the property and applicable jurisdiction, so they are confirmed during project planning.',
    ],
    cards: [
      { title: 'Verify the project address', text: 'Use the property location to confirm which local review and permitting requirements apply before setting a construction schedule.' },
      { title: 'Make daily circulation clear', text: 'Consider how people move from the home to the pool, seating, dining and shaded areas.' },
      { title: 'Coordinate a complete palette', text: 'Compare pavers, porcelain, marble, stone, coping and turf with the home and intended use of each area.' },
      { title: 'Compare new-build and update paths', text: 'An existing pool can be assessed alongside its surfaces, equipment, layout and surrounding outdoor-living needs.' },
    ],
    planningHeading: 'Bring a clear brief for the St. Johns property.',
    planningText: 'A first design discussion is more productive when the owner’s goals and the property constraints are considered together, before individual features are selected.',
    planningItems: [
      'A survey or site plan, if available, and notes on access or grade changes',
      'The project priority: new pool, renovation, spa or full outdoor living',
      'Any association guidelines or local review already identified for the address',
    ],
    relatedLocations: [
      { label: 'Julington Creek pool design', href: '/locations/julington-creek/' },
      { label: 'Nocatee pool design', href: '/locations/nocatee/' },
      { label: 'Jacksonville pool design', href: '/locations/jacksonville/' },
    ],
  },
  'jacksonville-beaches': {
    h1: 'Jacksonville Beaches Pool Builder & Coastal Outdoor Living',
    hero: 'A regional design resource for pool and outdoor-living projects in Atlantic Beach, Jacksonville Beach and Neptune Beach—with a dedicated page for each city.',
    introHeading: 'Start with the Beaches overview, then plan for the exact city and lot.',
    intro: [
      'Atlantic Beach, Jacksonville Beach and Neptune Beach are separate municipalities. This Jacksonville Beaches page connects homeowners to each city’s service-area guide; confirm the actual municipality by property address because local review and permitting are not interchangeable.',
      'Cove & Stone can consider a pool, spa, renovation, kitchen, shade structure, decking and lighting as one connected environment. Use the city-specific pages below for a more focused design discussion; no single coastal template or unverified local project claim applies to every property.',
    ],
    cards: [
      { title: 'Choose the right local page', text: 'Compare the Atlantic Beach, Jacksonville Beach and Neptune Beach guides to find the closest context for your property.' },
      { title: 'Assess the site first', text: 'Lot dimensions, access, privacy, drainage and exposure differ by address and should guide the plan.' },
      { title: 'Connect pool and living areas', text: 'Plan the pool, spa, kitchen, dining, shade and paths together so the backyard reads as one environment.' },
      { title: 'Treat materials as a system', text: 'Review coping, deck, tile, planting and lighting together, and confirm the suitability of selected products for each application.' },
    ],
    planningHeading: 'Use the city pages to narrow the conversation.',
    planningText: 'This regional guide is an entry point, not a substitute for a site-specific review. The linked city pages provide distinct planning context while keeping the property itself at the center.',
    planningItems: [
      'Select the municipality or service-area page most relevant to the address',
      'Note the home’s outdoor access, privacy needs and preferred use of the yard',
      'Confirm any property-specific coastal, neighborhood or jurisdiction review',
    ],
    localReference: {
      label: 'City of Jacksonville Beaches information',
      href: 'https://www.jacksonville.gov/departments/parks-and-recreation/beaches',
      context: 'The City of Jacksonville page lists the three beach municipalities; use the property address to identify the correct local authority.',
    },
    relatedLocations: [
      { label: 'Atlantic Beach pool design', href: '/locations/atlantic-beach/' },
      { label: 'Jacksonville Beach pool design', href: '/locations/jacksonville-beach/' },
      { label: 'Neptune Beach pool design', href: '/locations/neptune-beach/' },
      { label: 'Ponte Vedra Beach pool design', href: '/locations/ponte-vedra-beach/' },
    ],
  },
  'atlantic-beach': {
    h1: 'Atlantic Beach Pool Builder for Custom Pools & Outdoor Living',
    hero: 'Design a pool, spa or complete outdoor-living environment for an Atlantic Beach home around the property’s layout, coastal setting and intended use.',
    introHeading: 'Give the Atlantic Beach property its own plan.',
    intro: [
      'Atlantic Beach is part of the Jacksonville Beaches, but a beach-area label does not reveal the shape, access or exposure of an individual backyard. Pool location, privacy, shade and circulation should be reviewed against the actual home and lot.',
      'A tailored plan can coordinate pool geometry, spa, sun shelf, decking, outdoor dining and lighting without forcing every home into the same coastal style. Product selections and any property or local review are confirmed for the intended application and address.',
    ],
    cards: [
      { title: 'Find the best pool position', text: 'Compare sunlight, home access, yard dimensions and sight lines before choosing the pool’s shape or orientation.' },
      { title: 'Make room for shade', text: 'Place a pergola, cabana or other shaded area where it supports the way the owners use the yard.' },
      { title: 'Keep transitions practical', text: 'Connect water, dining and circulation with clear paths and a coordinated hardscape palette.' },
      { title: 'Plan for updates as well', text: 'For an existing pool, review surfaces, coping, decking and equipment alongside the desired outdoor-living changes.' },
    ],
    planningHeading: 'Separate coastal inspiration from site requirements.',
    planningText: 'A refined Atlantic Beach design can feel coastal without relying on generic décor. Let the property, architecture and the intended use determine the visual direction.',
    planningItems: [
      'Where the home opens to the yard and how people will reach the pool',
      'Which areas need sun, shade, privacy or a clear view',
      'Any known site, neighborhood or jurisdiction conditions to verify',
    ],
    localReference: {
      label: 'City of Atlantic Beach',
      href: 'https://www.coab.us/',
      context: 'Confirm current city information and the authority that applies to the property address.',
    },
    relatedLocations: [
      { label: 'Jacksonville Beaches pool design', href: '/locations/jacksonville-beaches/' },
      { label: 'Jacksonville Beach pool design', href: '/locations/jacksonville-beach/' },
      { label: 'Neptune Beach pool design', href: '/locations/neptune-beach/' },
    ],
  },
  'jacksonville-beach': {
    h1: 'Jacksonville Beach Pool Builder & Outdoor Living Design',
    hero: 'Cove & Stone plans custom pools, renovations and outdoor-living spaces for Jacksonville Beach properties with the lot and home—not a stock layout—leading the design.',
    introHeading: 'Make every part of the backyard work together.',
    intro: [
      'A Jacksonville Beach project starts with what the property can support: pool footprint, access from the home, privacy, outdoor dining and the location of shade. Lot conditions differ, so even a compact courtyard and a larger backyard call for different design choices.',
      'A pool or renovation can be developed with a spa, sun shelf, pavers or stone, outdoor kitchen, pergola and lighting as one composition. The goal is a clear plan for how the space works as well as how it looks, with site and jurisdiction requirements checked for the address.',
    ],
    cards: [
      { title: 'Use the footprint well', text: 'Balance water, deck area and circulation to suit the lot, whether the project is a compact courtyard or a broader yard.' },
      { title: 'Create privacy intentionally', text: 'Use the home, planting and shade elements to shape comfortable gathering areas where the property allows.' },
      { title: 'Integrate the renovation scope', text: 'Assess existing finishes, coping, decking and equipment with any planned changes to the outdoor rooms.' },
      { title: 'Review evening use', text: 'Coordinate lighting with pool edges, paths and gathering areas as part of the overall design.' },
    ],
    planningHeading: 'Bring the Jacksonville Beach lot into focus.',
    planningText: 'The most useful early decisions are about how the backyard should function. Pool shape and material choices follow from those priorities and the available space.',
    planningItems: [
      'The amount of space needed for swimming versus lounging and dining',
      'The preferred balance of open views, privacy and shade',
      'Any existing pool, hardscape or site condition that should be retained or replaced',
    ],
    localReference: {
      label: 'City of Jacksonville Beach',
      href: 'https://www.jacksonvillebeach.org/',
      context: 'Confirm current city information and the authority that applies to the property address.',
    },
    relatedLocations: [
      { label: 'Jacksonville Beaches pool design', href: '/locations/jacksonville-beaches/' },
      { label: 'Atlantic Beach pool design', href: '/locations/atlantic-beach/' },
      { label: 'Neptune Beach pool design', href: '/locations/neptune-beach/' },
    ],
  },
  'neptune-beach': {
    h1: 'Neptune Beach Pool Builder for Custom Pools & Outdoor Living',
    hero: 'Custom pool and outdoor-living plans for Neptune Beach homes, with privacy, shade, circulation and the scale of the property considered from the start.',
    introHeading: 'A smaller coastal community still needs a property-specific design.',
    intro: [
      'Neptune Beach belongs to the Jacksonville Beaches region, but the dimensions and conditions of each property are different. The design should make a deliberate choice about pool size, usable deck, paths, privacy and the relationship between the house and outdoor rooms.',
      'Cove & Stone can coordinate a custom pool or renovation with a spa, sun shelf, outdoor kitchen, shade and lighting in one clear direction. Material and construction decisions are reviewed for the site and intended application rather than assumed from the city name.',
    ],
    cards: [
      { title: 'Prioritize usable space', text: 'Decide how much room the pool, seating, paths and planting each need before expanding the feature list.' },
      { title: 'Shape private gathering areas', text: 'Consider the home, boundary conditions and shade placement when creating comfortable places to sit or dine.' },
      { title: 'Choose a restrained palette', text: 'Coordinate coping, deck, tile and planting so the outdoor space feels connected rather than visually crowded.' },
      { title: 'Update with a clear scope', text: 'A renovation can combine finish, equipment and surrounding-area decisions when the property supports the work.' },
    ],
    planningHeading: 'Design for the scale and privacy of the lot.',
    planningText: 'Instead of starting with a list of features, define the space available and the few activities the backyard needs to support most.',
    planningItems: [
      'Where there is room for clear circulation around the pool',
      'Which edges need screening, seating or shade',
      'How a proposed kitchen, cabana or fire feature fits the overall footprint',
    ],
    localReference: {
      label: 'City of Neptune Beach',
      href: 'https://www.nbfl.gov/',
      context: 'Confirm current city information and the authority that applies to the property address.',
    },
    relatedLocations: [
      { label: 'Jacksonville Beaches pool design', href: '/locations/jacksonville-beaches/' },
      { label: 'Jacksonville Beach pool design', href: '/locations/jacksonville-beach/' },
      { label: 'Atlantic Beach pool design', href: '/locations/atlantic-beach/' },
    ],
  },
  'queens-harbour': {
    h1: 'Queens Harbour Pool & Outdoor Living Design in Jacksonville',
    hero: 'Waterfront-oriented pool and outdoor-living design guidance for Queens Harbour homes, shaped around the home, available views and the specific property.',
    introHeading: 'Let the harbour setting inform the outdoor room.',
    intro: [
      'Queen’s Harbour’s community association describes a gated Jacksonville setting bounded by water and associated with a spring-fed lagoon and waterfront and marsh views. Those features may be relevant to some properties, but views, lot conditions and water access vary; the design must be based on the individual address.',
      'Pool proportions, spa placement, paths, shade and gathering areas can be composed around the home and the views a site actually offers. Cove & Stone can coordinate those design choices with kitchens, pergolas, materials and lighting; this page does not claim waterfront engineering expertise or completed work in the community.',
    ],
    cards: [
      { title: 'Protect the view where it exists', text: 'Consider sight lines from the home and outdoor rooms without assuming every property has a water view.' },
      { title: 'Connect the living areas', text: 'Plan the pool, spa, seating and paths as a continuous route between the house and outdoor gathering spaces.' },
      { title: 'Use a measured material palette', text: 'Compare stone, porcelain, pavers and turf across the water edge, paths and outdoor rooms.' },
      { title: 'Confirm waterfront conditions', text: 'Any property-specific water, drainage, setback or permitting requirements must be evaluated with the appropriate specialists and authorities.' },
    ],
    planningHeading: 'Keep waterfront context separate from technical assumptions.',
    planningText: 'Queens Harbour’s setting can inspire the design, but it does not establish what is allowed or technically suitable on a particular lot. Confirm the property conditions before fixing the plan.',
    planningItems: [
      'Which views and connections to the house the design should preserve',
      'Whether the lot has water-related, drainage or access conditions to review',
      'Which local or community approvals and specialist input apply to the address',
    ],
    localReference: {
      label: 'Queen’s Harbour community information',
      href: 'https://www.qhycc.com/home/',
      context: 'The association provides community context; it is not a substitute for property-specific surveys, approvals or technical review.',
    },
    relatedLocations: [
      { label: 'Jacksonville pool design', href: '/locations/jacksonville/' },
      { label: 'Jacksonville Beaches pool design', href: '/locations/jacksonville-beaches/' },
      { label: 'Deerwood pool design', href: '/locations/deerwood/' },
    ],
  },
  deerwood: {
    h1: 'Deerwood Jacksonville Pool Builder & Outdoor Living Design',
    hero: 'Pool and outdoor-living plans for Deerwood’s established Jacksonville setting, with proportions, mature landscape and the architecture of each home in view.',
    introHeading: 'Compose the backyard around an established home.',
    intro: [
      'Deerwood is an established Jacksonville residential setting. Each home has its own architecture, landscape and outdoor access, so pool proportions and gathering areas should be based on the individual property rather than assumptions about the neighborhood.',
      'A custom pool or renovation can be coordinated with a spa, outdoor kitchen, pergola, cabana, hardscape and lighting. The design is tailored to the property and does not imply a completed Cove & Stone project or project history in Deerwood.',
    ],
    cards: [
      { title: 'Respect the home’s proportions', text: 'Relate pool geometry, spa placement and outdoor rooms to the architecture rather than treating them as separate additions.' },
      { title: 'Work with existing landscape', text: 'Review retained trees, planting, shade and circulation before deciding where new hardscape belongs.' },
      { title: 'Coordinate a layered palette', text: 'Compare coping, tile, pavers, porcelain, stone and turf as one visual system for the property.' },
      { title: 'Support entertaining without clutter', text: 'Place kitchens, seating and fire features around the pool in a way that keeps paths and views legible.' },
    ],
    planningHeading: 'Make the existing landscape part of the brief.',
    planningText: 'In an established setting, the best plan often begins by identifying what should remain, what needs updating and how the pool area should connect to the home.',
    planningItems: [
      'Landscape, shade and hardscape elements to retain or reconsider',
      'The pool renovation or new-build scope and any known access limitations',
      'How formal or relaxed the outdoor rooms should feel in relation to the house',
    ],
    relatedLocations: [
      { label: 'Jacksonville pool design', href: '/locations/jacksonville/' },
      { label: 'Queens Harbour pool design', href: '/locations/queens-harbour/' },
      { label: 'eTown pool design', href: '/locations/e-town/' },
    ],
  },
  'e-town': {
    h1: 'eTown Jacksonville Pool Builder & Outdoor Living',
    hero: 'Contemporary pool and outdoor-living design for eTown homes, shaped around the home, lot and the community’s thoughtful, connected setting.',
    introHeading: 'Bring clean geometry and practical circulation together.',
    intro: [
      'eTown’s published community information emphasizes thoughtful design, convenience, technology and sustainability, and describes a community-wide commitment to preserve 50% of its land. That context can inform a deliberate backyard plan, but it does not establish requirements or conditions for an individual lot.',
      'A custom pool, spa or renovation can be composed with an outdoor kitchen, pergola, hardscape, planting and lighting. Cove & Stone reviews the complete direction in 3D so the relationship between the home and outdoor areas is visible before construction coordination.',
    ],
    cards: [
      { title: 'Use clear geometry', text: 'Coordinate pool and spa proportions with the home, yard and the way the outdoor area will be used.' },
      { title: 'Make circulation work', text: 'Connect indoor access, pool entry, dining and shade with direct, comfortable routes.' },
      { title: 'Coordinate the whole palette', text: 'Compare porcelain, pavers, natural stone, turf, coping and tile as parts of one contemporary material plan.' },
      { title: 'Plan lighting with the layout', text: 'Consider paths, water, seating and planting together so lighting supports the full backyard plan.' },
    ],
    planningHeading: 'Keep the contemporary look tied to the address.',
    planningText: 'A restrained palette works best when it responds to the home and the site, not just a style reference. Verify any address-specific community review before final selection.',
    planningItems: [
      'The relationship between the house, outdoor doors and pool location',
      'Any relevant community review or property restrictions',
      'How shade, planting and evening use should work in the finished space',
    ],
    localReference: {
      label: 'eTown community information',
      href: 'https://www.etownjax.com/',
      context: 'Review current community resources for neighborhood information, then confirm any requirements that apply to the specific lot.',
    },
    relatedLocations: [
      { label: 'Jacksonville pool design', href: '/locations/jacksonville/' },
      { label: 'Nocatee pool design', href: '/locations/nocatee/' },
      { label: 'Deerwood pool design', href: '/locations/deerwood/' },
    ],
  },
  tamaya: {
    h1: 'Tamaya Jacksonville Pool Builder & Outdoor Living',
    hero: 'Cohesive pool, spa and outdoor-living design for Tamaya homes, with a material and architectural direction suited to the individual property.',
    introHeading: 'Start with the individual home, not a neighborhood-wide style.',
    intro: [
      'Tamaya homes should be considered individually rather than assigned a single architectural style. The home’s actual facade, outdoor access and landscape are the useful references for proportion, material transitions and the relationship between pool and outdoor rooms.',
      'Cove & Stone can coordinate a custom pool or renovation with a spa, sun shelf, pavers, porcelain or stone, kitchen, pergola, fire feature and lighting. The design direction is property-specific and is not a claim of completed work in Tamaya.',
    ],
    cards: [
      { title: 'Align proportions with the home', text: 'Consider rooflines, openings and outdoor access when setting the shape and position of the pool.' },
      { title: 'Balance warm materials', text: 'Compare stone, porcelain, pavers, tile and coping for tone and texture across the backyard.' },
      { title: 'Compose pool and spa together', text: 'Plan a spa, sun shelf and pool edge as a connected architectural element when the site supports it.' },
      { title: 'Extend the living pattern', text: 'Place dining, shade and fire features to support how the household uses the outdoor rooms.' },
    ],
    planningHeading: 'Let the actual home guide proportions and material choices.',
    planningText: 'A cohesive Tamaya design can pick up proportion, material warmth and indoor-outdoor continuity while remaining tailored to the home and its landscape.',
    planningItems: [
      'Which materials already define the home’s exterior and outdoor access',
      'Where a pool, spa or sun shelf best relates to the home',
      'Which community or property requirements need review before material selection',
    ],
    relatedLocations: [
      { label: 'Jacksonville pool design', href: '/locations/jacksonville/' },
      { label: 'eTown pool design', href: '/locations/e-town/' },
      { label: 'St. Johns pool design', href: '/locations/st-johns/' },
    ],
  },
  'julington-creek': {
    h1: 'Julington Creek Pool Builder & Outdoor Living Design',
    hero: 'Plan a custom pool, renovation or outdoor-living space for Julington Creek around the property, the landscape and the activities the backyard should support.',
    introHeading: 'Make everyday use the organizing principle.',
    intro: [
      'The Julington Creek Plantation Community Development District describes more than 100 lakes, 1,200 acres of nature preserve and seven miles of bike and jogging trails. That wider setting can inspire a connection between pool, planting and outdoor rooms, while the specific lot determines what is possible.',
      'A family-focused or multi-use plan can coordinate pool entry, a sun shelf, seating, shade, dining and open circulation. Cove & Stone can also review renovation scope and finishes; this page is design guidance, not a claim of completed work in the community.',
    ],
    cards: [
      { title: 'Create flexible activity zones', text: 'Arrange the pool, shallow lounging, dining and seating around how the household will use the yard.' },
      { title: 'Connect to the landscape', text: 'Plan paths, planting, shade and lighting as part of the pool environment rather than as leftover areas.' },
      { title: 'Choose durable visual transitions', text: 'Use pavers, porcelain, stone, coping and turf to distinguish activity areas while keeping one palette.' },
      { title: 'Review renovation and additions together', text: 'Assess existing surfaces, equipment and layout alongside any kitchen, pergola or lighting changes.' },
    ],
    planningHeading: 'Plan for the way the backyard changes through the day.',
    planningText: 'A flexible layout can support swimming, meals, quiet time and gatherings without asking every square foot to do the same job.',
    planningItems: [
      'Who uses the pool and which areas need the clearest sight lines',
      'Where shade, seating and dining fit around swimming and circulation',
      'What existing landscape, pool or site features should remain part of the plan',
    ],
    localReference: {
      label: 'Julington Creek Plantation CDD community information',
      href: 'https://www.jcpcdd.org/216/About-Julington-Creek-Plantation',
      context: 'The community figures describe the district, not property-level drainage, setback or permitting conditions.',
    },
    relatedLocations: [
      { label: 'St. Johns pool design', href: '/locations/st-johns/' },
      { label: 'Jacksonville pool design', href: '/locations/jacksonville/' },
      { label: 'Nocatee pool design', href: '/locations/nocatee/' },
    ],
  },
};