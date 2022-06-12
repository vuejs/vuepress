/**
 * ISO Language Code
 *
 * @see http://www.lingoes.net/en/translator/langcode.htm
 * @code
 *
 *    const codes = document.querySelectorAll('td:first-child')
 *    const texts = document.querySelectorAll('td:last-child')
 *    console.log([...codes].map((code, index)=>{
 *        const text = texts[index];
 *        return `\n/* ${text.innerHTML} *\/\n| '${code.innerHTML}'\n`
 *    }).join('\n'))
 */
export type Lang =
  /* Afrikaans */
  | 'af'

  /* Afrikaans (South Africa) */
  | 'af-ZA'

  /* Arabic */
  | 'ar'

  /* Arabic (U.A.E.) */
  | 'ar-AE'

  /* Arabic (Bahrain) */
  | 'ar-BH'

  /* Arabic (Algeria) */
  | 'ar-DZ'

  /* Arabic (Egypt) */
  | 'ar-EG'

  /* Arabic (Iraq) */
  | 'ar-IQ'

  /* Arabic (Jordan) */
  | 'ar-JO'

  /* Arabic (Kuwait) */
  | 'ar-KW'

  /* Arabic (Lebanon) */
  | 'ar-LB'

  /* Arabic (Libya) */
  | 'ar-LY'

  /* Arabic (Morocco) */
  | 'ar-MA'

  /* Arabic (Oman) */
  | 'ar-OM'

  /* Arabic (Qatar) */
  | 'ar-QA'

  /* Arabic (Saudi Arabia) */
  | 'ar-SA'

  /* Arabic (Syria) */
  | 'ar-SY'

  /* Arabic (Tunisia) */
  | 'ar-TN'

  /* Arabic (Yemen) */
  | 'ar-YE'

  /* Azeri (Latin) */
  | 'az'

  /* Azeri (Latin) (Azerbaijan) */
  | 'az-AZ'

  /* Azeri (Cyrillic) (Azerbaijan) */
  | 'az-AZ'

  /* Belarusian */
  | 'be'

  /* Belarusian (Belarus) */
  | 'be-BY'

  /* Bulgarian */
  | 'bg'

  /* Bulgarian (Bulgaria) */
  | 'bg-BG'

  /* Bosnian (Bosnia and Herzegovina) */
  | 'bs-BA'

  /* Catalan */
  | 'ca'

  /* Catalan (Spain) */
  | 'ca-ES'

  /* Czech */
  | 'cs'

  /* Czech (Czech Republic) */
  | 'cs-CZ'

  /* Welsh */
  | 'cy'

  /* Welsh (United Kingdom) */
  | 'cy-GB'

  /* Danish */
  | 'da'

  /* Danish (Denmark) */
  | 'da-DK'

  /* German */
  | 'de'

  /* German (Austria) */
  | 'de-AT'

  /* German (Switzerland) */
  | 'de-CH'

  /* German (Germany) */
  | 'de-DE'

  /* German (Liechtenstein) */
  | 'de-LI'

  /* German (Luxembourg) */
  | 'de-LU'

  /* Divehi */
  | 'dv'

  /* Divehi (Maldives) */
  | 'dv-MV'

  /* Greek */
  | 'el'

  /* Greek (Greece) */
  | 'el-GR'

  /* English */
  | 'en'

  /* English (Australia) */
  | 'en-AU'

  /* English (Belize) */
  | 'en-BZ'

  /* English (Canada) */
  | 'en-CA'

  /* English (Caribbean) */
  | 'en-CB'

  /* English (United Kingdom) */
  | 'en-GB'

  /* English (Ireland) */
  | 'en-IE'

  /* English (Jamaica) */
  | 'en-JM'

  /* English (New Zealand) */
  | 'en-NZ'

  /* English (Republic of the Philippines) */
  | 'en-PH'

  /* English (Trinidad and Tobago) */
  | 'en-TT'

  /* English (United States) */
  | 'en-US'

  /* English (South Africa) */
  | 'en-ZA'

  /* English (Zimbabwe) */
  | 'en-ZW'

  /* Esperanto */
  | 'eo'

  /* Spanish */
  | 'es'

  /* Spanish (Argentina) */
  | 'es-AR'

  /* Spanish (Bolivia) */
  | 'es-BO'

  /* Spanish (Chile) */
  | 'es-CL'

  /* Spanish (Colombia) */
  | 'es-CO'

  /* Spanish (Costa Rica) */
  | 'es-CR'

  /* Spanish (Dominican Republic) */
  | 'es-DO'

  /* Spanish (Ecuador) */
  | 'es-EC'

  /* Spanish (Castilian) */
  | 'es-ES'

  /* Spanish (Spain) */
  | 'es-ES'

  /* Spanish (Guatemala) */
  | 'es-GT'

  /* Spanish (Honduras) */
  | 'es-HN'

  /* Spanish (Mexico) */
  | 'es-MX'

  /* Spanish (Nicaragua) */
  | 'es-NI'

  /* Spanish (Panama) */
  | 'es-PA'

  /* Spanish (Peru) */
  | 'es-PE'

  /* Spanish (Puerto Rico) */
  | 'es-PR'

  /* Spanish (Paraguay) */
  | 'es-PY'

  /* Spanish (El Salvador) */
  | 'es-SV'

  /* Spanish (Uruguay) */
  | 'es-UY'

  /* Spanish (Venezuela) */
  | 'es-VE'

  /* Estonian */
  | 'et'

  /* Estonian (Estonia) */
  | 'et-EE'

  /* Basque */
  | 'eu'

  /* Basque (Spain) */
  | 'eu-ES'

  /* Farsi */
  | 'fa'

  /* Farsi (Iran) */
  | 'fa-IR'

  /* Finnish */
  | 'fi'

  /* Finnish (Finland) */
  | 'fi-FI'

  /* Faroese */
  | 'fo'

  /* Faroese (Faroe Islands) */
  | 'fo-FO'

  /* French */
  | 'fr'

  /* French (Belgium) */
  | 'fr-BE'

  /* French (Canada) */
  | 'fr-CA'

  /* French (Switzerland) */
  | 'fr-CH'

  /* French (France) */
  | 'fr-FR'

  /* French (Luxembourg) */
  | 'fr-LU'

  /* French (Principality of Monaco) */
  | 'fr-MC'

  /* Galician */
  | 'gl'

  /* Galician (Spain) */
  | 'gl-ES'

  /* Gujarati */
  | 'gu'

  /* Gujarati (India) */
  | 'gu-IN'

  /* Hebrew */
  | 'he'

  /* Hebrew (Israel) */
  | 'he-IL'

  /* Hindi */
  | 'hi'

  /* Hindi (India) */
  | 'hi-IN'

  /* Croatian */
  | 'hr'

  /* Croatian (Bosnia and Herzegovina) */
  | 'hr-BA'

  /* Croatian (Croatia) */
  | 'hr-HR'

  /* Hungarian */
  | 'hu'

  /* Hungarian (Hungary) */
  | 'hu-HU'

  /* Armenian */
  | 'hy'

  /* Armenian (Armenia) */
  | 'hy-AM'

  /* Indonesian */
  | 'id'

  /* Indonesian (Indonesia) */
  | 'id-ID'

  /* Icelandic */
  | 'is'

  /* Icelandic (Iceland) */
  | 'is-IS'

  /* Italian */
  | 'it'

  /* Italian (Switzerland) */
  | 'it-CH'

  /* Italian (Italy) */
  | 'it-IT'

  /* Japanese */
  | 'ja'

  /* Japanese (Japan) */
  | 'ja-JP'

  /* Georgian */
  | 'ka'

  /* Georgian (Georgia) */
  | 'ka-GE'

  /* Kazakh */
  | 'kk'

  /* Kazakh (Kazakhstan) */
  | 'kk-KZ'

  /* Kannada */
  | 'kn'

  /* Kannada (India) */
  | 'kn-IN'

  /* Korean */
  | 'ko'

  /* Korean (Korea) */
  | 'ko-KR'

  /* Konkani */
  | 'kok'

  /* Konkani (India) */
  | 'kok-IN'

  /* Kyrgyz */
  | 'ky'

  /* Kyrgyz (Kyrgyzstan) */
  | 'ky-KG'

  /* Lithuanian */
  | 'lt'

  /* Lithuanian (Lithuania) */
  | 'lt-LT'

  /* Latvian */
  | 'lv'

  /* Latvian (Latvia) */
  | 'lv-LV'

  /* Maori */
  | 'mi'

  /* Maori (New Zealand) */
  | 'mi-NZ'

  /* FYRO Macedonian */
  | 'mk'

  /* FYRO Macedonian (Former Yugoslav Republic of Macedonia) */
  | 'mk-MK'

  /* Mongolian */
  | 'mn'

  /* Mongolian (Mongolia) */
  | 'mn-MN'

  /* Marathi */
  | 'mr'

  /* Marathi (India) */
  | 'mr-IN'

  /* Malay */
  | 'ms'

  /* Malay (Brunei Darussalam) */
  | 'ms-BN'

  /* Malay (Malaysia) */
  | 'ms-MY'

  /* Maltese */
  | 'mt'

  /* Maltese (Malta) */
  | 'mt-MT'

  /* Norwegian (Bokm?l) */
  | 'nb'

  /* Norwegian (Bokm?l) (Norway) */
  | 'nb-NO'

  /* Dutch */
  | 'nl'

  /* Dutch (Belgium) */
  | 'nl-BE'

  /* Dutch (Netherlands) */
  | 'nl-NL'

  /* Norwegian (Nynorsk) (Norway) */
  | 'nn-NO'

  /* Northern Sotho */
  | 'ns'

  /* Northern Sotho (South Africa) */
  | 'ns-ZA'

  /* Punjabi */
  | 'pa'

  /* Punjabi (India) */
  | 'pa-IN'

  /* Polish */
  | 'pl'

  /* Polish (Poland) */
  | 'pl-PL'

  /* Pashto */
  | 'ps'

  /* Pashto (Afghanistan) */
  | 'ps-AR'

  /* Portuguese */
  | 'pt'

  /* Portuguese (Brazil) */
  | 'pt-BR'

  /* Portuguese (Portugal) */
  | 'pt-PT'

  /* Quechua */
  | 'qu'

  /* Quechua (Bolivia) */
  | 'qu-BO'

  /* Quechua (Ecuador) */
  | 'qu-EC'

  /* Quechua (Peru) */
  | 'qu-PE'

  /* Romanian */
  | 'ro'

  /* Romanian (Romania) */
  | 'ro-RO'

  /* Russian */
  | 'ru'

  /* Russian (Russia) */
  | 'ru-RU'

  /* Sanskrit */
  | 'sa'

  /* Sanskrit (India) */
  | 'sa-IN'

  /* Sami (Northern) */
  | 'se'

  /* Sami (Northern) (Finland) */
  | 'se-FI'

  /* Sami (Skolt) (Finland) */
  | 'se-FI'

  /* Sami (Inari) (Finland) */
  | 'se-FI'

  /* Sami (Northern) (Norway) */
  | 'se-NO'

  /* Sami (Lule) (Norway) */
  | 'se-NO'

  /* Sami (Southern) (Norway) */
  | 'se-NO'

  /* Sami (Northern) (Sweden) */
  | 'se-SE'

  /* Sami (Lule) (Sweden) */
  | 'se-SE'

  /* Sami (Southern) (Sweden) */
  | 'se-SE'

  /* Slovak */
  | 'sk'

  /* Slovak (Slovakia) */
  | 'sk-SK'

  /* Slovenian */
  | 'sl'

  /* Slovenian (Slovenia) */
  | 'sl-SI'

  /* Albanian */
  | 'sq'

  /* Albanian (Albania) */
  | 'sq-AL'

  /* Serbian (Latin) (Bosnia and Herzegovina) */
  | 'sr-BA'

  /* Serbian (Cyrillic) (Bosnia and Herzegovina) */
  | 'sr-BA'

  /* Serbian (Latin) (Serbia and Montenegro) */
  | 'sr-SP'

  /* Serbian (Cyrillic) (Serbia and Montenegro) */
  | 'sr-SP'

  /* Swedish */
  | 'sv'

  /* Swedish (Finland) */
  | 'sv-FI'

  /* Swedish (Sweden) */
  | 'sv-SE'

  /* Swahili */
  | 'sw'

  /* Swahili (Kenya) */
  | 'sw-KE'

  /* Syriac */
  | 'syr'

  /* Syriac (Syria) */
  | 'syr-SY'

  /* Tamil */
  | 'ta'

  /* Tamil (India) */
  | 'ta-IN'

  /* Telugu */
  | 'te'

  /* Telugu (India) */
  | 'te-IN'

  /* Thai */
  | 'th'

  /* Thai (Thailand) */
  | 'th-TH'

  /* Tagalog */
  | 'tl'

  /* Tagalog (Philippines) */
  | 'tl-PH'

  /* Tswana */
  | 'tn'

  /* Tswana (South Africa) */
  | 'tn-ZA'

  /* Turkish */
  | 'tr'

  /* Turkish (Turkey) */
  | 'tr-TR'

  /* Tatar */
  | 'tt'

  /* Tatar (Russia) */
  | 'tt-RU'

  /* Tsonga */
  | 'ts'

  /* Ukrainian */
  | 'uk'

  /* Ukrainian (Ukraine) */
  | 'uk-UA'

  /* Urdu */
  | 'ur'

  /* Urdu (Islamic Republic of Pakistan) */
  | 'ur-PK'

  /* Uzbek (Latin) */
  | 'uz'

  /* Uzbek (Latin) (Uzbekistan) */
  | 'uz-UZ'

  /* Uzbek (Cyrillic) (Uzbekistan) */
  | 'uz-UZ'

  /* Vietnamese */
  | 'vi'

  /* Vietnamese (Viet Nam) */
  | 'vi-VN'

  /* Xhosa */
  | 'xh'

  /* Xhosa (South Africa) */
  | 'xh-ZA'

  /* Chinese */
  | 'zh'

  /* Chinese (S) */
  | 'zh-CN'

  /* Chinese (Hong Kong) */
  | 'zh-HK'

  /* Chinese (Macau) */
  | 'zh-MO'

  /* Chinese (Singapore) */
  | 'zh-SG'

  /* Chinese (T) */
  | 'zh-TW'

  /* Zulu */
  | 'zu'

  /* Zulu (South Africa) */
  | 'zu-ZA';
