import { prisma } from "@/lib/db";

export type PublicSettings = {
  platformName: string;
  logo: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  siteTitle: string | null;
  siteDescription: string | null;
  adsEnabled: boolean;
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
  adsEnabled: true,
};

function toPublicSettings(dbSetting: {
  siteName: string;
  logo: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  adsEnabled: boolean;
}): PublicSettings {
  return {
    ...DEFAULT_PUBLIC_SETTINGS,
    platformName: dbSetting.siteName || DEFAULT_PUBLIC_SETTINGS.platformName,
    logo: dbSetting.logo,
    primaryColor: dbSetting.primaryColor,
    secondaryColor: dbSetting.secondaryColor,
    siteTitle: dbSetting.seoTitle,
    siteDescription: dbSetting.seoDescription,
    adsEnabled: dbSetting.adsEnabled,
  };
}

export async function getSettings() {
  try {
    let settings = await prisma.setting.findFirst();

    if (!settings) {
      settings = await prisma.setting.create({
        data: {
          siteName: DEFAULT_PUBLIC_SETTINGS.platformName,
          logo: DEFAULT_PUBLIC_SETTINGS.logo,
          primaryColor: DEFAULT_PUBLIC_SETTINGS.primaryColor,
          secondaryColor: DEFAULT_PUBLIC_SETTINGS.secondaryColor,
          seoTitle: DEFAULT_PUBLIC_SETTINGS.siteTitle,
          seoDescription: DEFAULT_PUBLIC_SETTINGS.siteDescription,
          adsEnabled: DEFAULT_PUBLIC_SETTINGS.adsEnabled,
        },
      });
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
  const adsEnabled =
    payload.adsEnabled === undefined ? current?.adsEnabled ?? true : payload.adsEnabled;

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
    adsEnabled,
  };
}
