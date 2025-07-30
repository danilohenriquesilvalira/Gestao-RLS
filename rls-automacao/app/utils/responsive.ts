// utils/responsive.ts
export const RESPONSIVE_CONTAINERS = {
  // Container principal das páginas
  main: `
    min-h-screen w-full max-w-full overflow-x-hidden
    px-page-sm py-page-sm
    sm:px-page-md sm:py-page-md
    lg:px-page-lg lg:py-page-lg
    compactDesktop:px-page-compact compactDesktop:py-page-compact
    midDesktop:px-page-mid midDesktop:py-page-mid
    customXl:px-page-xl customXl:py-page-xl
  `,
  
  // Container de conteúdo com max-width
  content: `
    w-full max-w-screen-sm mx-auto
    sm:max-w-screen-md
    md:max-w-screen-lg
    lg:max-w-screen-xl
    compactDesktop:max-w-screen-compact
    midDesktop:max-w-screen-mid
    customXl:max-w-screen-custom
  `,
  
  // Espaçamento entre seções
  sectionSpacing: `
    space-y-4
    sm:space-y-5
    lg:space-y-6
    compactDesktop:space-y-5
    midDesktop:space-y-6
    customXl:space-y-8
  `,
  
  // Grid responsivo para cards
  cardGrid: `
    grid grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    compactDesktop:grid-cols-3
    midDesktop:grid-cols-4
    customXl:grid-cols-4
    gap-4
    sm:gap-5
    compactDesktop:gap-4
    midDesktop:gap-5
    customXl:gap-6
  `,
  
  // Grid para stats
  statsGrid: `
    grid grid-cols-1
    xs:grid-cols-2
    lg:grid-cols-4
    gap-3
    sm:gap-4
    compactDesktop:gap-3
    midDesktop:gap-4
    customXl:gap-6
  `,
  
  // Padding para cards
  cardPadding: `
    p-4
    sm:p-5
    compactDesktop:p-4
    midDesktop:p-5
    customXl:p-6
  `,
  
  // Texto responsivo
  textSizes: {
    title: `
      text-xl font-bold
      sm:text-2xl
      lg:text-3xl
      compactDesktop:text-2xl
      midDesktop:text-3xl
      customXl:text-4xl
    `,
    subtitle: `
      text-sm
      sm:text-base
      compactDesktop:text-sm
      midDesktop:text-base
      customXl:text-lg
    `,
    body: `
      text-sm
      compactDesktop:text-sm
      midDesktop:text-base
      customXl:text-base
    `,
    caption: `
      text-xs
      compactDesktop:text-xs
      midDesktop:text-sm
      customXl:text-sm
    `
  }
};