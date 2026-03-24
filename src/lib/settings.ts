import { prisma } from "@/lib/db";

export type PublicSettings = {
  platformName: string;
  logo: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  siteTitle: string | null;
  siteDescription: string | null;
  siteKeywords: string | null;
  adsEnabled: boolean;
  currency: string;
};

export type AdminSettings = PublicSettings & {
  id: string;
};

const DEFAULT_PUBLIC_SETTINGS: PublicSettings = {
  platformName: "يلا بلاي",
  logo: null,
  primaryColor: null,
  secondaryColor: null,
  siteTitle: null,
  siteDescription: null,
  siteKeywords: null,
  adsEnabled: true,
  currency: "JOD",
};

function toPublicSettings(dbSetting: {
  siteName: string;
  logo: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  siteKeywords: string | null;
  adsEnabled: boolean;
  currency?: string;
}): PublicSettings {
  return {
    ...DEFAULT_PUBLIC_SETTINGS,
    platformName: dbSetting.siteName || DEFAULT_PUBLIC_SETTINGS.platformName,
    logo: dbSetting.logo,
    primaryColor: dbSetting.primaryColor,
    secondaryColor: dbSetting.secondaryColor,
    siteTitle: dbSetting.seoTitle,
    siteDescription: dbSetting.seoDescription,
    siteKeywords: dbSetting.siteKeywords,
    adsEnabled: dbSetting.adsEnabled,
    currency: dbSetting.currency || DEFAULT_PUBLIC_SETTINGS.currency,
  };
}

export async function getSettings(): Promise<PublicSettings> {
  try {
    let settings = null;
    try {
      settings = await prisma.setting.findFirst();
    } catch (e) {
      console.warn("Could not fetch settings from database, using defaults.");
    }

    if (!settings) {
      try {
        // Try creating it if not during build/unreachable
        settings = await prisma.setting.create({
          data: {
            siteName: DEFAULT_PUBLIC_SETTINGS.platformName,
            logo: DEFAULT_PUBLIC_SETTINGS.logo,
            primaryColor: DEFAULT_PUBLIC_SETTINGS.primaryColor,
            secondaryColor: DEFAULT_PUBLIC_SETTINGS.secondaryColor,
            seoTitle: DEFAULT_PUBLIC_SETTINGS.siteTitle,
            seoDescription: DEFAULT_PUBLIC_SETTINGS.siteDescription,
            siteKeywords: DEFAULT_PUBLIC_SETTINGS.siteKeywords,
            adsEnabled: DEFAULT_PUBLIC_SETTINGS.adsEnabled,
            currency: DEFAULT_PUBLIC_SETTINGS.currency,
          },
        });
      } catch (e) {
        // Just return defaults if create fails
        return DEFAULT_PUBLIC_SETTINGS;
      }
    }

    return toPublicSettings(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return DEFAULT_PUBLIC_SETTINGS;
  }
}

export async function getAdminSettings(): Promise<AdminSettings> {
  const dbSetting = await prisma.setting.findFirst();
  if (!dbSetting) {
    const defaults = await getSettings();
    return { id: "default-settings", ...defaults };
  }
  return { id: dbSetting.id, ...toPublicSettings(dbSetting) };
}

export async function updateAdminSettings(
  payload: Partial<AdminSettings>
): Promise<AdminSettings> {
  const current = await prisma.setting.findFirst();
  const siteName = String(payload.platformName || current?.siteName || "يلا بلاي");
  const logo =
    payload.logo === undefined ? current?.logo || null : payload.logo || null;
  const primaryColor =
    payload.primaryColor === undefined
      ? current?.primaryColor || null
      : payload.primaryColor || null;
  const secondaryColor =
    payload.secondaryColor === undefined
      ? current?.secondaryColor || null
      : payload.secondaryColor || null;
  const seoTitle =
    payload.siteTitle === undefined ? current?.seoTitle || null : payload.siteTitle;
  const seoDescription =
    payload.siteDescription === undefined
      ? current?.seoDescription || null
      : payload.siteDescription;
  const siteKeywords =
    payload.siteKeywords === undefined ? current?.siteKeywords || null : payload.siteKeywords;
  const adsEnabled =
    payload.adsEnabled === undefined ? current?.adsEnabled ?? true : payload.adsEnabled;
  const currency = String(payload.currency || current?.currency || "JOD");

  let dbSetting = current;
  if (!dbSetting) {
    dbSetting = await prisma.setting.create({
      data: {
        siteName,
        logo,
        primaryColor,
        secondaryColor,
        seoTitle,
        seoDescription,
        adsEnabled,
        currency,
        siteKeywords,
      },
    });
  } else {
    dbSetting = await prisma.setting.update({
      where: { id: dbSetting.id },
      data: {
        siteName,
        logo,
        primaryColor,
        secondaryColor,
        seoTitle,
        seoDescription,
        adsEnabled,
        currency,
        siteKeywords,
      },
    });
  }

  return {
    id: dbSetting.id,
    platformName: siteName,
    logo,
    primaryColor,
    secondaryColor,
    siteTitle: seoTitle,
    siteDescription: seoDescription,
    siteKeywords,
    adsEnabled,
    currency,
  };
}
