import { getContent } from "@/content";
import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import FilloutEmbedClient from "./FilloutEmbedClient";

/**
 * The submission form. Only the original form ID is accepted (see lib/config.ts).
 * Korean pages open the SAME form, with the language parameters from
 * NEXT_PUBLIC_FILLOUT_KO_PARAMS once Fillout translations are set up.
 * When no ID is configured, a labelled placeholder appears instead. It has no
 * inputs and cannot submit anything.
 */
export function FilloutEmbed({ locale }: { locale: Locale }) {
  const t = getContent(locale).ui.submit;
  const id = config.filloutFormId;

  if (!id) {
    return (
      <div className="pending px-6 py-12 text-center" data-placeholder="true" data-integration="fillout-missing">
        <p className="slate !text-cinnabar">{t.placeholderTitle}</p>
        <p className="mt-3 text-paper/85">{t.placeholderBody}</p>
      </div>
    );
  }

  const params = locale === "ko" ? config.filloutKoParams ?? undefined : undefined;
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  const languageNote = locale !== "en" && !params ? t.formLanguageNote : null;

  return (
    <div
      className="fillout-host px-6 py-12 text-center sm:px-10 sm:py-16"
      data-integration="fillout"
      data-fillout-form-id={id}
      data-fillout-embed-type="slider"
      data-form-locale={params ? locale : "default"}
      aria-label={t.formRegion}
      role="region"
    >
      <p className="slate">{t.formSlate}</p>
      <p className="mx-auto mt-4 mb-8 max-w-md text-paper/85">{t.formIntro}</p>
      {languageNote ? <p className="mx-auto -mt-4 mb-8 max-w-md text-sm text-celadon" data-form-language-note="true">{languageNote}</p> : null}
      <FilloutEmbedClient formId={id} label={t.formButton} parameters={params} />
      <noscript>
        <p className="p-6">
          {t.noscript}{" "}
          <a className="text-link" href={`https://forms.fillout.com/t/${id}${query}`}>
            {t.openDirect}
          </a>
        </p>
      </noscript>
    </div>
  );
}
