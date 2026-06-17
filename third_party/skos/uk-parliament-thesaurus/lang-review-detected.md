# UK Parliament Thesaurus — language-DETECTION review (no character clues)

_Generated 2026-06-17; complements `lang-review.md` (diacritics/non-ASCII). A statistical detector (lingua; English + fr/de/es/it/pt/nl/cy/ga/la for short-text accuracy) classifies each prefLabel; labels whose top language is NOT English with confidence >=0.55 are listed._

**Caveats:** short labels and foreign **proper nouns** (people/place/org names) are inherently noisy for language ID; a lone foreign surname reads as that language yet stays `@en` in an English thesaurus. Strongest genuine signals are **multi-word, high-confidence** rows. Policy unchanged: default English; mixed->English; retag only confirmed non-English *phrases* via LANG_OVERRIDE.

- prefLabels scanned: **130,178**  ·  detected non-English (>=0.55): **4365**  ·  of those **ASCII-only** (invisible to the diacritic scan): **3940**
- all non-English by language: Welsh 1324, Latin 776, French 550, German 448, Dutch 379, Italian 326, Irish 251, Spanish 182, Portuguese 129
- ASCII-only non-English by language: Welsh 1317, Latin 776, French 397, Dutch 377, German 356, Italian 323, Irish 220, Portuguese 94, Spanish 80

## ASCII-only non-English detections (the new finds, sorted by confidence)

| label | detected | conf | words | term |
|---|---|--:|--:|---|
| [Ymddiriedolaeth FAW](https://lda.data.parliament.uk/terms/100916) | Welsh | 1.0 | 2 | `100916` |
| [Ysbyty Gwynedd](https://lda.data.parliament.uk/terms/10579) | Welsh | 1.0 | 2 | `10579` |
| [Meirionnydd](https://lda.data.parliament.uk/terms/11601) | Welsh | 1.0 | 1 | `11601` |
| [Trawsfynydd power station](https://lda.data.parliament.uk/terms/13359) | Welsh | 1.0 | 3 | `13359` |
| [Arbeitsgemeinschaft der Verbraucherverbande](https://lda.data.parliament.uk/terms/1675) | German | 1.0 | 3 | `1675` |
| [Canolfan Iaith Clwyd](https://lda.data.parliament.uk/terms/18810) | Welsh | 1.0 | 3 | `18810` |
| [Cymdeithas Ysgolion Dros Addysg Gymraeg](https://lda.data.parliament.uk/terms/28145) | Welsh | 1.0 | 5 | `28145` |
| [Eisteddfod yr Urdd](https://lda.data.parliament.uk/terms/285629) | Welsh | 1.0 | 3 | `285629` |
| [Mudiad Amddiffyn Cymru](https://lda.data.parliament.uk/terms/290229) | Welsh | 1.0 | 3 | `290229` |
| [Dyddiol Cyf](https://lda.data.parliament.uk/terms/29678) | Welsh | 1.0 | 2 | `29678` |
| [Llwyd, Elfyn](https://lda.data.parliament.uk/terms/301949) | Welsh | 1.0 | 2 | `301949` |
| [CWMRGC](https://lda.data.parliament.uk/terms/308862) | Welsh | 1.0 | 1 | `308862` |
| [Cyfanfyd](https://lda.data.parliament.uk/terms/346333) | Welsh | 1.0 | 1 | `346333` |
| [Foras Aiseanna Saothair](https://lda.data.parliament.uk/terms/34694) | Irish | 1.0 | 3 | `34694` |
| [Grwp Ynn'ir Gorllewin](https://lda.data.parliament.uk/terms/35220) | Welsh | 1.0 | 3 | `35220` |
| [Gerling-Konzern Speziale Kreditversicherungs](https://lda.data.parliament.uk/terms/36418) | German | 1.0 | 3 | `36418` |
| [Golwg](https://lda.data.parliament.uk/terms/36748) | Welsh | 1.0 | 1 | `36748` |
| [Elfyn Llwyd](https://lda.data.parliament.uk/terms/401962) | Welsh | 1.0 | 2 | `401962` |
| [Bundesaufsichtsamt fur das Kreditwesen](https://lda.data.parliament.uk/terms/426549) | German | 1.0 | 4 | `426549` |
| [Ysbyty Brenhinol Caerdydd](https://lda.data.parliament.uk/terms/431979) | Welsh | 1.0 | 3 | `431979` |
| [Awdurdod Cyllid Cymru](https://lda.data.parliament.uk/terms/433083) | Welsh | 1.0 | 3 | `433083` |
| [Cymdeithas Atal Dinistr Niwclear Oesol](https://lda.data.parliament.uk/terms/436840) | Welsh | 1.0 | 5 | `436840` |
| [Mudiad Gweriniaethol Cymru](https://lda.data.parliament.uk/terms/44347) | Welsh | 1.0 | 3 | `44347` |
| [Comhairle nan Leabhraichean](https://lda.data.parliament.uk/terms/452443) | Irish | 1.0 | 3 | `452443` |
| [Meirionnydd College Gwynedd](https://lda.data.parliament.uk/terms/45329) | Welsh | 1.0 | 3 | `45329` |
| [Ananna](https://lda.data.parliament.uk/terms/477571) | Irish | 1.0 | 1 | `477571` |
| [Rheilffordd Llyn Tegid](https://lda.data.parliament.uk/terms/499422) | Welsh | 1.0 | 3 | `499422` |
| [An Ciste Infheistiochta Gaeilge](https://lda.data.parliament.uk/terms/500643) | Irish | 1.0 | 4 | `500643` |
| [Afonydd Cymru](https://lda.data.parliament.uk/terms/512362) | Welsh | 1.0 | 2 | `512362` |
| [Llyn Efyrnwy](https://lda.data.parliament.uk/terms/515944) | Welsh | 1.0 | 2 | `515944` |
| [Hafren Dyfrdwy](https://lda.data.parliament.uk/terms/521377) | Welsh | 1.0 | 2 | `521377` |
| [Ysgol Gymraeg Llundain](https://lda.data.parliament.uk/terms/53615) | Welsh | 1.0 | 3 | `53615` |
| [Arolygiaeth Gofal Iechyd Cymru](https://lda.data.parliament.uk/terms/53714) | Welsh | 1.0 | 4 | `53714` |
| [Arolygiaeth Gwasanaethau Cymdeithasol Cymru](https://lda.data.parliament.uk/terms/53715) | Welsh | 1.0 | 4 | `53715` |
| [Awdurdod Heddlu Gogledd Cymru](https://lda.data.parliament.uk/terms/53928) | Welsh | 1.0 | 4 | `53928` |
| [Awdurdod Heddlu Gwent](https://lda.data.parliament.uk/terms/53929) | Welsh | 1.0 | 3 | `53929` |
| [Awdurdod Ydau Cartref](https://lda.data.parliament.uk/terms/53932) | Welsh | 1.0 | 3 | `53932` |
| [Awtistiaeth Cymru](https://lda.data.parliament.uk/terms/53949) | Welsh | 1.0 | 2 | `53949` |
| [Big Pit Amgueddfa Lofaol Cymru](https://lda.data.parliament.uk/terms/54260) | Welsh | 1.0 | 5 | `54260` |
| [Amgueddfa Genedlaethol Cymru](https://lda.data.parliament.uk/terms/54596) | Welsh | 1.0 | 3 | `54596` |
| [Amgueddfa Genedlaethol y Glannau](https://lda.data.parliament.uk/terms/54597) | Welsh | 1.0 | 4 | `54597` |
| [Awdurdod Heddlu De Cymru](https://lda.data.parliament.uk/terms/54722) | Welsh | 1.0 | 4 | `54722` |
| [Bundesregierung](https://lda.data.parliament.uk/terms/55186) | German | 1.0 | 1 | `55186` |
| [Y Brifysgol Agored yng Nghymru](https://lda.data.parliament.uk/terms/562962) | Welsh | 1.0 | 5 | `562962` |
| [Nederlandsche Credietverzekering Maatschappij](https://lda.data.parliament.uk/terms/58051) | Dutch | 1.0 | 3 | `58051` |
| [Oglaigh na hEireann](https://lda.data.parliament.uk/terms/60353) | Irish | 1.0 | 3 | `60353` |
| [Rhieni Dros Addysg Gymraeg](https://lda.data.parliament.uk/terms/66567) | Welsh | 1.0 | 4 | `66567` |
| [Rhwydwaith Gweithredu Lleol Sir Benfro er Menter a Datblygu](https://lda.data.parliament.uk/terms/66588) | Welsh | 1.0 | 9 | `66588` |
| [Busnes Rhyngwladol Cymru](https://lda.data.parliament.uk/terms/73757) | Welsh | 1.0 | 3 | `73757` |
| [Bwrdd Criced Cymru a Lloegr](https://lda.data.parliament.uk/terms/73780) | Welsh | 1.0 | 5 | `73780` |
| [Bwrdd Yr Iaith Gymraeg](https://lda.data.parliament.uk/terms/73803) | Welsh | 1.0 | 4 | `73803` |
| [Canolfan Iechyd Cymru](https://lda.data.parliament.uk/terms/73917) | Welsh | 1.0 | 3 | `73917` |
| [Coleg Nyrsio Brenhinol Cymru](https://lda.data.parliament.uk/terms/74581) | Welsh | 1.0 | 4 | `74581` |
| [Comhairle Na Gaelscolaiochta](https://lda.data.parliament.uk/terms/74605) | Irish | 1.0 | 3 | `74605` |
| [Comisiwn Annibynnol ar Ariannu a Chyllid i Gymru](https://lda.data.parliament.uk/terms/74609) | Welsh | 1.0 | 8 | `74609` |
| [Comisiwn Cynulliad Cenedlaethol Cymru](https://lda.data.parliament.uk/terms/74611) | Welsh | 1.0 | 4 | `74611` |
| [Comisiynydd Plant Cymru](https://lda.data.parliament.uk/terms/74615) | Welsh | 1.0 | 3 | `74615` |
| [Comisiynydd Pobl Hyn Cymru](https://lda.data.parliament.uk/terms/74616) | Welsh | 1.0 | 4 | `74616` |
| [Consortiwm Cludiant Integredig De-orllewin Cymru](https://lda.data.parliament.uk/terms/74782) | Welsh | 1.0 | 5 | `74782` |
| [Cymdeithas Arlunwyr a Dylunwyr Cymru](https://lda.data.parliament.uk/terms/75117) | Welsh | 1.0 | 5 | `75117` |
| [Cymdeithas Owain Lawgoch](https://lda.data.parliament.uk/terms/75122) | Welsh | 1.0 | 3 | `75122` |
| [Cymdeithas yr Iaith Gymraeg](https://lda.data.parliament.uk/terms/75124) | Welsh | 1.0 | 4 | `75124` |
| [Cynghrair Drafnidiaeth De-ddwyrain Cymru](https://lda.data.parliament.uk/terms/75126) | Welsh | 1.0 | 4 | `75126` |
| [Cyngor Celfyddydau Cymru](https://lda.data.parliament.uk/terms/75129) | Welsh | 1.0 | 3 | `75129` |
| [Cyngor Defnyddwyr Cymru](https://lda.data.parliament.uk/terms/75131) | Welsh | 1.0 | 3 | `75131` |
| [Cyngor Ffoaduriaid Cymru](https://lda.data.parliament.uk/terms/75132) | Welsh | 1.0 | 3 | `75132` |
| [Cyngor Gemau'r Gymanwlad Cymru](https://lda.data.parliament.uk/terms/75133) | Welsh | 1.0 | 4 | `75133` |
| [Cynhalwyr Cymru](https://lda.data.parliament.uk/terms/75137) | Welsh | 1.0 | 2 | `75137` |
| [Cynulliad Cenedlaethol Cymru](https://lda.data.parliament.uk/terms/75138) | Welsh | 1.0 | 3 | `75138` |
| [Freiheitlichen](https://lda.data.parliament.uk/terms/75973) | German | 1.0 | 1 | `75973` |
| [Gardd Fotaneg Genedlaethol Cymru](https://lda.data.parliament.uk/terms/76066) | Welsh | 1.0 | 4 | `76066` |
| [German Bundesregierung](https://lda.data.parliament.uk/terms/76122) | German | 1.0 | 2 | `76122` |
| [Gwasanaeth Tan ac Achub Gogledd Cymru](https://lda.data.parliament.uk/terms/76384) | Welsh | 1.0 | 6 | `76384` |
| [Gweinidog dros Blant Addysg Dysgu Gydol Oes a Sgiliau](https://lda.data.parliament.uk/terms/76387) | Welsh | 1.0 | 9 | `76387` |
| [Heddlu Gogledd Cymru](https://lda.data.parliament.uk/terms/76541) | Welsh | 1.0 | 3 | `76541` |
| [IWGIA](https://lda.data.parliament.uk/terms/78143) | Welsh | 1.0 | 1 | `78143` |
| [Llyfrgell Genedlaethol Cymru](https://lda.data.parliament.uk/terms/78852) | Welsh | 1.0 | 3 | `78852` |
| [Trefnu Cymunedol Cymru](https://lda.data.parliament.uk/terms/84122) | Welsh | 1.0 | 3 | `84122` |
| [Undeb Cenedlaethol Athrawon Cymru](https://lda.data.parliament.uk/terms/84851) | Welsh | 1.0 | 4 | `84851` |
| [Uned Adnoddau Gwledig](https://lda.data.parliament.uk/terms/84861) | Welsh | 1.0 | 3 | `84861` |
| [Ymddiriedolaeth Treftadaeth Caernarfon](https://lda.data.parliament.uk/terms/86724) | Welsh | 1.0 | 3 | `86724` |
| [Clwyd](https://lda.data.parliament.uk/terms/9219) | Welsh | 1.0 | 1 | `9219` |
| [Wetenschappelijk Onderzoek- en Documentatiecentrum](https://lda.data.parliament.uk/terms/94726) | Dutch | 1.0 | 4 | `94726` |
| [Mudiadau Dathlu'r Gymraeg](https://lda.data.parliament.uk/terms/96120) | Welsh | 1.0 | 3 | `96120` |
| [Mudiadau Dathlu'r Iaith](https://lda.data.parliament.uk/terms/96121) | Welsh | 1.0 | 3 | `96121` |
| [OFMDFMNI](https://lda.data.parliament.uk/terms/97310) | Irish | 1.0 | 1 | `97310` |
| [Ombwdsmon Tai Cymdeithasol Cymru](https://lda.data.parliament.uk/terms/97353) | Welsh | 1.0 | 4 | `97353` |
| [Dwyfor Meirionnydd](https://lda.data.parliament.uk/terms/9762) | Welsh | 1.0 | 2 | `9762` |
| [Sozialistische Einheitspartei Deutschlands](https://lda.data.parliament.uk/terms/98189) | German | 1.0 | 3 | `98189` |
| [Panel Annibynnol Cymru ar Gydnabyddiaeth Ariannol](https://lda.data.parliament.uk/terms/98439) | Welsh | 1.0 | 6 | `98439` |
| [Proffesiynau Iechyd Cymru](https://lda.data.parliament.uk/terms/98880) | Welsh | 1.0 | 3 | `98880` |
| [Pwyllgor Archwilio](https://lda.data.parliament.uk/terms/98957) | Welsh | 1.0 | 2 | `98957` |
| [Pwyllgor Craffu Cymunedau a Diwylliant](https://lda.data.parliament.uk/terms/98958) | Welsh | 1.0 | 5 | `98958` |
| [Pwyllgor Cyfle Cyfartal](https://lda.data.parliament.uk/terms/98959) | Welsh | 1.0 | 3 | `98959` |
| [Pwyllgor Iechyd, Lles a Llywodraeth Leol](https://lda.data.parliament.uk/terms/98963) | Welsh | 1.0 | 6 | `98963` |
| [Trafnidiaeth Canolbarth Cymru](https://lda.data.parliament.uk/terms/99828) | Welsh | 1.0 | 3 | `99828` |
| [Y Busnes Gyrfaoedd](https://lda.data.parliament.uk/terms/100890) | Welsh | 0.99 | 3 | `100890` |
| [Gwynedd](https://lda.data.parliament.uk/terms/10578) | Welsh | 0.99 | 1 | `10578` |
| [Islwyn](https://lda.data.parliament.uk/terms/11068) | Welsh | 0.99 | 1 | `11068` |
| [Alleanza Nazionale](https://lda.data.parliament.uk/terms/1124) | Italian | 0.99 | 2 | `1124` |
| [Antur Waunfawr](https://lda.data.parliament.uk/terms/1604) | Welsh | 0.99 | 2 | `1604` |
| [Arbeitskreis Deutsche England-Forschung](https://lda.data.parliament.uk/terms/1676) | German | 0.99 | 3 | `1676` |
| [Comhairle nan Sgoiltean Araich](https://lda.data.parliament.uk/terms/25438) | Irish | 0.99 | 4 | `25438` |
| [Cylch yr Iaith](https://lda.data.parliament.uk/terms/28139) | Welsh | 0.99 | 3 | `28139` |
| [Della Vedova, Benedetto](https://lda.data.parliament.uk/terms/300134) | Italian | 0.99 | 3 | `300134` |
| [Vedova, Benedetto Della](https://lda.data.parliament.uk/terms/304186) | Italian | 0.99 | 3 | `304186` |
| [Della Vedova,Benedetto](https://lda.data.parliament.uk/terms/310814) | Italian | 0.99 | 2 | `310814` |
| [Vedova,Benedetto Della](https://lda.data.parliament.uk/terms/310815) | Italian | 0.99 | 2 | `310815` |
| [Ferruzzi Finanziaria](https://lda.data.parliament.uk/terms/34180) | Italian | 0.99 | 2 | `34180` |
| [Cyfoeth Naturiol Cymru](https://lda.data.parliament.uk/terms/394797) | Welsh | 0.99 | 3 | `394797` |
| [Dafydd Wigley](https://lda.data.parliament.uk/terms/400979) | Welsh | 0.99 | 2 | `400979` |
| [Deutsche Gesellschaft fur Auswartige Politik](https://lda.data.parliament.uk/terms/414259) | German | 0.99 | 5 | `414259` |
| [ICCWC](https://lda.data.parliament.uk/terms/432551) | Welsh | 0.99 | 1 | `432551` |
| [Metallgesellschaft](https://lda.data.parliament.uk/terms/45535) | German | 0.99 | 1 | `45535` |
| [Mewn Cymru](https://lda.data.parliament.uk/terms/45584) | Welsh | 0.99 | 2 | `45584` |
| [Ysgol Llanystumdwy](https://lda.data.parliament.uk/terms/456043) | Welsh | 0.99 | 2 | `456043` |
| [NDV Neue Darmstadter Verlagsanstalt](https://lda.data.parliament.uk/terms/462204) | German | 0.99 | 4 | `462204` |
| [Neue Darmstadter Verlagsanstalt](https://lda.data.parliament.uk/terms/462208) | German | 0.99 | 3 | `462208` |
| [Senedd Cymru](https://lda.data.parliament.uk/terms/468864) | Welsh | 0.99 | 2 | `468864` |
| [Istituto nazionale per le malattie infettive Lazzaro Spallanzani](https://lda.data.parliament.uk/terms/469337) | Italian | 0.99 | 8 | `469337` |
| [Ysgol Gwaenynog Denbigh](https://lda.data.parliament.uk/terms/480585) | Welsh | 0.99 | 3 | `480585` |
| [Talyllyn Railway](https://lda.data.parliament.uk/terms/482668) | Welsh | 0.99 | 2 | `482668` |
| [NAAONB](https://lda.data.parliament.uk/terms/487760) | Dutch | 0.99 | 1 | `487760` |
| [Cartrefi Conwy](https://lda.data.parliament.uk/terms/491626) | Welsh | 0.99 | 2 | `491626` |
| [Rijkswaterstaat](https://lda.data.parliament.uk/terms/493168) | Dutch | 0.99 | 1 | `493168` |
| [Allwyn](https://lda.data.parliament.uk/terms/496634) | Welsh | 0.99 | 1 | `496634` |
| [Ysgol Gyfun Emlyn](https://lda.data.parliament.uk/terms/505007) | Welsh | 0.99 | 3 | `505007` |
| [Planbureau voor de Leefomgeving](https://lda.data.parliament.uk/terms/510070) | Dutch | 0.99 | 4 | `510070` |
| [Awyr Cymru](https://lda.data.parliament.uk/terms/53950) | Welsh | 0.99 | 2 | `53950` |
| [Caerfyrddin](https://lda.data.parliament.uk/terms/545771) | Welsh | 0.99 | 1 | `545771` |
| [Bangor Aberconwy](https://lda.data.parliament.uk/terms/545790) | Welsh | 0.99 | 2 | `545790` |
| [Urras Oighreachd Ghabhsainn](https://lda.data.parliament.uk/terms/554948) | Irish | 0.99 | 3 | `554948` |
| [Comhaltas Ceoltoiri Eireann](https://lda.data.parliament.uk/terms/567987) | Irish | 0.99 | 3 | `567987` |
| [Bwyd Powys Food](https://lda.data.parliament.uk/terms/571690) | Welsh | 0.99 | 3 | `571690` |
| [Nordostschweizerische Kraftwerke](https://lda.data.parliament.uk/terms/58953) | German | 0.99 | 2 | `58953` |
| [NV Verenigde Bedrijven Nutricia](https://lda.data.parliament.uk/terms/60117) | Dutch | 0.99 | 4 | `60117` |
| [Osterreichishen Statistischen Zentralamtes](https://lda.data.parliament.uk/terms/60686) | German | 0.99 | 3 | `60686` |
| [Seanad Eireann](https://lda.data.parliament.uk/terms/69669) | Irish | 0.99 | 2 | `69669` |
| [Christlich-Demokratische Union Deutschlands](https://lda.data.parliament.uk/terms/74380) | German | 0.99 | 3 | `74380` |
| [Comisiwn Staff Cymru](https://lda.data.parliament.uk/terms/74614) | Welsh | 0.99 | 3 | `74614` |
| [Grwp Pwer Cymru Cyfngedig](https://lda.data.parliament.uk/terms/76351) | Welsh | 0.99 | 4 | `76351` |
| [Heddlu Dyfed-Powys](https://lda.data.parliament.uk/terms/76540) | Welsh | 0.99 | 2 | `76540` |
| [Iontaobhas Ultach](https://lda.data.parliament.uk/terms/77973) | Irish | 0.99 | 2 | `77973` |
| [Irish Oireachtas](https://lda.data.parliament.uk/terms/78042) | Irish | 0.99 | 2 | `78042` |
| [JAA](https://lda.data.parliament.uk/terms/78152) | Dutch | 0.99 | 1 | `78152` |
| [Conwy](https://lda.data.parliament.uk/terms/9403) | Welsh | 0.99 | 1 | `9403` |
| [Nant Gwrtheyrn](https://lda.data.parliament.uk/terms/96227) | Welsh | 0.99 | 2 | `96227` |
| [NIWM](https://lda.data.parliament.uk/terms/96981) | Welsh | 0.99 | 1 | `96981` |
| [Oireachtas](https://lda.data.parliament.uk/terms/97336) | Irish | 0.99 | 1 | `97336` |
| [Sozialdemokratische Partei Deutschlands](https://lda.data.parliament.uk/terms/98188) | German | 0.99 | 3 | `98188` |
| [Partij voor de Vrijheid](https://lda.data.parliament.uk/terms/98507) | Dutch | 0.99 | 4 | `98507` |
| [Pentre Peryglon](https://lda.data.parliament.uk/terms/98602) | Welsh | 0.99 | 2 | `98602` |
| [Pwyllgor Cyllid](https://lda.data.parliament.uk/terms/98960) | Welsh | 0.99 | 2 | `98960` |
| [Merthyr Tydfil](https://lda.data.parliament.uk/terms/11624) | Welsh | 0.98 | 2 | `11624` |
| [Arbeitgeber](https://lda.data.parliament.uk/terms/1674) | German | 0.98 | 1 | `1674` |
| [Artbeitgeber](https://lda.data.parliament.uk/terms/1863) | German | 0.98 | 1 | `1863` |
| [Cartrefi Cymru](https://lda.data.parliament.uk/terms/19133) | Welsh | 0.98 | 2 | `19133` |
| [Cassa di Compensazione e Garanzia](https://lda.data.parliament.uk/terms/19147) | Italian | 0.98 | 5 | `19147` |
| [Coed Cymru](https://lda.data.parliament.uk/terms/20986) | Welsh | 0.98 | 2 | `20986` |
| [Cumann Seanchais and Mhacha](https://lda.data.parliament.uk/terms/28061) | Irish | 0.98 | 4 | `28061` |
| [Buttafuoco, Antonino](https://lda.data.parliament.uk/terms/299490) | Italian | 0.98 | 2 | `299490` |
| [Cledwyn of Penrhos, Lord](https://lda.data.parliament.uk/terms/299773) | Welsh | 0.98 | 4 | `299773` |
| [O Neachtain, Sean](https://lda.data.parliament.uk/terms/302700) | Irish | 0.98 | 3 | `302700` |
| [O'Neachtain, Sean](https://lda.data.parliament.uk/terms/302737) | Irish | 0.98 | 2 | `302737` |
| [Buttafuoco,Antonino](https://lda.data.parliament.uk/terms/308174) | Italian | 0.98 | 1 | `308174` |
| [O'Neachtain,Sean](https://lda.data.parliament.uk/terms/322458) | Irish | 0.98 | 1 | `322458` |
| [Ecofys](https://lda.data.parliament.uk/terms/368605) | Welsh | 0.98 | 1 | `368605` |
| [Lord Cledwyn of Penrhos](https://lda.data.parliament.uk/terms/407765) | Welsh | 0.98 | 4 | `407765` |
| [Joint Air Reconnaissance Intelligence Centre](https://lda.data.parliament.uk/terms/41533) | French | 0.98 | 5 | `41533` |
| [van Nieuwenhuizen, Cora](https://lda.data.parliament.uk/terms/417500) | Dutch | 0.98 | 3 | `417500` |
| [Kernforschungszentrum](https://lda.data.parliament.uk/terms/41922) | German | 0.98 | 1 | `41922` |
| [KPMG Deutsche Treuhand-Gesellschaft](https://lda.data.parliament.uk/terms/42137) | German | 0.98 | 3 | `42137` |
| [KPNQwest](https://lda.data.parliament.uk/terms/42140) | Dutch | 0.98 | 1 | `42140` |
| [Deutscher Akademischer Austauschdienst](https://lda.data.parliament.uk/terms/433273) | German | 0.98 | 3 | `433273` |
| [DAAD](https://lda.data.parliament.uk/terms/433275) | Dutch | 0.98 | 1 | `433275` |
| [Fuerzas Armadas Revolucionarias de Colombia](https://lda.data.parliament.uk/terms/441845) | Spanish | 0.98 | 5 | `441845` |
| [Mudiad Ysgolion Meithrin](https://lda.data.parliament.uk/terms/44348) | Welsh | 0.98 | 3 | `44348` |
| [Perpetuum](https://lda.data.parliament.uk/terms/469799) | Latin | 0.98 | 1 | `469799` |
| [Buurtzorg](https://lda.data.parliament.uk/terms/470868) | Dutch | 0.98 | 1 | `470868` |
| [Ysbyty Glan Clwyd](https://lda.data.parliament.uk/terms/53613) | Welsh | 0.98 | 3 | `53613` |
| [ACFHE](https://lda.data.parliament.uk/terms/53663) | Irish | 0.98 | 1 | `53663` |
| [Austrian Freiheitlichen](https://lda.data.parliament.uk/terms/53901) | German | 0.98 | 2 | `53901` |
| [Bundesanstalt fur Strassenwesen](https://lda.data.parliament.uk/terms/552977) | German | 0.98 | 3 | `552977` |
| [Cwmpas](https://lda.data.parliament.uk/terms/558344) | Welsh | 0.98 | 1 | `558344` |
| [Societas Europaea Mammalogica](https://lda.data.parliament.uk/terms/67896) | Latin | 0.98 | 3 | `67896` |
| [Sgiliaith](https://lda.data.parliament.uk/terms/69917) | Welsh | 0.98 | 1 | `69917` |
| [Comhairle na Gaelsdaiochta](https://lda.data.parliament.uk/terms/74606) | Irish | 0.98 | 3 | `74606` |
| [CYLCH](https://lda.data.parliament.uk/terms/75115) | Welsh | 0.98 | 1 | `75115` |
| [Cymdeithas yr Iaith](https://lda.data.parliament.uk/terms/75123) | Welsh | 0.98 | 3 | `75123` |
| [Gofal a Thrwsio Cymru](https://lda.data.parliament.uk/terms/76219) | Welsh | 0.98 | 4 | `76219` |
| [Heddlu De Cymru](https://lda.data.parliament.uk/terms/76539) | Welsh | 0.98 | 3 | `76539` |
| [Dwr Cymru](https://lda.data.parliament.uk/terms/77014) | Welsh | 0.98 | 2 | `77014` |
| [MAA](https://lda.data.parliament.uk/terms/79009) | Dutch | 0.98 | 1 | `79009` |
| [Taith Newydd](https://lda.data.parliament.uk/terms/82468) | Welsh | 0.98 | 2 | `82468` |
| [Vrije Universiteit Amsterdam](https://lda.data.parliament.uk/terms/85847) | Dutch | 0.98 | 3 | `85847` |
| [Comhairle nan Eilean Siar](https://lda.data.parliament.uk/terms/94650) | Irish | 0.98 | 4 | `94650` |
| [NAA](https://lda.data.parliament.uk/terms/96160) | Dutch | 0.98 | 1 | `96160` |
| [Nationale Maatschappij der Belgische Spoorwegen](https://lda.data.parliament.uk/terms/96501) | Dutch | 0.98 | 5 | `96501` |
| [NAWDC](https://lda.data.parliament.uk/terms/96547) | Welsh | 0.98 | 1 | `96547` |
| [NDBHL](https://lda.data.parliament.uk/terms/96644) | Irish | 0.98 | 1 | `96644` |
| [Osterreicherischer Bundesrat](https://lda.data.parliament.uk/terms/97434) | German | 0.98 | 2 | `97434` |
| [Dyfed](https://lda.data.parliament.uk/terms/9763) | Welsh | 0.98 | 1 | `9763` |
| [Stichting Natuur en Milieu](https://lda.data.parliament.uk/terms/98370) | Dutch | 0.98 | 4 | `98370` |
| [Powys](https://lda.data.parliament.uk/terms/12243) | Welsh | 0.97 | 1 | `12243` |
| [Institut der deutschen Wirtschaft](https://lda.data.parliament.uk/terms/26954) | German | 0.97 | 4 | `26954` |
| [Dail Eireann](https://lda.data.parliament.uk/terms/28197) | Irish | 0.97 | 2 | `28197` |
| [National Urdd Eisteddfod](https://lda.data.parliament.uk/terms/285626) | Welsh | 0.97 | 3 | `285626` |
| [Urdd National Eisteddfod](https://lda.data.parliament.uk/terms/285627) | Welsh | 0.97 | 3 | `285627` |
| [Bangor Gwynedd](https://lda.data.parliament.uk/terms/288593) | Welsh | 0.97 | 2 | `288593` |
| [Deutsche Bundesbahn](https://lda.data.parliament.uk/terms/28943) | German | 0.97 | 2 | `28943` |
| [Clwyd, Lord](https://lda.data.parliament.uk/terms/299787) | Welsh | 0.97 | 2 | `299787` |
| [EMFF](https://lda.data.parliament.uk/terms/363444) | Welsh | 0.97 | 1 | `363444` |
| [Lord Clwyd](https://lda.data.parliament.uk/terms/409255) | Welsh | 0.97 | 2 | `409255` |
| [Dylunio Cymru](https://lda.data.parliament.uk/terms/436893) | Welsh | 0.97 | 2 | `436893` |
| [Amministrazione federale delle dogane](https://lda.data.parliament.uk/terms/445594) | Italian | 0.97 | 4 | `445594` |
| [Llewellyn, Edward](https://lda.data.parliament.uk/terms/463622) | Welsh | 0.97 | 2 | `463622` |
| [Edward Llewellyn](https://lda.data.parliament.uk/terms/463624) | Welsh | 0.97 | 2 | `463624` |
| [Rigsforsikringsanstalten](https://lda.data.parliament.uk/terms/463883) | German | 0.97 | 1 | `463883` |
| [Pectus excavatum](https://lda.data.parliament.uk/terms/473752) | Latin | 0.97 | 2 | `473752` |
| [Senedd Cymru members](https://lda.data.parliament.uk/terms/493551) | Welsh | 0.97 | 3 | `493551` |
| [Centre d'histoire des idees dans les iles britanniques](https://lda.data.parliament.uk/terms/497226) | French | 0.97 | 8 | `497226` |
| [Communaute financiere africaine](https://lda.data.parliament.uk/terms/497228) | French | 0.97 | 3 | `497228` |
| [Portmeirion Cymru](https://lda.data.parliament.uk/terms/501292) | Welsh | 0.97 | 2 | `501292` |
| [Abercwmboi RFC](https://lda.data.parliament.uk/terms/517185) | Welsh | 0.97 | 2 | `517185` |
| [Vrije Universiteit Brussel](https://lda.data.parliament.uk/terms/517584) | Dutch | 0.97 | 3 | `517584` |
| [LAA](https://lda.data.parliament.uk/terms/52667) | Dutch | 0.97 | 1 | `52667` |
| [BAAG](https://lda.data.parliament.uk/terms/53967) | Dutch | 0.97 | 1 | `53967` |
| [Merthyr Tydfil and Aberdare](https://lda.data.parliament.uk/terms/545757) | Welsh | 0.97 | 4 | `545757` |
| [BIIB](https://lda.data.parliament.uk/terms/54803) | Latin | 0.97 | 1 | `54803` |
| [Office de protection contre les rayonnements ionisants](https://lda.data.parliament.uk/terms/60214) | French | 0.97 | 7 | `60214` |
| [Stiftung Wissenschaft und Politik](https://lda.data.parliament.uk/terms/69298) | German | 0.97 | 4 | `69298` |
| [Cadwch Gymru'n Daclus](https://lda.data.parliament.uk/terms/73837) | Welsh | 0.97 | 3 | `73837` |
| [Cafod](https://lda.data.parliament.uk/terms/73848) | Welsh | 0.97 | 1 | `73848` |
| [CLRLL](https://lda.data.parliament.uk/terms/74504) | Welsh | 0.97 | 1 | `74504` |
| [GAA](https://lda.data.parliament.uk/terms/76044) | Dutch | 0.97 | 1 | `76044` |
| [EABH](https://lda.data.parliament.uk/terms/77031) | Irish | 0.97 | 1 | `77031` |
| [Aberconwy](https://lda.data.parliament.uk/terms/8202) | Welsh | 0.97 | 1 | `8202` |
| [Urdd Gobaith Cymru](https://lda.data.parliament.uk/terms/85247) | Welsh | 0.97 | 3 | `85247` |
| [Bangor (Gwynedd)](https://lda.data.parliament.uk/terms/8538) | Welsh | 0.97 | 2 | `8538` |
| [Ysbyty Gwynedd NHS Trust](https://lda.data.parliament.uk/terms/86911) | Welsh | 0.97 | 4 | `86911` |
| [Bannau Brycheiniog](https://lda.data.parliament.uk/terms/8790) | Welsh | 0.97 | 2 | `8790` |
| [NAWDFM](https://lda.data.parliament.uk/terms/96548) | Welsh | 0.97 | 1 | `96548` |
| [NFYFC](https://lda.data.parliament.uk/terms/96758) | Welsh | 0.97 | 1 | `96758` |
| [NMHP](https://lda.data.parliament.uk/terms/97007) | Irish | 0.97 | 1 | `97007` |
| [OFMDFM](https://lda.data.parliament.uk/terms/97309) | Irish | 0.97 | 1 | `97309` |
| [Osterreichische Volkspartei](https://lda.data.parliament.uk/terms/97435) | German | 0.97 | 2 | `97435` |
| [Osterreichischer Nationalrat](https://lda.data.parliament.uk/terms/97437) | German | 0.97 | 2 | `97437` |
| [Partei des Demokratischen Sozialismus](https://lda.data.parliament.uk/terms/98502) | German | 0.97 | 4 | `98502` |
| [Merthyr Tydfil and Rhymney](https://lda.data.parliament.uk/terms/11625) | Welsh | 0.96 | 4 | `11625` |
| [Phytophthora ramorum](https://lda.data.parliament.uk/terms/12140) | Latin | 0.96 | 2 | `12140` |
| [Estyn](https://lda.data.parliament.uk/terms/18196) | Welsh | 0.96 | 1 | `18196` |
| [Centro de Investigaciones Europeo-Latinoamericanas](https://lda.data.parliament.uk/terms/19909) | Spanish | 0.96 | 4 | `19909` |
| [Chadwyck-Healey](https://lda.data.parliament.uk/terms/19967) | Welsh | 0.96 | 1 | `19967` |
| [Aberystwyth](https://lda.data.parliament.uk/terms/285760) | Welsh | 0.96 | 1 | `285760` |
| [Deutscher Beamtenbund](https://lda.data.parliament.uk/terms/28950) | German | 0.96 | 2 | `28950` |
| [RAF Brawdy](https://lda.data.parliament.uk/terms/296872) | Welsh | 0.96 | 2 | `296872` |
| [Clwyd, Ann](https://lda.data.parliament.uk/terms/299786) | Welsh | 0.96 | 2 | `299786` |
| [Putten, Maartje JA van](https://lda.data.parliament.uk/terms/303087) | Dutch | 0.96 | 4 | `303087` |
| [Rivellini, Crescenzio](https://lda.data.parliament.uk/terms/303238) | Italian | 0.96 | 2 | `303238` |
| [Ann Clwyd](https://lda.data.parliament.uk/terms/309416) | Welsh | 0.96 | 2 | `309416` |
| [Foras Na Gaeilge](https://lda.data.parliament.uk/terms/34695) | Irish | 0.96 | 3 | `34695` |
| [Institut de recherche en politiques publiques](https://lda.data.parliament.uk/terms/346970) | French | 0.96 | 6 | `346970` |
| [Institut national de la statistique et des etudes economiques](https://lda.data.parliament.uk/terms/395105) | French | 0.96 | 9 | `395105` |
| [PassivSystems](https://lda.data.parliament.uk/terms/431564) | German | 0.96 | 1 | `431564` |
| [Adolygiad S4C](https://lda.data.parliament.uk/terms/441080) | Welsh | 0.96 | 2 | `441080` |
| [Penrhyn, Lord](https://lda.data.parliament.uk/terms/447211) | Welsh | 0.96 | 2 | `447211` |
| [Lord Penrhyn](https://lda.data.parliament.uk/terms/447214) | Welsh | 0.96 | 2 | `447214` |
| [Mentrau Iaith Cymru](https://lda.data.parliament.uk/terms/45406) | Welsh | 0.96 | 3 | `45406` |
| [Stemettes](https://lda.data.parliament.uk/terms/454925) | French | 0.96 | 1 | `454925` |
| [MEWG](https://lda.data.parliament.uk/terms/460580) | Welsh | 0.96 | 1 | `460580` |
| [Hooson, Emlyn](https://lda.data.parliament.uk/terms/464494) | Welsh | 0.96 | 2 | `464494` |
| [Emlyn Hooson](https://lda.data.parliament.uk/terms/464496) | Welsh | 0.96 | 2 | `464496` |
| [Arbeitgeberverband Pflege](https://lda.data.parliament.uk/terms/469102) | German | 0.96 | 2 | `469102` |
| [Corporacion Colectivo de Abogados Jose Alvear Restrepo](https://lda.data.parliament.uk/terms/500790) | Spanish | 0.96 | 7 | `500790` |
| [Lake Vyrnwy](https://lda.data.parliament.uk/terms/515946) | Welsh | 0.96 | 2 | `515946` |
| [xigxag](https://lda.data.parliament.uk/terms/517900) | French | 0.96 | 1 | `517900` |
| [AMRC Cymru](https://lda.data.parliament.uk/terms/526010) | Welsh | 0.96 | 2 | `526010` |
| [Bicentenaire des institutions parlementaires du Quebec](https://lda.data.parliament.uk/terms/53910) | French | 0.96 | 6 | `53910` |
| [Merthyr Tydfil Leisure Trust](https://lda.data.parliament.uk/terms/545587) | Welsh | 0.96 | 4 | `545587` |
| [Drenewydd Actif Newtown](https://lda.data.parliament.uk/terms/551496) | Welsh | 0.96 | 3 | `551496` |
| [Centro internacional de mejoramiento de maiz y trigo](https://lda.data.parliament.uk/terms/575531) | Spanish | 0.96 | 8 | `575531` |
| [Partido dos Trabalhadores](https://lda.data.parliament.uk/terms/61139) | Portuguese | 0.96 | 3 | `61139` |
| [BWB](https://lda.data.parliament.uk/terms/73771) | Welsh | 0.96 | 1 | `73771` |
| [BWMB](https://lda.data.parliament.uk/terms/73774) | Welsh | 0.96 | 1 | `73774` |
| [Chrislich-Soziale Union deutschlands](https://lda.data.parliament.uk/terms/74375) | German | 0.96 | 3 | `74375` |
| [Deutscher Bundesrat](https://lda.data.parliament.uk/terms/75347) | German | 0.96 | 2 | `75347` |
| [Freie Demokratische Partei](https://lda.data.parliament.uk/terms/75972) | German | 0.96 | 3 | `75972` |
| [EAEC](https://lda.data.parliament.uk/terms/77034) | Latin | 0.96 | 1 | `77034` |
| [EDD](https://lda.data.parliament.uk/terms/77196) | Welsh | 0.96 | 1 | `77196` |
| [ILZSG](https://lda.data.parliament.uk/terms/77633) | German | 0.96 | 1 | `77633` |
| [MAMAA](https://lda.data.parliament.uk/terms/79053) | Dutch | 0.96 | 1 | `79053` |
| [Statistisches Bundesamt](https://lda.data.parliament.uk/terms/83440) | German | 0.96 | 2 | `83440` |
| [Caernarfon](https://lda.data.parliament.uk/terms/8914) | Welsh | 0.96 | 1 | `8914` |
| [NCHSPCS](https://lda.data.parliament.uk/terms/96612) | Irish | 0.96 | 1 | `96612` |
| [Osterreichischer Fussball-Band](https://lda.data.parliament.uk/terms/97436) | German | 0.96 | 2 | `97436` |
| [Meibion Glyndwr](https://lda.data.parliament.uk/terms/98109) | Welsh | 0.96 | 2 | `98109` |
| [Ente nazionale per l'energia elettrica](https://lda.data.parliament.uk/terms/17809) | Italian | 0.95 | 5 | `17809` |
| [Celf o Gwmpas](https://lda.data.parliament.uk/terms/19274) | Welsh | 0.95 | 3 | `19274` |
| [Coleg Morgannwg](https://lda.data.parliament.uk/terms/21006) | Welsh | 0.95 | 2 | `21006` |
| [Assicurazioni Generali](https://lda.data.parliament.uk/terms/2153) | Italian | 0.95 | 2 | `2153` |
| [Istituto Affari Internazionali](https://lda.data.parliament.uk/terms/27374) | Italian | 0.95 | 3 | `27374` |
| [Cymorth Cymru](https://lda.data.parliament.uk/terms/28147) | Welsh | 0.95 | 2 | `28147` |
| [Frischenschlager, Friedhelm](https://lda.data.parliament.uk/terms/300623) | German | 0.95 | 2 | `300623` |
| [Gladwyn, Lord](https://lda.data.parliament.uk/terms/300763) | Welsh | 0.95 | 2 | `300763` |
| [Thomas, Dafydd Elis](https://lda.data.parliament.uk/terms/303972) | Welsh | 0.95 | 3 | `303972` |
| [CSWRGC](https://lda.data.parliament.uk/terms/308846) | Welsh | 0.95 | 1 | `308846` |
| [Frischenschlager,Friedhelm](https://lda.data.parliament.uk/terms/312918) | German | 0.95 | 1 | `312918` |
| [Elis-Thomas, Dafydd](https://lda.data.parliament.uk/terms/327505) | Welsh | 0.95 | 2 | `327505` |
| [Llewelyn Davies Yeang](https://lda.data.parliament.uk/terms/363829) | Welsh | 0.95 | 3 | `363829` |
| [Dafydd Elis Thomas](https://lda.data.parliament.uk/terms/405664) | Welsh | 0.95 | 3 | `405664` |
| [Lord Gladwyn](https://lda.data.parliament.uk/terms/409522) | Welsh | 0.95 | 2 | `409522` |
| [Cwmni Da](https://lda.data.parliament.uk/terms/424334) | Welsh | 0.95 | 2 | `424334` |
| [Palbociclib](https://lda.data.parliament.uk/terms/434317) | Latin | 0.95 | 1 | `434317` |
| [Mouvement des entreprises de France](https://lda.data.parliament.uk/terms/436859) | French | 0.95 | 5 | `436859` |
| [Civicus](https://lda.data.parliament.uk/terms/437110) | Latin | 0.95 | 1 | `437110` |
| [BAA](https://lda.data.parliament.uk/terms/4490) | Dutch | 0.95 | 1 | `4490` |
| [Ysbyty Castell-nedd Port Talbot](https://lda.data.parliament.uk/terms/451200) | Welsh | 0.95 | 4 | `451200` |
| [Ministerie van Binnenlandse Zaken](https://lda.data.parliament.uk/terms/45991) | Dutch | 0.95 | 4 | `45991` |
| [Dafydd Elis-Thomas](https://lda.data.parliament.uk/terms/460645) | Welsh | 0.95 | 2 | `460645` |
| [Amunugama, Dilum](https://lda.data.parliament.uk/terms/482497) | Latin | 0.95 | 2 | `482497` |
| [Dilum Amunugama](https://lda.data.parliament.uk/terms/482499) | Latin | 0.95 | 2 | `482499` |
| [Centre d'etudes et de recherches sur les qualifications](https://lda.data.parliament.uk/terms/497214) | French | 0.95 | 8 | `497214` |
| [Colwyn Jestyn John Philipps](https://lda.data.parliament.uk/terms/505480) | Welsh | 0.95 | 4 | `505480` |
| [BYD](https://lda.data.parliament.uk/terms/510941) | Welsh | 0.95 | 1 | `510941` |
| [Ynys Enlli](https://lda.data.parliament.uk/terms/516055) | Welsh | 0.95 | 2 | `516055` |
| [FDD](https://lda.data.parliament.uk/terms/525356) | Welsh | 0.95 | 1 | `525356` |
| [BHF](https://lda.data.parliament.uk/terms/54234) | Irish | 0.95 | 1 | `54234` |
| [AFPAA](https://lda.data.parliament.uk/terms/54375) | Dutch | 0.95 | 1 | `54375` |
| [AA](https://lda.data.parliament.uk/terms/54462) | Dutch | 0.95 | 1 | `54462` |
| [Neues Deutschland](https://lda.data.parliament.uk/terms/58410) | German | 0.95 | 2 | `58410` |
| [Oesterreichische Nationalbank](https://lda.data.parliament.uk/terms/60202) | German | 0.95 | 2 | `60202` |
| [Owain Lawgoch Society](https://lda.data.parliament.uk/terms/60747) | Welsh | 0.95 | 3 | `60747` |
| [Cairdeas](https://lda.data.parliament.uk/terms/73854) | Irish | 0.95 | 1 | `73854` |
| [Welsh National Eisteddfod](https://lda.data.parliament.uk/terms/94264) | Welsh | 0.95 | 3 | `94264` |
| [Algemene Rekenkamer](https://lda.data.parliament.uk/terms/1016) | Dutch | 0.94 | 2 | `1016` |
| [Canllaw Online](https://lda.data.parliament.uk/terms/18799) | Welsh | 0.94 | 2 | `18799` |
| [Meirionnydd District Council](https://lda.data.parliament.uk/terms/286421) | Welsh | 0.94 | 3 | `286421` |
| [Banca Nazionale del Lavoro](https://lda.data.parliament.uk/terms/3147) | Italian | 0.94 | 4 | `3147` |
| [Dysg](https://lda.data.parliament.uk/terms/32780) | Welsh | 0.94 | 1 | `32780` |
| [Fondazione Giacomo Brodolini](https://lda.data.parliament.uk/terms/34592) | Italian | 0.94 | 3 | `34592` |
| [Fondation nationale des sciences politiques](https://lda.data.parliament.uk/terms/34882) | French | 0.94 | 5 | `34882` |
| [NWAA](https://lda.data.parliament.uk/terms/361352) | Dutch | 0.94 | 1 | `361352` |
| [FIDH](https://lda.data.parliament.uk/terms/368508) | Irish | 0.94 | 1 | `368508` |
| [Dafydd Elystan Elystan-Morgan](https://lda.data.parliament.uk/terms/413475) | Welsh | 0.94 | 3 | `413475` |
| [Imkaan](https://lda.data.parliament.uk/terms/427340) | Dutch | 0.94 | 1 | `427340` |
| [Buonanno, Gianluca](https://lda.data.parliament.uk/terms/427423) | Italian | 0.94 | 2 | `427423` |
| [Elystan-Morgan, Dafydd Elystan](https://lda.data.parliament.uk/terms/460693) | Welsh | 0.94 | 3 | `460693` |
| [Evans, David Thomas Gruffydd](https://lda.data.parliament.uk/terms/460711) | Welsh | 0.94 | 4 | `460711` |
| [Centraal Bureau voor de Statistiek](https://lda.data.parliament.uk/terms/462202) | Dutch | 0.94 | 5 | `462202` |
| [Wehrkundetagung](https://lda.data.parliament.uk/terms/467915) | German | 0.94 | 1 | `467915` |
| [McIlwraith, Euan](https://lda.data.parliament.uk/terms/485926) | Welsh | 0.94 | 2 | `485926` |
| [Euan McIlwraith](https://lda.data.parliament.uk/terms/485954) | Welsh | 0.94 | 2 | `485954` |
| [Bureau de soutien pour la consolidation de la paix en RDC](https://lda.data.parliament.uk/terms/493461) | French | 0.94 | 11 | `493461` |
| [Exscientia](https://lda.data.parliament.uk/terms/506087) | Latin | 0.94 | 1 | `506087` |
| [Tritium](https://lda.data.parliament.uk/terms/510100) | Latin | 0.94 | 1 | `510100` |
| [Cwmni Egino](https://lda.data.parliament.uk/terms/513083) | Welsh | 0.94 | 2 | `513083` |
| [BAAPS](https://lda.data.parliament.uk/terms/54729) | Dutch | 0.94 | 1 | `54729` |
| [Caernarfon Town FC](https://lda.data.parliament.uk/terms/549083) | Welsh | 0.94 | 3 | `549083` |
| [Glyn Cywarch](https://lda.data.parliament.uk/terms/551510) | Welsh | 0.94 | 2 | `551510` |
| [Mediawijs](https://lda.data.parliament.uk/terms/557441) | Dutch | 0.94 | 1 | `557441` |
| [CCCWA](https://lda.data.parliament.uk/terms/74025) | Welsh | 0.94 | 1 | `74025` |
| [Coleg Digidol Cymru](https://lda.data.parliament.uk/terms/74572) | Welsh | 0.94 | 3 | `74572` |
| [Comision para el Esclarecimiento Historico](https://lda.data.parliament.uk/terms/74608) | Spanish | 0.94 | 5 | `74608` |
| [Deutsche Bundesbank](https://lda.data.parliament.uk/terms/75346) | German | 0.94 | 2 | `75346` |
| [DIIS](https://lda.data.parliament.uk/terms/75391) | Latin | 0.94 | 1 | `75391` |
| [IAA](https://lda.data.parliament.uk/terms/77434) | Dutch | 0.94 | 1 | `77434` |
| [ICFFW](https://lda.data.parliament.uk/terms/77496) | Welsh | 0.94 | 1 | `77496` |
| [Pwyllgor Menter a Dysgu](https://lda.data.parliament.uk/terms/98966) | Welsh | 0.94 | 4 | `98966` |
| [Transcaucasus](https://lda.data.parliament.uk/terms/13344) | Latin | 0.93 | 1 | `13344` |
| [Encyclopaedia Britannica](https://lda.data.parliament.uk/terms/17567) | Latin | 0.93 | 2 | `17567` |
| [Associazione Industrie Dolciaria Italiane](https://lda.data.parliament.uk/terms/2668) | Italian | 0.93 | 4 | `2668` |
| [NMNI](https://lda.data.parliament.uk/terms/298318) | Irish | 0.93 | 1 | `298318` |
| [Shrewsbury-Aberystwyth railway line](https://lda.data.parliament.uk/terms/298705) | Welsh | 0.93 | 3 | `298705` |
| [Buitenweg, Kathalijne](https://lda.data.parliament.uk/terms/299443) | Dutch | 0.93 | 2 | `299443` |
| [Izquierdo Collado, Juan de Dios](https://lda.data.parliament.uk/terms/301416) | Spanish | 0.93 | 5 | `301416` |
| [Oomen-Ruijten, Ria](https://lda.data.parliament.uk/terms/302752) | Dutch | 0.93 | 2 | `302752` |
| [Buitenweg,Kathalijne](https://lda.data.parliament.uk/terms/307930) | Dutch | 0.93 | 1 | `307930` |
| [Izquierdo Collado,Juan de Dios](https://lda.data.parliament.uk/terms/316436) | Spanish | 0.93 | 4 | `316436` |
| [Oomen-Ruijten,Ria](https://lda.data.parliament.uk/terms/322521) | Dutch | 0.93 | 1 | `322521` |
| [Glandwr Cymru](https://lda.data.parliament.uk/terms/348356) | Welsh | 0.93 | 2 | `348356` |
| [MQM](https://lda.data.parliament.uk/terms/348395) | Latin | 0.93 | 1 | `348395` |
| [Llewelyn-Davies](https://lda.data.parliament.uk/terms/43153) | Welsh | 0.93 | 1 | `43153` |
| [ECEEE](https://lda.data.parliament.uk/terms/434392) | Italian | 0.93 | 1 | `434392` |
| [ICIJ](https://lda.data.parliament.uk/terms/441419) | Dutch | 0.93 | 1 | `441419` |
| [Erythropoietic protoporphyria](https://lda.data.parliament.uk/terms/442881) | Latin | 0.93 | 2 | `442881` |
| [Llewelyn-Davies, Annie](https://lda.data.parliament.uk/terms/463699) | Welsh | 0.93 | 2 | `463699` |
| [Annie Llewelyn-Davies](https://lda.data.parliament.uk/terms/463701) | Welsh | 0.93 | 2 | `463701` |
| [NIAMH](https://lda.data.parliament.uk/terms/465634) | Irish | 0.93 | 1 | `465634` |
| [Aberystwyth-Shrewsbury railway line](https://lda.data.parliament.uk/terms/492597) | Welsh | 0.93 | 3 | `492597` |
| [iReach](https://lda.data.parliament.uk/terms/495719) | Irish | 0.93 | 1 | `495719` |
| [GCFFC](https://lda.data.parliament.uk/terms/508427) | Irish | 0.93 | 1 | `508427` |
| [EIDHR](https://lda.data.parliament.uk/terms/52220) | Irish | 0.93 | 1 | `52220` |
| [Intelligence, Surveillance, Target Acquisition and Reconnaissance](https://lda.data.parliament.uk/terms/52569) | French | 0.93 | 6 | `52569` |
| [BBFC](https://lda.data.parliament.uk/terms/54752) | Italian | 0.93 | 1 | `54752` |
| [Caernarfon RFC](https://lda.data.parliament.uk/terms/558456) | Welsh | 0.93 | 2 | `558456` |
| [Vlaardingerbroek, Eva](https://lda.data.parliament.uk/terms/574265) | Dutch | 0.93 | 2 | `574265` |
| [Eva Vlaardingerbroek](https://lda.data.parliament.uk/terms/574267) | Dutch | 0.93 | 2 | `574267` |
| [Renaissance Trains](https://lda.data.parliament.uk/terms/66288) | French | 0.93 | 2 | `66288` |
| [Centre international de documentation parlementaire](https://lda.data.parliament.uk/terms/74179) | French | 0.93 | 5 | `74179` |
| [FOE Cymru](https://lda.data.parliament.uk/terms/75900) | Welsh | 0.93 | 2 | `75900` |
| [Verlag Neue Zurcher Zeitung](https://lda.data.parliament.uk/terms/85604) | German | 0.93 | 4 | `85604` |
| [NAWRA](https://lda.data.parliament.uk/terms/96573) | Welsh | 0.93 | 1 | `96573` |
| [NCVQ](https://lda.data.parliament.uk/terms/96641) | Latin | 0.93 | 1 | `96641` |
| [NFFO](https://lda.data.parliament.uk/terms/96739) | Welsh | 0.93 | 1 | `96739` |
| [NIMH](https://lda.data.parliament.uk/terms/96957) | Irish | 0.93 | 1 | `96957` |
| [Prif Weinidog](https://lda.data.parliament.uk/terms/98835) | Welsh | 0.93 | 2 | `98835` |
| [Cassa per il Mezzogiorno](https://lda.data.parliament.uk/terms/19148) | Italian | 0.92 | 4 | `19148` |
| [Honourable Society of Cymmrodorion](https://lda.data.parliament.uk/terms/25171) | Welsh | 0.92 | 4 | `25171` |
| [Cyd](https://lda.data.parliament.uk/terms/28135) | Welsh | 0.92 | 1 | `28135` |
| [Deutsche Bundespost Telekom](https://lda.data.parliament.uk/terms/28948) | German | 0.92 | 3 | `28948` |
| [Deutscher Industrie und Handelstag](https://lda.data.parliament.uk/terms/28951) | German | 0.92 | 4 | `28951` |
| [Chiusano, Vittorino](https://lda.data.parliament.uk/terms/299707) | Italian | 0.92 | 2 | `299707` |
| [Islwyn, Lord](https://lda.data.parliament.uk/terms/301410) | Welsh | 0.92 | 2 | `301410` |
| [Kestelijn-Sierens, Marie-Paule](https://lda.data.parliament.uk/terms/301606) | Dutch | 0.92 | 2 | `301606` |
| [Medeiros Ferreira, Jose](https://lda.data.parliament.uk/terms/302346) | Portuguese | 0.92 | 3 | `302346` |
| [Schreiber, Heinz](https://lda.data.parliament.uk/terms/303487) | German | 0.92 | 2 | `303487` |
| [Van Hemeldonck, Marijke](https://lda.data.parliament.uk/terms/304153) | Dutch | 0.92 | 3 | `304153` |
| [Chiusano,Vittorino](https://lda.data.parliament.uk/terms/309072) | Italian | 0.92 | 1 | `309072` |
| [Kestelijn-Sierens,Marie-Paule](https://lda.data.parliament.uk/terms/317332) | Dutch | 0.92 | 1 | `317332` |
| [Medeiros Ferreira,Jose](https://lda.data.parliament.uk/terms/320692) | Portuguese | 0.92 | 2 | `320692` |
| [Fondazione Eni Enrico Mattei](https://lda.data.parliament.uk/terms/34590) | Italian | 0.92 | 4 | `34590` |
| [Environnement Canada](https://lda.data.parliament.uk/terms/363675) | French | 0.92 | 2 | `363675` |
| [AAFDA](https://lda.data.parliament.uk/terms/402801) | Dutch | 0.92 | 1 | `402801` |
| [Lord Islwyn](https://lda.data.parliament.uk/terms/407622) | Welsh | 0.92 | 2 | `407622` |
| [Tinnitus](https://lda.data.parliament.uk/terms/418357) | Latin | 0.92 | 1 | `418357` |
| [Seeuws, Didier](https://lda.data.parliament.uk/terms/431893) | Dutch | 0.92 | 2 | `431893` |
| [Merthyr Tydfil Borough Council](https://lda.data.parliament.uk/terms/45510) | Welsh | 0.92 | 4 | `45510` |
| [Merthyr Tydfil County Borough Council](https://lda.data.parliament.uk/terms/45513) | Welsh | 0.92 | 5 | `45513` |
| [IBioIC](https://lda.data.parliament.uk/terms/459218) | Welsh | 0.92 | 1 | `459218` |
| [Hamlyn, Matthew](https://lda.data.parliament.uk/terms/472884) | Welsh | 0.92 | 2 | `472884` |
| [Matthew Hamlyn](https://lda.data.parliament.uk/terms/472886) | Welsh | 0.92 | 2 | `472886` |
| [BII](https://lda.data.parliament.uk/terms/492203) | Latin | 0.92 | 1 | `492203` |
| [Ystumllyn, John](https://lda.data.parliament.uk/terms/492657) | Welsh | 0.92 | 2 | `492657` |
| [John Ystumllyn](https://lda.data.parliament.uk/terms/492664) | Welsh | 0.92 | 2 | `492664` |
| [ASGLB](https://lda.data.parliament.uk/terms/509205) | Welsh | 0.92 | 1 | `509205` |
| [Institut des hautes etudes europeennes](https://lda.data.parliament.uk/terms/517141) | French | 0.92 | 5 | `517141` |
| [Praesidio](https://lda.data.parliament.uk/terms/518557) | Latin | 0.92 | 1 | `518557` |
| [Caucasus](https://lda.data.parliament.uk/terms/51893) | Latin | 0.92 | 1 | `51893` |
| [Maentwrog power station](https://lda.data.parliament.uk/terms/525805) | Welsh | 0.92 | 3 | `525805` |
| [EXIT Deutsche Schweiz](https://lda.data.parliament.uk/terms/525878) | German | 0.92 | 3 | `525878` |
| [Mod Naiseanta Rioghail](https://lda.data.parliament.uk/terms/52806) | Irish | 0.92 | 3 | `52806` |
| [BFWG](https://lda.data.parliament.uk/terms/54220) | Welsh | 0.92 | 1 | `54220` |
| [An Comunn Gaidhealach](https://lda.data.parliament.uk/terms/54618) | Irish | 0.92 | 3 | `54618` |
| [Coleg Powys](https://lda.data.parliament.uk/terms/61779) | Welsh | 0.92 | 2 | `61779` |
| [Softnotes](https://lda.data.parliament.uk/terms/68047) | German | 0.92 | 1 | `68047` |
| [CCFRA](https://lda.data.parliament.uk/terms/74033) | Latin | 0.92 | 1 | `74033` |
| [CPHC](https://lda.data.parliament.uk/terms/74919) | Irish | 0.92 | 1 | `74919` |
| [Cymru Yfory](https://lda.data.parliament.uk/terms/75125) | Welsh | 0.92 | 2 | `75125` |
| [DWQR](https://lda.data.parliament.uk/terms/77013) | Welsh | 0.92 | 1 | `77013` |
| [ISDD](https://lda.data.parliament.uk/terms/78070) | Welsh | 0.92 | 1 | `78070` |
| [IWM](https://lda.data.parliament.uk/terms/78144) | Welsh | 0.92 | 1 | `78144` |
| [NWRWMG](https://lda.data.parliament.uk/terms/78786) | Welsh | 0.92 | 1 | `78786` |
| [Vlaams Blok](https://lda.data.parliament.uk/terms/85773) | Dutch | 0.92 | 2 | `85773` |
| [NII](https://lda.data.parliament.uk/terms/96950) | Latin | 0.92 | 1 | `96950` |
| [NIIS](https://lda.data.parliament.uk/terms/96951) | Latin | 0.92 | 1 | `96951` |
| [Na h-Eileanan an Iar](https://lda.data.parliament.uk/terms/11799) | Irish | 0.91 | 4 | `11799` |
| [Antur Dwyryd Llyn](https://lda.data.parliament.uk/terms/1602) | Welsh | 0.91 | 3 | `1602` |
| [Chicco](https://lda.data.parliament.uk/terms/20273) | Italian | 0.91 | 1 | `20273` |
| [Deutsche Bundestag](https://lda.data.parliament.uk/terms/28944) | German | 0.91 | 2 | `28944` |
| [Barbagli, Giovanni](https://lda.data.parliament.uk/terms/299018) | Italian | 0.91 | 2 | `299018` |
| [Colwyn, Lord](https://lda.data.parliament.uk/terms/299835) | Welsh | 0.91 | 2 | `299835` |
| [Foglietta, Alessandro](https://lda.data.parliament.uk/terms/300541) | Italian | 0.91 | 2 | `300541` |
| [Glattfelder, Bela](https://lda.data.parliament.uk/terms/300792) | German | 0.91 | 2 | `300792` |
| [Izquierdo Rojo, Maria](https://lda.data.parliament.uk/terms/301417) | Spanish | 0.91 | 3 | `301417` |
| [Barbagli,Giovanni](https://lda.data.parliament.uk/terms/305978) | Italian | 0.91 | 1 | `305978` |
| [Izquierdo Rojo,Maria](https://lda.data.parliament.uk/terms/316438) | Spanish | 0.91 | 2 | `316438` |
| [Lord Colwyn](https://lda.data.parliament.uk/terms/399088) | Welsh | 0.91 | 2 | `399088` |
| [Italian Carabinieri](https://lda.data.parliament.uk/terms/41245) | Italian | 0.91 | 2 | `41245` |
| [L and R Sozialforschung](https://lda.data.parliament.uk/terms/42188) | German | 0.91 | 4 | `42188` |
| [Duodopa](https://lda.data.parliament.uk/terms/426244) | Latin | 0.91 | 1 | `426244` |
| [BDD](https://lda.data.parliament.uk/terms/431415) | Welsh | 0.91 | 1 | `431415` |
| [Merthyr, Lord](https://lda.data.parliament.uk/terms/446591) | Welsh | 0.91 | 2 | `446591` |
| [Lord Merthyr](https://lda.data.parliament.uk/terms/446593) | Welsh | 0.91 | 2 | `446593` |
| [Identitare Bewegung Osterreich](https://lda.data.parliament.uk/terms/455276) | German | 0.91 | 3 | `455276` |
| [Hughes, Cledwyn](https://lda.data.parliament.uk/terms/462920) | Welsh | 0.91 | 2 | `462920` |
| [Cledwyn Hughes](https://lda.data.parliament.uk/terms/462922) | Welsh | 0.91 | 2 | `462922` |
| [Clostridium botulinum](https://lda.data.parliament.uk/terms/51974) | Latin | 0.91 | 2 | `51974` |
| [LGAWG](https://lda.data.parliament.uk/terms/520235) | Welsh | 0.91 | 1 | `520235` |
| [BHHRG](https://lda.data.parliament.uk/terms/54238) | Irish | 0.91 | 1 | `54238` |
| [Clwyd North](https://lda.data.parliament.uk/terms/545788) | Welsh | 0.91 | 2 | `545788` |
| [CII](https://lda.data.parliament.uk/terms/74410) | Latin | 0.91 | 1 | `74410` |
| [CIWM](https://lda.data.parliament.uk/terms/74465) | Welsh | 0.91 | 1 | `74465` |
| [CWN](https://lda.data.parliament.uk/terms/75105) | Welsh | 0.91 | 1 | `75105` |
| [GBGB](https://lda.data.parliament.uk/terms/76082) | German | 0.91 | 1 | `76082` |
| [GLAA](https://lda.data.parliament.uk/terms/76166) | Dutch | 0.91 | 1 | `76166` |
| [JRCALC](https://lda.data.parliament.uk/terms/78252) | Italian | 0.91 | 1 | `78252` |
| [Anaemia](https://lda.data.parliament.uk/terms/8343) | Latin | 0.91 | 1 | `8343` |
| [Deutsche Telekom](https://lda.data.parliament.uk/terms/28947) | German | 0.9 | 2 | `28947` |
| [Lautenschlager, H](https://lda.data.parliament.uk/terms/301781) | German | 0.9 | 2 | `301781` |
| [Marinos, Ioannis](https://lda.data.parliament.uk/terms/302128) | Latin | 0.9 | 2 | `302128` |
| [Varvitsiotis, Ioannis](https://lda.data.parliament.uk/terms/304174) | Latin | 0.9 | 2 | `304174` |
| [CNWRGC](https://lda.data.parliament.uk/terms/308814) | Welsh | 0.9 | 1 | `308814` |
| [Lautenschlager,H](https://lda.data.parliament.uk/terms/318056) | German | 0.9 | 1 | `318056` |
| [Marinos,Ioannis](https://lda.data.parliament.uk/terms/319580) | Latin | 0.9 | 1 | `319580` |
| [BBC CWR](https://lda.data.parliament.uk/terms/3407) | Welsh | 0.9 | 2 | `3407` |
| [Hohlmeier, Monika](https://lda.data.parliament.uk/terms/347475) | German | 0.9 | 2 | `347475` |
| [Groupe lyonnaise des eaux](https://lda.data.parliament.uk/terms/35198) | French | 0.9 | 4 | `35198` |
| [Adactus](https://lda.data.parliament.uk/terms/364) | Latin | 0.9 | 1 | `364` |
| [Gofal Cymuned Clwydian Community Care NHS Trust](https://lda.data.parliament.uk/terms/36730) | Welsh | 0.9 | 7 | `36730` |
| [Teledyne e2v](https://lda.data.parliament.uk/terms/449133) | Welsh | 0.9 | 2 | `449133` |
| [Davies, Gwilym Elfed](https://lda.data.parliament.uk/terms/461242) | Welsh | 0.9 | 3 | `461242` |
| [Gwilym Elfed Davies](https://lda.data.parliament.uk/terms/461244) | Welsh | 0.9 | 3 | `461244` |
| [An t-Eilean Muileach](https://lda.data.parliament.uk/terms/492733) | Irish | 0.9 | 3 | `492733` |
| [Graphcore](https://lda.data.parliament.uk/terms/506089) | Latin | 0.9 | 1 | `506089` |
| [ALLRAIL](https://lda.data.parliament.uk/terms/508305) | Irish | 0.9 | 1 | `508305` |
| [Parry, Bryn](https://lda.data.parliament.uk/terms/512064) | Welsh | 0.9 | 2 | `512064` |
| [Bryn Parry](https://lda.data.parliament.uk/terms/512066) | Welsh | 0.9 | 2 | `512066` |
| [Subhdeep Singh Sidhu](https://lda.data.parliament.uk/terms/512195) | Irish | 0.9 | 3 | `512195` |
| [Sidhu, Subhdeep Singh](https://lda.data.parliament.uk/terms/512197) | Irish | 0.9 | 3 | `512197` |
| [Sidhu, Shubhdeep Singh](https://lda.data.parliament.uk/terms/512199) | Irish | 0.9 | 3 | `512199` |
| [Shubhdeep Singh Sidhu](https://lda.data.parliament.uk/terms/512201) | Irish | 0.9 | 3 | `512201` |
| [Statkraft](https://lda.data.parliament.uk/terms/525238) | German | 0.9 | 1 | `525238` |
| [Istituto nazionale di astrofisica](https://lda.data.parliament.uk/terms/543995) | Italian | 0.9 | 4 | `543995` |
| [Americium](https://lda.data.parliament.uk/terms/573244) | Latin | 0.9 | 1 | `573244` |
| [CAA](https://lda.data.parliament.uk/terms/73813) | Dutch | 0.9 | 1 | `73813` |
| [CIWSY](https://lda.data.parliament.uk/terms/74466) | Welsh | 0.9 | 1 | `74466` |
| [CMSSC](https://lda.data.parliament.uk/terms/74524) | German | 0.9 | 1 | `74524` |
| [Impfstoffwerke Dessau Tornan](https://lda.data.parliament.uk/terms/77664) | German | 0.9 | 3 | `77664` |
| [Impfstoffwerke Dessau-Tornan](https://lda.data.parliament.uk/terms/77667) | German | 0.9 | 2 | `77667` |
| [Dacorum](https://lda.data.parliament.uk/terms/78708) | Latin | 0.9 | 1 | `78708` |
| [Swissair](https://lda.data.parliament.uk/terms/82407) | French | 0.9 | 1 | `82407` |
| [Theatre Clwyd](https://lda.data.parliament.uk/terms/83542) | Welsh | 0.9 | 2 | `83542` |
| [Clwyd West](https://lda.data.parliament.uk/terms/9222) | Welsh | 0.9 | 2 | `9222` |
| [NFU Cymru](https://lda.data.parliament.uk/terms/96753) | Welsh | 0.9 | 2 | `96753` |
| [NIMHE](https://lda.data.parliament.uk/terms/96958) | Irish | 0.9 | 1 | `96958` |
| [REITOX](https://lda.data.parliament.uk/terms/99163) | Portuguese | 0.9 | 1 | `99163` |
| [Tungsten](https://lda.data.parliament.uk/terms/13404) | German | 0.89 | 1 | `13404` |
| [Encyclopaedia Judaica](https://lda.data.parliament.uk/terms/17568) | Latin | 0.89 | 2 | `17568` |
| [Chwarae Teg](https://lda.data.parliament.uk/terms/24776) | Welsh | 0.89 | 2 | `24776` |
| [Hybu Cig Cymru](https://lda.data.parliament.uk/terms/26284) | Welsh | 0.89 | 3 | `26284` |
| [Dyffryn Clydach Community Council](https://lda.data.parliament.uk/terms/290509) | Welsh | 0.89 | 4 | `290509` |
| [WYG](https://lda.data.parliament.uk/terms/297357) | Welsh | 0.89 | 1 | `297357` |
| [AWG](https://lda.data.parliament.uk/terms/2983) | Welsh | 0.89 | 1 | `2983` |
| [Duhrkop Duhrkop, Barbara](https://lda.data.parliament.uk/terms/300267) | German | 0.89 | 3 | `300267` |
| [Lagendijk, Joost](https://lda.data.parliament.uk/terms/301733) | Dutch | 0.89 | 2 | `301733` |
| [Varitsiotis, Ioannis](https://lda.data.parliament.uk/terms/304171) | Latin | 0.89 | 2 | `304171` |
| [Duhrkop Duhrkop,Barbara](https://lda.data.parliament.uk/terms/311364) | German | 0.89 | 2 | `311364` |
| [Carwyn Jones](https://lda.data.parliament.uk/terms/316838) | Welsh | 0.89 | 2 | `316838` |
| [Lagendijk,Joost](https://lda.data.parliament.uk/terms/317860) | Dutch | 0.89 | 1 | `317860` |
| [Feile an Phobail](https://lda.data.parliament.uk/terms/34137) | Irish | 0.89 | 3 | `34137` |
| [Friedrich-Ebert-Stiftung](https://lda.data.parliament.uk/terms/35055) | German | 0.89 | 1 | `35055` |
| [Geographia](https://lda.data.parliament.uk/terms/36377) | Latin | 0.89 | 1 | `36377` |
| [Gofal Cymru](https://lda.data.parliament.uk/terms/36729) | Welsh | 0.89 | 2 | `36729` |
| [Thomas of Cwmgiedd, Lord](https://lda.data.parliament.uk/terms/397564) | Welsh | 0.89 | 4 | `397564` |
| [Lord Thomas of Cwmgiedd](https://lda.data.parliament.uk/terms/400825) | Welsh | 0.89 | 4 | `400825` |
| [Crawshaw, Richard](https://lda.data.parliament.uk/terms/402627) | Welsh | 0.89 | 2 | `402627` |
| [Richard Crawshaw](https://lda.data.parliament.uk/terms/413243) | Welsh | 0.89 | 2 | `413243` |
| [NAFN](https://lda.data.parliament.uk/terms/430402) | Welsh | 0.89 | 1 | `430402` |
| [Novus](https://lda.data.parliament.uk/terms/436016) | Latin | 0.89 | 1 | `436016` |
| [VKontakte](https://lda.data.parliament.uk/terms/449683) | German | 0.89 | 1 | `449683` |
| [Dystrophia retinae dysacusis syndrome](https://lda.data.parliament.uk/terms/449988) | Latin | 0.89 | 4 | `449988` |
| [Myxomatosis](https://lda.data.parliament.uk/terms/450046) | Latin | 0.89 | 1 | `450046` |
| [Compagnie luxembourgeoise de navigation](https://lda.data.parliament.uk/terms/476897) | French | 0.89 | 4 | `476897` |
| [Pencoed](https://lda.data.parliament.uk/terms/512006) | Welsh | 0.89 | 1 | `512006` |
| [AMRAAM](https://lda.data.parliament.uk/terms/51724) | Dutch | 0.89 | 1 | `51724` |
| [Mathias Corvinus Collegium](https://lda.data.parliament.uk/terms/517663) | Latin | 0.89 | 3 | `517663` |
| [BRIXMISS](https://lda.data.parliament.uk/terms/51838) | Latin | 0.89 | 1 | `51838` |
| [Hyperemesis gravidarum](https://lda.data.parliament.uk/terms/519426) | Latin | 0.89 | 2 | `519426` |
| [Evans, Elfyn](https://lda.data.parliament.uk/terms/520969) | Welsh | 0.89 | 2 | `520969` |
| [Elfyn Evans](https://lda.data.parliament.uk/terms/520971) | Welsh | 0.89 | 2 | `520971` |
| [3-nitrooxypropanol](https://lda.data.parliament.uk/terms/523390) | Welsh | 0.89 | 1 | `523390` |
| [Jones, Carwyn](https://lda.data.parliament.uk/terms/553914) | Welsh | 0.89 | 2 | `553914` |
| [Comhaltas](https://lda.data.parliament.uk/terms/567932) | Irish | 0.89 | 1 | `567932` |
| [Sarum 89](https://lda.data.parliament.uk/terms/67520) | Latin | 0.89 | 2 | `67520` |
| [CADW](https://lda.data.parliament.uk/terms/73835) | Welsh | 0.89 | 1 | `73835` |
| [CEAC](https://lda.data.parliament.uk/terms/74074) | Irish | 0.89 | 1 | `74074` |
| [Deutscher Bundestag](https://lda.data.parliament.uk/terms/75348) | German | 0.89 | 2 | `75348` |
| [Enfys](https://lda.data.parliament.uk/terms/77385) | Welsh | 0.89 | 1 | `77385` |
| [NTTF](https://lda.data.parliament.uk/terms/78742) | German | 0.89 | 1 | `78742` |
| [MACCANC](https://lda.data.parliament.uk/terms/79016) | Italian | 0.89 | 1 | `79016` |
| [Mexican Partido Revolucionario Institucional](https://lda.data.parliament.uk/terms/79219) | Spanish | 0.89 | 4 | `79219` |
| [Vlaams Belang](https://lda.data.parliament.uk/terms/85772) | Dutch | 0.89 | 2 | `85772` |
| [NCCL](https://lda.data.parliament.uk/terms/96595) | Latin | 0.89 | 1 | `96595` |
| [NISGS](https://lda.data.parliament.uk/terms/96971) | Welsh | 0.89 | 1 | `96971` |
| [An Droichead](https://lda.data.parliament.uk/terms/1378) | Irish | 0.88 | 2 | `1378` |
| [BZW](https://lda.data.parliament.uk/terms/16994) | German | 0.88 | 1 | `16994` |
| [Cam Ymlaen](https://lda.data.parliament.uk/terms/18490) | Welsh | 0.88 | 2 | `18490` |
| [Impfstoffwerke Dessau-Tornau](https://lda.data.parliament.uk/terms/26468) | German | 0.88 | 2 | `26468` |
| [Priddy, Sarah](https://lda.data.parliament.uk/terms/294210) | Welsh | 0.88 | 2 | `294210` |
| [Agnoletto, Vittorio](https://lda.data.parliament.uk/terms/298781) | Italian | 0.88 | 2 | `298781` |
| [Khanbhai, Bashir](https://lda.data.parliament.uk/terms/301612) | Irish | 0.88 | 2 | `301612` |
| [Koukiadis, Ioannis](https://lda.data.parliament.uk/terms/301699) | Latin | 0.88 | 2 | `301699` |
| [Meijer, Erik](https://lda.data.parliament.uk/terms/302350) | Dutch | 0.88 | 2 | `302350` |
| [Rossetti, Giorgio](https://lda.data.parliament.uk/terms/303323) | Italian | 0.88 | 2 | `303323` |
| [Khanbhai,Bashir](https://lda.data.parliament.uk/terms/317380) | Irish | 0.88 | 1 | `317380` |
| [Koukiadis,Ioannis](https://lda.data.parliament.uk/terms/317764) | Latin | 0.88 | 1 | `317764` |
| [Agoriad Cyf](https://lda.data.parliament.uk/terms/398504) | Welsh | 0.88 | 2 | `398504` |
| [Amicus curiae](https://lda.data.parliament.uk/terms/402485) | Latin | 0.88 | 2 | `402485` |
| [Optum](https://lda.data.parliament.uk/terms/421727) | Latin | 0.88 | 1 | `421727` |
| [HAAT](https://lda.data.parliament.uk/terms/429434) | Dutch | 0.88 | 1 | `429434` |
| [Crocetta, Rosario](https://lda.data.parliament.uk/terms/431429) | Italian | 0.88 | 2 | `431429` |
| [Llanelli Dinefwr NHS Trust](https://lda.data.parliament.uk/terms/43144) | Welsh | 0.88 | 4 | `43144` |
| [Internationale Nederlanden Groep](https://lda.data.parliament.uk/terms/437673) | Dutch | 0.88 | 3 | `437673` |
| [Institut national de la recherche agronomique](https://lda.data.parliament.uk/terms/438425) | French | 0.88 | 6 | `438425` |
| [David Thomas Gluffydd Evans](https://lda.data.parliament.uk/terms/460713) | Welsh | 0.88 | 4 | `460713` |
| [NFTS](https://lda.data.parliament.uk/terms/4787) | German | 0.88 | 1 | `4787` |
| [Ips typographus](https://lda.data.parliament.uk/terms/489867) | Latin | 0.88 | 2 | `489867` |
| [Dodd, Malcolm](https://lda.data.parliament.uk/terms/490167) | Welsh | 0.88 | 2 | `490167` |
| [Malcolm Dodd](https://lda.data.parliament.uk/terms/490169) | Welsh | 0.88 | 2 | `490169` |
| [Phytophthora pluvialis](https://lda.data.parliament.uk/terms/501804) | Latin | 0.88 | 2 | `501804` |
| [Tenant management organisations](https://lda.data.parliament.uk/terms/505684) | French | 0.88 | 3 | `505684` |
| [AVITG](https://lda.data.parliament.uk/terms/53917) | Latin | 0.88 | 1 | `53917` |
| [BHRA](https://lda.data.parliament.uk/terms/54242) | Irish | 0.88 | 1 | `54242` |
| [Clwyd East](https://lda.data.parliament.uk/terms/545786) | Welsh | 0.88 | 2 | `545786` |
| [O Ceallaigh, Greg](https://lda.data.parliament.uk/terms/558150) | Irish | 0.88 | 3 | `558150` |
| [Greg O Ceallaigh](https://lda.data.parliament.uk/terms/558152) | Irish | 0.88 | 3 | `558152` |
| [Accurx](https://lda.data.parliament.uk/terms/563986) | Latin | 0.88 | 1 | `563986` |
| [Polizzi, Gianfranco](https://lda.data.parliament.uk/terms/564356) | Italian | 0.88 | 2 | `564356` |
| [Gianfranco Polizzi](https://lda.data.parliament.uk/terms/564358) | Italian | 0.88 | 2 | `564358` |
| [Pontypridd and Rhondda College](https://lda.data.parliament.uk/terms/57410) | Welsh | 0.88 | 4 | `57410` |
| [Preas an Phobail](https://lda.data.parliament.uk/terms/61812) | Irish | 0.88 | 3 | `61812` |
| [Schutz Staffel](https://lda.data.parliament.uk/terms/67708) | German | 0.88 | 2 | `67708` |
| [CAAT](https://lda.data.parliament.uk/terms/73818) | Dutch | 0.88 | 1 | `73818` |
| [Coleg Penybont](https://lda.data.parliament.uk/terms/76400) | Welsh | 0.88 | 2 | `76400` |
| [Impfstoffwerke Dessau Tornau](https://lda.data.parliament.uk/terms/77665) | German | 0.88 | 3 | `77665` |
| [MIIS](https://lda.data.parliament.uk/terms/79260) | Latin | 0.88 | 1 | `79260` |
| [Plaid Cymru](https://lda.data.parliament.uk/terms/82790) | Welsh | 0.88 | 2 | `82790` |
| [Clwyd South](https://lda.data.parliament.uk/terms/9221) | Welsh | 0.88 | 2 | `9221` |
| [Delyn](https://lda.data.parliament.uk/terms/9603) | Welsh | 0.88 | 1 | `9603` |
| [Rhondda Cynon Taf](https://lda.data.parliament.uk/terms/12504) | Welsh | 0.87 | 3 | `12504` |
| [Inntrepreneur Pub](https://lda.data.parliament.uk/terms/26918) | French | 0.87 | 2 | `26918` |
| [McDonagh, Siobhain](https://lda.data.parliament.uk/terms/302266) | Irish | 0.87 | 2 | `302266` |
| [Musotto, Francesco](https://lda.data.parliament.uk/terms/302589) | Italian | 0.87 | 2 | `302589` |
| [Williams, Hywel](https://lda.data.parliament.uk/terms/304410) | Welsh | 0.87 | 2 | `304410` |
| [CEMRGC](https://lda.data.parliament.uk/terms/308810) | Welsh | 0.87 | 1 | `308810` |
| [Siobhain McDonagh](https://lda.data.parliament.uk/terms/320198) | Irish | 0.87 | 2 | `320198` |
| [Musotto,Francesco](https://lda.data.parliament.uk/terms/321862) | Italian | 0.87 | 1 | `321862` |
| [Hywel Williams](https://lda.data.parliament.uk/terms/329374) | Welsh | 0.87 | 2 | `329374` |
| [Institut royal des relations internationales Bruxelles](https://lda.data.parliament.uk/terms/395115) | French | 0.87 | 6 | `395115` |
| [Ecole des hautes etudes en sciences sociales](https://lda.data.parliament.uk/terms/395191) | French | 0.87 | 7 | `395191` |
| [Pargneaux, Gilles](https://lda.data.parliament.uk/terms/417756) | French | 0.87 | 2 | `417756` |
| [Bertelsmann Stiftung](https://lda.data.parliament.uk/terms/437879) | German | 0.87 | 2 | `437879` |
| [Lyonnaise des eaux](https://lda.data.parliament.uk/terms/43881) | French | 0.87 | 3 | `43881` |
| [Jaabees, Israa](https://lda.data.parliament.uk/terms/446223) | Dutch | 0.87 | 2 | `446223` |
| [Israa Jaabees](https://lda.data.parliament.uk/terms/446225) | Dutch | 0.87 | 2 | `446225` |
| [Latymer, Lord](https://lda.data.parliament.uk/terms/447203) | Welsh | 0.87 | 2 | `447203` |
| [Lord Latymer](https://lda.data.parliament.uk/terms/447205) | Welsh | 0.87 | 2 | `447205` |
| [Cedyrn](https://lda.data.parliament.uk/terms/450999) | Welsh | 0.87 | 1 | `450999` |
| [Hamlyn, Paul](https://lda.data.parliament.uk/terms/464242) | Welsh | 0.87 | 2 | `464242` |
| [Paul Hamlyn](https://lda.data.parliament.uk/terms/464244) | Welsh | 0.87 | 2 | `464244` |
| [Rees-Williams, Gwilym Rees](https://lda.data.parliament.uk/terms/465741) | Welsh | 0.87 | 3 | `465741` |
| [Gwilym Rees Rees-Williams](https://lda.data.parliament.uk/terms/465743) | Welsh | 0.87 | 3 | `465743` |
| [Centre national de la recherche scientifique](https://lda.data.parliament.uk/terms/472372) | French | 0.87 | 6 | `472372` |
| [SSBNs](https://lda.data.parliament.uk/terms/489361) | Italian | 0.87 | 1 | `489361` |
| [Colwyn Philipps](https://lda.data.parliament.uk/terms/505478) | Welsh | 0.87 | 2 | `505478` |
| [Office national d'etudes et de recherches aerospatiales](https://lda.data.parliament.uk/terms/552909) | French | 0.87 | 7 | `552909` |
| [Institut national des langues et civilisations orientales](https://lda.data.parliament.uk/terms/575567) | French | 0.87 | 7 | `575567` |
| [CCFR](https://lda.data.parliament.uk/terms/74032) | Latin | 0.87 | 1 | `74032` |
| [Cellules Communistes Combattantes](https://lda.data.parliament.uk/terms/74107) | French | 0.87 | 3 | `74107` |
| [Estonian Riigikogu](https://lda.data.parliament.uk/terms/75540) | Latin | 0.87 | 2 | `75540` |
| [IWSA](https://lda.data.parliament.uk/terms/78146) | Welsh | 0.87 | 1 | `78146` |
| [Blaby](https://lda.data.parliament.uk/terms/8692) | Welsh | 0.87 | 1 | `8692` |
| [Carmarthen East and Dinefwr](https://lda.data.parliament.uk/terms/8989) | Welsh | 0.87 | 4 | `8989` |
| [NATFHE](https://lda.data.parliament.uk/terms/96266) | Irish | 0.87 | 1 | `96266` |
| [NFWPM](https://lda.data.parliament.uk/terms/96757) | Welsh | 0.87 | 1 | `96757` |
| [NISEAC](https://lda.data.parliament.uk/terms/96970) | Irish | 0.87 | 1 | `96970` |
| [NLBANDD](https://lda.data.parliament.uk/terms/96988) | Welsh | 0.87 | 1 | `96988` |
| [Vale of Clwyd](https://lda.data.parliament.uk/terms/13567) | Welsh | 0.86 | 3 | `13567` |
| [Aquarius](https://lda.data.parliament.uk/terms/1654) | Latin | 0.86 | 1 | `1654` |
| [Dacorum College](https://lda.data.parliament.uk/terms/28187) | Latin | 0.86 | 2 | `28187` |
| [Boothby, Bob](https://lda.data.parliament.uk/terms/291855) | Welsh | 0.86 | 2 | `291855` |
| [Gwynt y Ddraig](https://lda.data.parliament.uk/terms/297391) | Welsh | 0.86 | 3 | `297391` |
| [Bourne of Aberystwyth, Lord](https://lda.data.parliament.uk/terms/299283) | Welsh | 0.86 | 4 | `299283` |
| [Ceravolo, Domenico](https://lda.data.parliament.uk/terms/299649) | Italian | 0.86 | 2 | `299649` |
| [De Keersmaeker, P](https://lda.data.parliament.uk/terms/300085) | Dutch | 0.86 | 3 | `300085` |
| [Neyts-Uyttebroeck, Annemie](https://lda.data.parliament.uk/terms/302642) | Dutch | 0.86 | 2 | `302642` |
| [Thomas, Gareth (Clwyd West)](https://lda.data.parliament.uk/terms/303974) | Welsh | 0.86 | 4 | `303974` |
| [Turco, Maurizio](https://lda.data.parliament.uk/terms/304091) | Italian | 0.86 | 2 | `304091` |
| [Ceravolo,Domenico](https://lda.data.parliament.uk/terms/308794) | Italian | 0.86 | 1 | `308794` |
| [De Keersmaeker,P](https://lda.data.parliament.uk/terms/310694) | Dutch | 0.86 | 2 | `310694` |
| [Alastair Llewellyn John Redfern](https://lda.data.parliament.uk/terms/310876) | Welsh | 0.86 | 4 | `310876` |
| [Neyts-Uyttebroeck,Annemie](https://lda.data.parliament.uk/terms/322102) | Dutch | 0.86 | 1 | `322102` |
| [Izquierdo, Juan de Dios](https://lda.data.parliament.uk/terms/323730) | Spanish | 0.86 | 4 | `323730` |
| [Gareth Thomas (Clwyd West)](https://lda.data.parliament.uk/terms/327512) | Welsh | 0.86 | 4 | `327512` |
| [Redfern, Alastair Llewellyn John](https://lda.data.parliament.uk/terms/362552) | Welsh | 0.86 | 4 | `362552` |
| [EFNCP](https://lda.data.parliament.uk/terms/364468) | Welsh | 0.86 | 1 | `364468` |
| [Lord Bourne of Aberystwyth](https://lda.data.parliament.uk/terms/398784) | Welsh | 0.86 | 4 | `398784` |
| [Everolimus](https://lda.data.parliament.uk/terms/418338) | Latin | 0.86 | 1 | `418338` |
| [Carborundum](https://lda.data.parliament.uk/terms/422168) | Latin | 0.86 | 1 | `422168` |
| [Cornelis Vrolijk](https://lda.data.parliament.uk/terms/434070) | Dutch | 0.86 | 2 | `434070` |
| [Valium](https://lda.data.parliament.uk/terms/438610) | Latin | 0.86 | 1 | `438610` |
| [EasyPeasy](https://lda.data.parliament.uk/terms/444736) | Spanish | 0.86 | 1 | `444736` |
| [Interxion](https://lda.data.parliament.uk/terms/455880) | Latin | 0.86 | 1 | `455880` |
| [Vattenfall](https://lda.data.parliament.uk/terms/466459) | German | 0.86 | 1 | `466459` |
| [AAN](https://lda.data.parliament.uk/terms/478087) | Dutch | 0.86 | 1 | `478087` |
| [Erasmus Universiteit Rotterdam](https://lda.data.parliament.uk/terms/484425) | Dutch | 0.86 | 3 | `484425` |
| [FHSAs](https://lda.data.parliament.uk/terms/49921) | Irish | 0.86 | 1 | `49921` |
| [NCCC](https://lda.data.parliament.uk/terms/503044) | Latin | 0.86 | 1 | `503044` |
| [Llandysul](https://lda.data.parliament.uk/terms/519412) | Welsh | 0.86 | 1 | `519412` |
| [PEUMP](https://lda.data.parliament.uk/terms/520375) | Latin | 0.86 | 1 | `520375` |
| [Binder Dijker Otte](https://lda.data.parliament.uk/terms/522130) | Dutch | 0.86 | 3 | `522130` |
| [Nu Quantum](https://lda.data.parliament.uk/terms/525723) | Latin | 0.86 | 2 | `525723` |
| [BFTPA](https://lda.data.parliament.uk/terms/54218) | Dutch | 0.86 | 1 | `54218` |
| [An Foras Teanga](https://lda.data.parliament.uk/terms/54619) | Irish | 0.86 | 3 | `54619` |
| [Caernarfon Town Football Club](https://lda.data.parliament.uk/terms/549056) | Welsh | 0.86 | 4 | `549056` |
| [Ovum](https://lda.data.parliament.uk/terms/60746) | Latin | 0.86 | 1 | `60746` |
| [Primeiro Comando da Capital](https://lda.data.parliament.uk/terms/61933) | Portuguese | 0.86 | 4 | `61933` |
| [QinetiQ](https://lda.data.parliament.uk/terms/65583) | Latin | 0.86 | 1 | `65583` |
| [BWRC](https://lda.data.parliament.uk/terms/73776) | Welsh | 0.86 | 1 | `73776` |
| [FAW](https://lda.data.parliament.uk/terms/75762) | Welsh | 0.86 | 1 | `75762` |
| [GLYNI](https://lda.data.parliament.uk/terms/76202) | Welsh | 0.86 | 1 | `76202` |
| [HIW](https://lda.data.parliament.uk/terms/76618) | Welsh | 0.86 | 1 | `76618` |
| [ENGND](https://lda.data.parliament.uk/terms/77406) | Irish | 0.86 | 1 | `77406` |
| [Unum](https://lda.data.parliament.uk/terms/85210) | Latin | 0.86 | 1 | `85210` |
| [Eccles](https://lda.data.parliament.uk/terms/9833) | Latin | 0.86 | 1 | `9833` |
| [PAWB](https://lda.data.parliament.uk/terms/98548) | Welsh | 0.86 | 1 | `98548` |
| [JFS](https://lda.data.parliament.uk/terms/11093) | Dutch | 0.85 | 1 | `11093` |
| [Isotretinoin](https://lda.data.parliament.uk/terms/12541) | French | 0.85 | 1 | `12541` |
| [Centrum voor Bevolkings-en Gezinsstudie](https://lda.data.parliament.uk/terms/19913) | Dutch | 0.85 | 4 | `19913` |
| [Coleg Ceredigion](https://lda.data.parliament.uk/terms/19932) | Welsh | 0.85 | 2 | `19932` |
| [Civitas](https://lda.data.parliament.uk/terms/20667) | Latin | 0.85 | 1 | `20667` |
| [Comunn Na Gaidhlig](https://lda.data.parliament.uk/terms/26005) | Irish | 0.85 | 3 | `26005` |
| [Deutsche Bahn](https://lda.data.parliament.uk/terms/28940) | German | 0.85 | 2 | `28940` |
| [DWF](https://lda.data.parliament.uk/terms/29677) | Welsh | 0.85 | 1 | `29677` |
| [Livsey of Talgarth, Lord](https://lda.data.parliament.uk/terms/301933) | Welsh | 0.85 | 4 | `301933` |
| [Quierdo Collado, Juan de Dios](https://lda.data.parliament.uk/terms/303092) | Spanish | 0.85 | 5 | `303092` |
| [Quisthoudt-Rowohl, Godelieve](https://lda.data.parliament.uk/terms/303099) | Dutch | 0.85 | 2 | `303099` |
| [Theonas, Ioannis](https://lda.data.parliament.uk/terms/303963) | Latin | 0.85 | 2 | `303963` |
| [Schaake, Marietje](https://lda.data.parliament.uk/terms/347401) | Dutch | 0.85 | 2 | `347401` |
| [Ungureanu, Traian](https://lda.data.parliament.uk/terms/347496) | Latin | 0.85 | 2 | `347496` |
| [Groupe des assurances nationales](https://lda.data.parliament.uk/terms/35207) | French | 0.85 | 4 | `35207` |
| [NNFCC](https://lda.data.parliament.uk/terms/361468) | French | 0.85 | 1 | `361468` |
| [Institut fur Wirtschaftspolitik an der Universitat zu Koln](https://lda.data.parliament.uk/terms/416889) | German | 0.85 | 8 | `416889` |
| [Vellum](https://lda.data.parliament.uk/terms/423094) | Latin | 0.85 | 1 | `423094` |
| [TeachVac](https://lda.data.parliament.uk/terms/423752) | Welsh | 0.85 | 1 | `423752` |
| [Llangollen International Musical Eisteddfod](https://lda.data.parliament.uk/terms/43149) | Welsh | 0.85 | 4 | `43149` |
| [Llechwedd Slate Caverns](https://lda.data.parliament.uk/terms/43150) | Welsh | 0.85 | 3 | `43150` |
| [HMP Berwyn](https://lda.data.parliament.uk/terms/434910) | Welsh | 0.85 | 2 | `434910` |
| [AVEVA](https://lda.data.parliament.uk/terms/440309) | Italian | 0.85 | 1 | `440309` |
| [Margram](https://lda.data.parliament.uk/terms/44203) | Welsh | 0.85 | 1 | `44203` |
| [Britannia](https://lda.data.parliament.uk/terms/4442) | Latin | 0.85 | 1 | `4442` |
| [Lord Livsey of Talgarth](https://lda.data.parliament.uk/terms/449294) | Welsh | 0.85 | 4 | `449294` |
| [Hyperammonaemia](https://lda.data.parliament.uk/terms/450160) | Latin | 0.85 | 1 | `450160` |
| [Merched y Wawr](https://lda.data.parliament.uk/terms/45418) | Welsh | 0.85 | 3 | `45418` |
| [Cattanach](https://lda.data.parliament.uk/terms/477910) | Irish | 0.85 | 1 | `477910` |
| [GM1 gangliosidosis](https://lda.data.parliament.uk/terms/488761) | Latin | 0.85 | 2 | `488761` |
| [Guajajara, Janildo Oliveira](https://lda.data.parliament.uk/terms/505755) | Portuguese | 0.85 | 3 | `505755` |
| [Janildo Oliveira Guajajara](https://lda.data.parliament.uk/terms/505757) | Portuguese | 0.85 | 3 | `505757` |
| [Caernarvon](https://lda.data.parliament.uk/terms/51857) | Welsh | 0.85 | 1 | `51857` |
| [Arcanum](https://lda.data.parliament.uk/terms/527960) | Latin | 0.85 | 1 | `527960` |
| [BAECE](https://lda.data.parliament.uk/terms/53991) | Latin | 0.85 | 1 | `53991` |
| [Bord na Gaidhlig](https://lda.data.parliament.uk/terms/545343) | Irish | 0.85 | 3 | `545343` |
| [HMYOI Prescoed](https://lda.data.parliament.uk/terms/555389) | Welsh | 0.85 | 2 | `555389` |
| [LanzaJet](https://lda.data.parliament.uk/terms/563673) | Spanish | 0.85 | 1 | `563673` |
| [Teledyne UK](https://lda.data.parliament.uk/terms/569713) | Welsh | 0.85 | 2 | `569713` |
| [Amentum](https://lda.data.parliament.uk/terms/576222) | Latin | 0.85 | 1 | `576222` |
| [UKIFDA](https://lda.data.parliament.uk/terms/578877) | Welsh | 0.85 | 1 | `578877` |
| [Lavallee, Albie](https://lda.data.parliament.uk/terms/583153) | Dutch | 0.85 | 2 | `583153` |
| [Albie Lavallee](https://lda.data.parliament.uk/terms/583155) | Dutch | 0.85 | 2 | `583155` |
| [BWLA](https://lda.data.parliament.uk/terms/73773) | Welsh | 0.85 | 1 | `73773` |
| [COMECE](https://lda.data.parliament.uk/terms/74602) | Portuguese | 0.85 | 1 | `74602` |
| [CYTUN](https://lda.data.parliament.uk/terms/75141) | Welsh | 0.85 | 1 | `75141` |
| [HFEA](https://lda.data.parliament.uk/terms/76575) | Irish | 0.85 | 1 | `76575` |
| [BRIXMIS](https://lda.data.parliament.uk/terms/8839) | Latin | 0.85 | 1 | `8839` |
| [Madeira](https://lda.data.parliament.uk/terms/11472) | Portuguese | 0.84 | 1 | `11472` |
| [Snowdonia](https://lda.data.parliament.uk/terms/12857) | Welsh | 0.84 | 1 | `12857` |
| [Welwyn Hatfield](https://lda.data.parliament.uk/terms/13714) | Welsh | 0.84 | 2 | `13714` |
| [Edwards of Conwy](https://lda.data.parliament.uk/terms/17282) | Welsh | 0.84 | 3 | `17282` |
| [Institut monetaire luxembourgeois](https://lda.data.parliament.uk/terms/26965) | French | 0.84 | 3 | `26965` |
| [Legatum Institute](https://lda.data.parliament.uk/terms/298529) | Latin | 0.84 | 2 | `298529` |
| [Brunetta, Renato](https://lda.data.parliament.uk/terms/299423) | Italian | 0.84 | 2 | `299423` |
| [Hamlyn, Lord](https://lda.data.parliament.uk/terms/301024) | Welsh | 0.84 | 2 | `301024` |
| [Mathieu Houillon, Veronique](https://lda.data.parliament.uk/terms/302192) | French | 0.84 | 3 | `302192` |
| [Mayor Oreja, Jaime](https://lda.data.parliament.uk/terms/302222) | Spanish | 0.84 | 3 | `302222` |
| [Roubatis, Ioannis](https://lda.data.parliament.uk/terms/303336) | Latin | 0.84 | 2 | `303336` |
| [Toia, Patrizia](https://lda.data.parliament.uk/terms/304017) | Italian | 0.84 | 2 | `304017` |
| [Vattimo, Gianni](https://lda.data.parliament.uk/terms/304176) | Italian | 0.84 | 2 | `304176` |
| [Federation europeenne des transformateurs de tabac](https://lda.data.parliament.uk/terms/306078) | French | 0.84 | 6 | `306078` |
| [Brunetta,Renato](https://lda.data.parliament.uk/terms/307842) | Italian | 0.84 | 1 | `307842` |
| [Buitenweg, Kathalijne Maria](https://lda.data.parliament.uk/terms/307928) | Dutch | 0.84 | 3 | `307928` |
| [Buitenweg,Kathalijne Maria](https://lda.data.parliament.uk/terms/307929) | Dutch | 0.84 | 2 | `307929` |
| [Fforwm](https://lda.data.parliament.uk/terms/34192) | Welsh | 0.84 | 1 | `34192` |
| [Grwp Gwalia Cyf](https://lda.data.parliament.uk/terms/35219) | Welsh | 0.84 | 3 | `35219` |
| [IARIW](https://lda.data.parliament.uk/terms/394626) | Welsh | 0.84 | 1 | `394626` |
| [NWG](https://lda.data.parliament.uk/terms/394718) | Welsh | 0.84 | 1 | `394718` |
| [OPQ](https://lda.data.parliament.uk/terms/403389) | Latin | 0.84 | 1 | `403389` |
| [Lord Hamlyn](https://lda.data.parliament.uk/terms/407749) | Welsh | 0.84 | 2 | `407749` |
| [Cuddledry](https://lda.data.parliament.uk/terms/423505) | Welsh | 0.84 | 1 | `423505` |
| [MSSA bacteraemia](https://lda.data.parliament.uk/terms/428913) | Latin | 0.84 | 2 | `428913` |
| [Unaoil](https://lda.data.parliament.uk/terms/435026) | Irish | 0.84 | 1 | `435026` |
| [Vitae](https://lda.data.parliament.uk/terms/436904) | Latin | 0.84 | 1 | `436904` |
| [Inuit Tapiriit Kanatami](https://lda.data.parliament.uk/terms/437717) | Latin | 0.84 | 3 | `437717` |
| [Maison des sciences de l'homme](https://lda.data.parliament.uk/terms/43999) | French | 0.84 | 5 | `43999` |
| [BSWN](https://lda.data.parliament.uk/terms/443189) | Welsh | 0.84 | 1 | `443189` |
| [Gregory Philip Roger Lloyd Mostyn](https://lda.data.parliament.uk/terms/446904) | Welsh | 0.84 | 5 | `446904` |
| [Mostyn, Gregory Philip Roger Lloyd](https://lda.data.parliament.uk/terms/446906) | Welsh | 0.84 | 5 | `446906` |
| [DEGW](https://lda.data.parliament.uk/terms/459479) | Welsh | 0.84 | 1 | `459479` |
| [LLETZ](https://lda.data.parliament.uk/terms/459972) | German | 0.84 | 1 | `459972` |
| [Jones, Elwyn](https://lda.data.parliament.uk/terms/460687) | Welsh | 0.84 | 2 | `460687` |
| [Elwyn Jones](https://lda.data.parliament.uk/terms/460689) | Welsh | 0.84 | 2 | `460689` |
| [LBWP](https://lda.data.parliament.uk/terms/477589) | Welsh | 0.84 | 1 | `477589` |
| [Universiteit Maastricht](https://lda.data.parliament.uk/terms/483960) | Dutch | 0.84 | 2 | `483960` |
| [Banca Nazionale Del Lavoro Spa Ltd](https://lda.data.parliament.uk/terms/496072) | Italian | 0.84 | 6 | `496072` |
| [Bryn Elltyd Eco Guest House](https://lda.data.parliament.uk/terms/500437) | Welsh | 0.84 | 5 | `500437` |
| [Ytilitu](https://lda.data.parliament.uk/terms/512611) | Latin | 0.84 | 1 | `512611` |
| [Gleiss Lutz Hootz Hirsch](https://lda.data.parliament.uk/terms/516848) | German | 0.84 | 4 | `516848` |
| [Lotto](https://lda.data.parliament.uk/terms/52726) | Italian | 0.84 | 1 | `52726` |
| [NVQs](https://lda.data.parliament.uk/terms/52948) | Latin | 0.84 | 1 | `52948` |
| [BHL](https://lda.data.parliament.uk/terms/54240) | Irish | 0.84 | 1 | `54240` |
| [Tamlyn, John](https://lda.data.parliament.uk/terms/548836) | Welsh | 0.84 | 2 | `548836` |
| [John Tamlyn](https://lda.data.parliament.uk/terms/548838) | Welsh | 0.84 | 2 | `548838` |
| [Liam Og O hAnnaidh](https://lda.data.parliament.uk/terms/567227) | Irish | 0.84 | 4 | `567227` |
| [O hAnnaidh, Liam Og](https://lda.data.parliament.uk/terms/567231) | Irish | 0.84 | 4 | `567231` |
| [Hemsby](https://lda.data.parliament.uk/terms/572435) | Welsh | 0.84 | 1 | `572435` |
| [Occidental Petroleum (Caledonia)](https://lda.data.parliament.uk/terms/60160) | Latin | 0.84 | 3 | `60160` |
| [Pasteur Merieux](https://lda.data.parliament.uk/terms/61181) | French | 0.84 | 2 | `61181` |
| [Stichting Research Voor Beleid](https://lda.data.parliament.uk/terms/69297) | Dutch | 0.84 | 4 | `69297` |
| [CACFOA](https://lda.data.parliament.uk/terms/73826) | French | 0.84 | 1 | `73826` |
| [CCLGF](https://lda.data.parliament.uk/terms/74040) | Latin | 0.84 | 1 | `74040` |
| [CTCC](https://lda.data.parliament.uk/terms/75065) | Latin | 0.84 | 1 | `75065` |
| [Amsterdam](https://lda.data.parliament.uk/terms/8341) | Dutch | 0.84 | 1 | `8341` |
| [TRT Trasporti e Territorio](https://lda.data.parliament.uk/terms/84204) | Italian | 0.84 | 4 | `84204` |
| [Attendance centres](https://lda.data.parliament.uk/terms/90279) | French | 0.84 | 2 | `90279` |
| [NAWCH](https://lda.data.parliament.uk/terms/96544) | Welsh | 0.84 | 1 | `96544` |
| [NAWSJM](https://lda.data.parliament.uk/terms/96577) | Welsh | 0.84 | 1 | `96577` |
| [NELWDC](https://lda.data.parliament.uk/terms/96669) | Welsh | 0.84 | 1 | `96669` |
| [NMGNI](https://lda.data.parliament.uk/terms/97006) | French | 0.84 | 1 | `97006` |
| [Infectious haematopoietic necrosis](https://lda.data.parliament.uk/terms/10902) | Latin | 0.83 | 3 | `10902` |
| [Entrepreneur Action](https://lda.data.parliament.uk/terms/17841) | French | 0.83 | 2 | `17841` |
| [Arramara Teoranta](https://lda.data.parliament.uk/terms/1840) | Irish | 0.83 | 2 | `1840` |
| [Clwyd-Powys Archaeological Trust](https://lda.data.parliament.uk/terms/20847) | Welsh | 0.83 | 3 | `20847` |
| [HGSG](https://lda.data.parliament.uk/terms/286302) | German | 0.83 | 1 | `286302` |
| [Lloyd George of Dwyfor, Earl](https://lda.data.parliament.uk/terms/291763) | Welsh | 0.83 | 5 | `291763` |
| [Dombo Beheer](https://lda.data.parliament.uk/terms/29349) | Dutch | 0.83 | 2 | `29349` |
| [De Pasquale, Pancrazio](https://lda.data.parliament.uk/terms/300096) | Italian | 0.83 | 3 | `300096` |
| [Lloyd-George of Dwyfor, Earl](https://lda.data.parliament.uk/terms/301947) | Welsh | 0.83 | 4 | `301947` |
| [Procacci, Giovanni](https://lda.data.parliament.uk/terms/303067) | Italian | 0.83 | 2 | `303067` |
| [Vandemeulebroucke, Jaak](https://lda.data.parliament.uk/terms/304164) | Dutch | 0.83 | 2 | `304164` |
| [De Pasquale,Pancrazio](https://lda.data.parliament.uk/terms/310718) | Italian | 0.83 | 2 | `310718` |
| [Earl Lloyd-George of Dwyfor](https://lda.data.parliament.uk/terms/318756) | Welsh | 0.83 | 4 | `318756` |
| [Dyfed-Powys Police](https://lda.data.parliament.uk/terms/32769) | Welsh | 0.83 | 2 | `32769` |
| [Dynegy](https://lda.data.parliament.uk/terms/32776) | Welsh | 0.83 | 1 | `32776` |
| [Konrad-Adenauer-Stiftung](https://lda.data.parliament.uk/terms/351983) | German | 0.83 | 1 | `351983` |
| [Tivium](https://lda.data.parliament.uk/terms/413312) | Latin | 0.83 | 1 | `413312` |
| [Boom Cymru](https://lda.data.parliament.uk/terms/424330) | Welsh | 0.83 | 2 | `424330` |
| [Vlieghe, Gertjan](https://lda.data.parliament.uk/terms/424627) | Dutch | 0.83 | 2 | `424627` |
| [Gertjan Vlieghe](https://lda.data.parliament.uk/terms/425050) | Dutch | 0.83 | 2 | `425050` |
| [Tenants' associations](https://lda.data.parliament.uk/terms/426727) | French | 0.83 | 2 | `426727` |
| [HMYOI Wetherby](https://lda.data.parliament.uk/terms/447930) | Welsh | 0.83 | 2 | `447930` |
| [Momentum](https://lda.data.parliament.uk/terms/449515) | Latin | 0.83 | 1 | `449515` |
| [Helium](https://lda.data.parliament.uk/terms/455014) | Latin | 0.83 | 1 | `455014` |
| [Ratucaucau, Taitusi](https://lda.data.parliament.uk/terms/469168) | Latin | 0.83 | 2 | `469168` |
| [CSDDN](https://lda.data.parliament.uk/terms/473685) | Welsh | 0.83 | 1 | `473685` |
| [Price, Gerwyn](https://lda.data.parliament.uk/terms/474095) | Welsh | 0.83 | 2 | `474095` |
| [Gerwyn Price](https://lda.data.parliament.uk/terms/474097) | Welsh | 0.83 | 2 | `474097` |
| [Deutsche MarktScreening Agentur](https://lda.data.parliament.uk/terms/490820) | German | 0.83 | 3 | `490820` |
| [al-Mabhouh, Mahmoud](https://lda.data.parliament.uk/terms/491385) | French | 0.83 | 2 | `491385` |
| [Mahmoud al-Mabhouh](https://lda.data.parliament.uk/terms/491387) | French | 0.83 | 2 | `491387` |
| [IJYI](https://lda.data.parliament.uk/terms/500311) | Dutch | 0.83 | 1 | `500311` |
| [Bebtelovimab](https://lda.data.parliament.uk/terms/501199) | Latin | 0.83 | 1 | `501199` |
| [Hafnium](https://lda.data.parliament.uk/terms/509495) | Latin | 0.83 | 1 | `509495` |
| [Polonium](https://lda.data.parliament.uk/terms/509876) | Latin | 0.83 | 1 | `509876` |
| [Librium](https://lda.data.parliament.uk/terms/515652) | Latin | 0.83 | 1 | `515652` |
| [Abercwmboi Rugby Football Club](https://lda.data.parliament.uk/terms/517302) | Welsh | 0.83 | 4 | `517302` |
| [Green GEN Cymru](https://lda.data.parliament.uk/terms/520205) | Welsh | 0.83 | 3 | `520205` |
| [AAMVA](https://lda.data.parliament.uk/terms/525144) | Dutch | 0.83 | 1 | `525144` |
| [AWEPAA](https://lda.data.parliament.uk/terms/53936) | Dutch | 0.83 | 1 | `53936` |
| [Williams, Dilys](https://lda.data.parliament.uk/terms/540673) | Welsh | 0.83 | 2 | `540673` |
| [Dilys Williams](https://lda.data.parliament.uk/terms/540675) | Welsh | 0.83 | 2 | `540675` |
| [BIICL](https://lda.data.parliament.uk/terms/54805) | Latin | 0.83 | 1 | `54805` |
| [Pobol y Cwm](https://lda.data.parliament.uk/terms/550631) | Welsh | 0.83 | 3 | `550631` |
| [BHSA](https://lda.data.parliament.uk/terms/557504) | Irish | 0.83 | 1 | `557504` |
| [Powell Duffryn](https://lda.data.parliament.uk/terms/61761) | Welsh | 0.83 | 2 | `61761` |
| [Dyfed Powys Police](https://lda.data.parliament.uk/terms/61788) | Welsh | 0.83 | 3 | `61788` |
| [CAADV](https://lda.data.parliament.uk/terms/73816) | Dutch | 0.83 | 1 | `73816` |
| [EPCCW](https://lda.data.parliament.uk/terms/75460) | Welsh | 0.83 | 1 | `75460` |
| [FRCA](https://lda.data.parliament.uk/terms/75966) | Latin | 0.83 | 1 | `75966` |
| [IPTRID](https://lda.data.parliament.uk/terms/78016) | Latin | 0.83 | 1 | `78016` |
| [JAWG](https://lda.data.parliament.uk/terms/78172) | Welsh | 0.83 | 1 | `78172` |
| [NWML](https://lda.data.parliament.uk/terms/78784) | Welsh | 0.83 | 1 | `78784` |
| [Taioseach](https://lda.data.parliament.uk/terms/82465) | Irish | 0.83 | 1 | `82465` |
| [Corundum](https://lda.data.parliament.uk/terms/9433) | Latin | 0.83 | 1 | `9433` |
| [Derby](https://lda.data.parliament.uk/terms/9619) | Welsh | 0.83 | 1 | `9619` |
| [NIAUR](https://lda.data.parliament.uk/terms/96883) | Welsh | 0.83 | 1 | `96883` |
| [NOMS Cymru](https://lda.data.parliament.uk/terms/97027) | Welsh | 0.83 | 2 | `97027` |
| [Helicobacter pullorum](https://lda.data.parliament.uk/terms/10657) | Latin | 0.82 | 2 | `10657` |
| [Vanuatu](https://lda.data.parliament.uk/terms/13579) | Latin | 0.82 | 1 | `13579` |
| [Companhia Portuguesa Radio Marconi](https://lda.data.parliament.uk/terms/25902) | Portuguese | 0.82 | 4 | `25902` |
| [INCPEN](https://lda.data.parliament.uk/terms/26513) | Latin | 0.82 | 1 | `26513` |
| [Inntrepreneur Estates](https://lda.data.parliament.uk/terms/26917) | French | 0.82 | 2 | `26917` |
| [Craobh Haven 2000](https://lda.data.parliament.uk/terms/27792) | Irish | 0.82 | 3 | `27792` |
| [HWHL](https://lda.data.parliament.uk/terms/286332) | Welsh | 0.82 | 1 | `286332` |
| [JWG](https://lda.data.parliament.uk/terms/286540) | Welsh | 0.82 | 1 | `286540` |
| [BT Cymru](https://lda.data.parliament.uk/terms/286787) | Welsh | 0.82 | 2 | `286787` |
| [CL Vincenzi](https://lda.data.parliament.uk/terms/291549) | Italian | 0.82 | 2 | `291549` |
| [Cappato, Marco](https://lda.data.parliament.uk/terms/299564) | Italian | 0.82 | 2 | `299564` |
| [Eisma, Doeke](https://lda.data.parliament.uk/terms/300325) | Dutch | 0.82 | 2 | `300325` |
| [Ferreira, Joao](https://lda.data.parliament.uk/terms/300489) | Portuguese | 0.82 | 2 | `300489` |
| [Lezzi, Pietro](https://lda.data.parliament.uk/terms/301893) | Italian | 0.82 | 2 | `301893` |
| [Sieglerschmidt, Hellmut](https://lda.data.parliament.uk/terms/303594) | German | 0.82 | 2 | `303594` |
| [Williams of Mostyn, Lord](https://lda.data.parliament.uk/terms/304405) | Welsh | 0.82 | 4 | `304405` |
| [Cappato,Marco](https://lda.data.parliament.uk/terms/308538) | Italian | 0.82 | 1 | `308538` |
| [Eisma,Doeke](https://lda.data.parliament.uk/terms/311682) | Dutch | 0.82 | 1 | `311682` |
| [Bank in Leichtenstein](https://lda.data.parliament.uk/terms/3170) | German | 0.82 | 3 | `3170` |
| [Lezzi,Pietro](https://lda.data.parliament.uk/terms/318492) | Italian | 0.82 | 1 | `318492` |
| [Oomen-Ruijten, Ria GHC](https://lda.data.parliament.uk/terms/322520) | Dutch | 0.82 | 3 | `322520` |
| [Ffastfill](https://lda.data.parliament.uk/terms/34189) | Welsh | 0.82 | 1 | `34189` |
| [Fondazione William Walton](https://lda.data.parliament.uk/terms/34594) | Italian | 0.82 | 3 | `34594` |
| [Lord Williams of Mostyn](https://lda.data.parliament.uk/terms/407636) | Welsh | 0.82 | 4 | `407636` |
| [Tweede Kamer](https://lda.data.parliament.uk/terms/417940) | Dutch | 0.82 | 2 | `417940` |
| [Bambino Mio](https://lda.data.parliament.uk/terms/428790) | Italian | 0.82 | 2 | `428790` |
| [MyGo](https://lda.data.parliament.uk/terms/432699) | Welsh | 0.82 | 1 | `432699` |
| [Craniosynostosis](https://lda.data.parliament.uk/terms/433669) | Latin | 0.82 | 1 | `433669` |
| [Mycobacterium chimaera](https://lda.data.parliament.uk/terms/434904) | Latin | 0.82 | 2 | `434904` |
| [NHSCFA](https://lda.data.parliament.uk/terms/443870) | Irish | 0.82 | 1 | `443870` |
| [Mostyn, Lord](https://lda.data.parliament.uk/terms/446900) | Welsh | 0.82 | 2 | `446900` |
| [Lord Mostyn](https://lda.data.parliament.uk/terms/446902) | Welsh | 0.82 | 2 | `446902` |
| [Dimbleby, Henry](https://lda.data.parliament.uk/terms/457501) | Welsh | 0.82 | 2 | `457501` |
| [Henry Dimbleby](https://lda.data.parliament.uk/terms/457503) | Welsh | 0.82 | 2 | `457503` |
| [Photographic Reconnaissance Unit](https://lda.data.parliament.uk/terms/468211) | French | 0.82 | 3 | `468211` |
| [Van Overtveldt, Johan](https://lda.data.parliament.uk/terms/471160) | Dutch | 0.82 | 3 | `471160` |
| [NECVCU](https://lda.data.parliament.uk/terms/474696) | Latin | 0.82 | 1 | `474696` |
| [Reloop](https://lda.data.parliament.uk/terms/479052) | Dutch | 0.82 | 1 | `479052` |
| [Holroyd, Fred](https://lda.data.parliament.uk/terms/501851) | Welsh | 0.82 | 2 | `501851` |
| [Fred Holroyd](https://lda.data.parliament.uk/terms/501853) | Welsh | 0.82 | 2 | `501853` |
| [ADD](https://lda.data.parliament.uk/terms/51682) | Welsh | 0.82 | 1 | `51682` |
| [NDJD](https://lda.data.parliament.uk/terms/52862) | Dutch | 0.82 | 1 | `52862` |
| [Alcan Aluminium](https://lda.data.parliament.uk/terms/54494) | Latin | 0.82 | 2 | `54494` |
| [Procysbi](https://lda.data.parliament.uk/terms/580922) | Welsh | 0.82 | 1 | `580922` |
| [Companhia Portuguesa Radio Marconi SA](https://lda.data.parliament.uk/terms/74736) | Portuguese | 0.82 | 5 | `74736` |
| [GIDD](https://lda.data.parliament.uk/terms/76153) | Welsh | 0.82 | 1 | `76153` |
| [IFAW](https://lda.data.parliament.uk/terms/77564) | Welsh | 0.82 | 1 | `77564` |
| [NSWHG](https://lda.data.parliament.uk/terms/78737) | Welsh | 0.82 | 1 | `78737` |
| [NWDA](https://lda.data.parliament.uk/terms/78779) | Welsh | 0.82 | 1 | `78779` |
| [LVRPA](https://lda.data.parliament.uk/terms/78993) | Dutch | 0.82 | 1 | `78993` |
| [Curriculum](https://lda.data.parliament.uk/terms/90804) | Latin | 0.82 | 1 | `90804` |
| [NCJB](https://lda.data.parliament.uk/terms/96619) | Portuguese | 0.82 | 1 | `96619` |
| [NFF](https://lda.data.parliament.uk/terms/96736) | Welsh | 0.82 | 1 | `96736` |
| [Alliance internationale de tourisme](https://lda.data.parliament.uk/terms/1151) | French | 0.81 | 4 | `1151` |
| [Tewkesbury](https://lda.data.parliament.uk/terms/13250) | Welsh | 0.81 | 1 | `13250` |
| [Amicus](https://lda.data.parliament.uk/terms/1357) | Latin | 0.81 | 1 | `1357` |
| [Connexions Service](https://lda.data.parliament.uk/terms/21081) | French | 0.81 | 2 | `21081` |
| [Thirlwall, Anthony](https://lda.data.parliament.uk/terms/291271) | Welsh | 0.81 | 2 | `291271` |
| [Anthony Thirlwall](https://lda.data.parliament.uk/terms/291558) | Welsh | 0.81 | 2 | `291558` |
| [Schlicht, Susan](https://lda.data.parliament.uk/terms/294166) | German | 0.81 | 2 | `294166` |
| [Averof, Ioannis](https://lda.data.parliament.uk/terms/298962) | Latin | 0.81 | 2 | `298962` |
| [Broeksz, J](https://lda.data.parliament.uk/terms/299377) | Dutch | 0.81 | 2 | `299377` |
| [Glyn, Alan](https://lda.data.parliament.uk/terms/300803) | Welsh | 0.81 | 2 | `300803` |
| [Lloyd, Tony](https://lda.data.parliament.uk/terms/301945) | Welsh | 0.81 | 2 | `301945` |
| [Ribeiro, Sergio](https://lda.data.parliament.uk/terms/303207) | Portuguese | 0.81 | 2 | `303207` |
| [Ruiz-Gimenez Aguilar, Guadalupe](https://lda.data.parliament.uk/terms/303363) | Spanish | 0.81 | 3 | `303363` |
| [Souladakis, Ioannis](https://lda.data.parliament.uk/terms/303692) | Latin | 0.81 | 2 | `303692` |
| [Averof,Ioannis](https://lda.data.parliament.uk/terms/305728) | Latin | 0.81 | 1 | `305728` |
| [Broeksz,J](https://lda.data.parliament.uk/terms/307558) | Dutch | 0.81 | 1 | `307558` |
| [Ekogen](https://lda.data.parliament.uk/terms/350932) | Dutch | 0.81 | 1 | `350932` |
| [NCCU](https://lda.data.parliament.uk/terms/398443) | Latin | 0.81 | 1 | `398443` |
| [Dyfed Bill [HL] 1985/86](https://lda.data.parliament.uk/terms/404007) | Welsh | 0.81 | 4 | `404007` |
| [Tony Lloyd](https://lda.data.parliament.uk/terms/406686) | Welsh | 0.81 | 2 | `406686` |
| [Alan Glyn](https://lda.data.parliament.uk/terms/412209) | Welsh | 0.81 | 2 | `412209` |
| [Kernkraftwerk RWE Bayernwerk Joint Undertaking](https://lda.data.parliament.uk/terms/41923) | German | 0.81 | 5 | `41923` |
| [AGRIFISH](https://lda.data.parliament.uk/terms/425362) | Welsh | 0.81 | 1 | `425362` |
| [Dyfed Bill (HL) 1985/86](https://lda.data.parliament.uk/terms/427768) | Welsh | 0.81 | 4 | `427768` |
| [Dyfed Bill (HL) 1986/87](https://lda.data.parliament.uk/terms/427770) | Welsh | 0.81 | 4 | `427770` |
| [Dyfed Bill (HL) 1987/88](https://lda.data.parliament.uk/terms/427772) | Welsh | 0.81 | 4 | `427772` |
| [Dyfed Bill [HL] 1986/87](https://lda.data.parliament.uk/terms/427774) | Welsh | 0.81 | 4 | `427774` |
| [Dyfed Bill [HL] 1987/88](https://lda.data.parliament.uk/terms/427776) | Welsh | 0.81 | 4 | `427776` |
| [Raja, Arzoo](https://lda.data.parliament.uk/terms/473324) | Spanish | 0.81 | 2 | `473324` |
| [Arzoo Raja](https://lda.data.parliament.uk/terms/473326) | Spanish | 0.81 | 2 | `473326` |
| [Perpetuus Group](https://lda.data.parliament.uk/terms/488359) | Latin | 0.81 | 2 | `488359` |
| [Tetraethyllead](https://lda.data.parliament.uk/terms/490842) | Welsh | 0.81 | 1 | `490842` |
| [Mark Schreiber](https://lda.data.parliament.uk/terms/499517) | German | 0.81 | 2 | `499517` |
| [Schreiber, Mark](https://lda.data.parliament.uk/terms/499519) | German | 0.81 | 2 | `499519` |
| [AfriForum](https://lda.data.parliament.uk/terms/502501) | Latin | 0.81 | 1 | `502501` |
| [Meirionnydd Special Riding Group](https://lda.data.parliament.uk/terms/519368) | Welsh | 0.81 | 4 | `519368` |
| [DDG](https://lda.data.parliament.uk/terms/523328) | Welsh | 0.81 | 1 | `523328` |
| [Tyrosinaemia](https://lda.data.parliament.uk/terms/527790) | Latin | 0.81 | 1 | `527790` |
| [ACCAT](https://lda.data.parliament.uk/terms/54676) | Italian | 0.81 | 1 | `54676` |
| [ASGP](https://lda.data.parliament.uk/terms/54686) | Welsh | 0.81 | 1 | `54686` |
| [Anacta](https://lda.data.parliament.uk/terms/551215) | Latin | 0.81 | 1 | `551215` |
| [Paraneoplastic encephalomyelitis](https://lda.data.parliament.uk/terms/560081) | Latin | 0.81 | 2 | `560081` |
| [Pomphrey, John](https://lda.data.parliament.uk/terms/564308) | Welsh | 0.81 | 2 | `564308` |
| [John Pomphrey](https://lda.data.parliament.uk/terms/564310) | Welsh | 0.81 | 2 | `564310` |
| [Fanconi anaemia](https://lda.data.parliament.uk/terms/566755) | Latin | 0.81 | 2 | `566755` |
| [Kebatu, Hadush](https://lda.data.parliament.uk/terms/567159) | Latin | 0.81 | 2 | `567159` |
| [Hadush Kebatu](https://lda.data.parliament.uk/terms/567165) | Latin | 0.81 | 2 | `567165` |
| [OCCIT](https://lda.data.parliament.uk/terms/579680) | Latin | 0.81 | 1 | `579680` |
| [AIIP](https://lda.data.parliament.uk/terms/581677) | Latin | 0.81 | 1 | `581677` |
| [Schmiedemeccanica](https://lda.data.parliament.uk/terms/67594) | Latin | 0.81 | 1 | `67594` |
| [CCLRC](https://lda.data.parliament.uk/terms/74042) | Latin | 0.81 | 1 | `74042` |
| [DOJNI](https://lda.data.parliament.uk/terms/76891) | Latin | 0.81 | 1 | `76891` |
| [ICRCL](https://lda.data.parliament.uk/terms/77516) | Welsh | 0.81 | 1 | `77516` |
| [IHR](https://lda.data.parliament.uk/terms/77595) | German | 0.81 | 1 | `77595` |
| [LWRA](https://lda.data.parliament.uk/terms/78996) | Welsh | 0.81 | 1 | `78996` |
| [Viridis](https://lda.data.parliament.uk/terms/85734) | Latin | 0.81 | 1 | `85734` |
| [Blaenau Gwent](https://lda.data.parliament.uk/terms/8704) | Welsh | 0.81 | 2 | `8704` |
| [Ecclesiastical law](https://lda.data.parliament.uk/terms/91039) | Latin | 0.81 | 2 | `91039` |
| [Tai Cymru](https://lda.data.parliament.uk/terms/99610) | Welsh | 0.81 | 2 | `99610` |
| [Plutonium](https://lda.data.parliament.uk/terms/12167) | Latin | 0.8 | 1 | `12167` |
| [Centro europa ricerche](https://lda.data.parliament.uk/terms/19910) | Italian | 0.8 | 3 | `19910` |
| [Centrum voor energiebesparing en schone technologie](https://lda.data.parliament.uk/terms/19914) | Dutch | 0.8 | 6 | `19914` |
| [PHEA](https://lda.data.parliament.uk/terms/290581) | Irish | 0.8 | 1 | `290581` |
| [Bersani, Giovanni](https://lda.data.parliament.uk/terms/299146) | Italian | 0.8 | 2 | `299146` |
| [Boutos, Ioannis](https://lda.data.parliament.uk/terms/299285) | Latin | 0.8 | 2 | `299285` |
| [Broers, Lord](https://lda.data.parliament.uk/terms/299378) | Dutch | 0.8 | 2 | `299378` |
| [Carvalho Cardoso, Jose](https://lda.data.parliament.uk/terms/299612) | Portuguese | 0.8 | 3 | `299612` |
| [De Giovanni, Biagio](https://lda.data.parliament.uk/terms/300082) | Italian | 0.8 | 3 | `300082` |
| [Ferreira, Elisa](https://lda.data.parliament.uk/terms/300488) | Portuguese | 0.8 | 2 | `300488` |
| [Figueiredo, Ilda](https://lda.data.parliament.uk/terms/300502) | Portuguese | 0.8 | 2 | `300502` |
| [Goedmakers, Annemarie](https://lda.data.parliament.uk/terms/300809) | Dutch | 0.8 | 2 | `300809` |
| [Lehne, Klaus-Heiner](https://lda.data.parliament.uk/terms/301844) | German | 0.8 | 2 | `301844` |
| [Livsey, Richard](https://lda.data.parliament.uk/terms/301932) | Welsh | 0.8 | 2 | `301932` |
| [Roberts of Conwy, Lord](https://lda.data.parliament.uk/terms/303248) | Welsh | 0.8 | 4 | `303248` |
| [van der Waal, Leen](https://lda.data.parliament.uk/terms/304150) | Dutch | 0.8 | 4 | `304150` |
| [van Nistelrooij, Lambert](https://lda.data.parliament.uk/terms/304157) | Dutch | 0.8 | 3 | `304157` |
| [Waal, Leen van der](https://lda.data.parliament.uk/terms/304237) | Dutch | 0.8 | 4 | `304237` |
| [Bersani,Giovanni](https://lda.data.parliament.uk/terms/306544) | Italian | 0.8 | 1 | `306544` |
| [Boutos,Ioannis](https://lda.data.parliament.uk/terms/307152) | Latin | 0.8 | 1 | `307152` |
| [Carvalho Cardoso,Jose](https://lda.data.parliament.uk/terms/308696) | Portuguese | 0.8 | 2 | `308696` |
| [De Giovanni,Biagio](https://lda.data.parliament.uk/terms/310690) | Italian | 0.8 | 2 | `310690` |
| [Figueiredo,Ilda](https://lda.data.parliament.uk/terms/312287) | Portuguese | 0.8 | 1 | `312287` |
| [Goedmakers,Annemarie](https://lda.data.parliament.uk/terms/313504) | Dutch | 0.8 | 1 | `313504` |
| [Lehne,Klaus-Heiner](https://lda.data.parliament.uk/terms/318232) | German | 0.8 | 1 | `318232` |
| [Entrepreneurs' Forum](https://lda.data.parliament.uk/terms/346099) | French | 0.8 | 2 | `346099` |
| [Entrepreneurs Forum](https://lda.data.parliament.uk/terms/346101) | French | 0.8 | 2 | `346101` |
| [Grontmij](https://lda.data.parliament.uk/terms/348028) | Dutch | 0.8 | 1 | `348028` |
| [Frans Buitelaar (Farms)](https://lda.data.parliament.uk/terms/34948) | Dutch | 0.8 | 3 | `34948` |
| [AlphaPlus](https://lda.data.parliament.uk/terms/361540) | French | 0.8 | 1 | `361540` |
| [Lord Broers](https://lda.data.parliament.uk/terms/398818) | Dutch | 0.8 | 2 | `398818` |
| [Lord Roberts of Conwy](https://lda.data.parliament.uk/terms/406731) | Welsh | 0.8 | 4 | `406731` |
| [Richard Livsey](https://lda.data.parliament.uk/terms/407002) | Welsh | 0.8 | 2 | `407002` |
| [Maximus](https://lda.data.parliament.uk/terms/408777) | Latin | 0.8 | 1 | `408777` |
| [EFFRR](https://lda.data.parliament.uk/terms/410593) | Welsh | 0.8 | 1 | `410593` |
| [Bouygues Batiment International](https://lda.data.parliament.uk/terms/4152) | French | 0.8 | 3 | `4152` |
| [Llaeth y Llan Village Dairy](https://lda.data.parliament.uk/terms/43137) | Welsh | 0.8 | 5 | `43137` |
| [Menometrorrhagia](https://lda.data.parliament.uk/terms/441060) | Latin | 0.8 | 1 | `441060` |
| [Myalgic Encephalomyelitis Association](https://lda.data.parliament.uk/terms/44466) | Latin | 0.8 | 3 | `44466` |
| [Mebyon Kernow](https://lda.data.parliament.uk/terms/45175) | Welsh | 0.8 | 2 | `45175` |
| [Insomnia](https://lda.data.parliament.uk/terms/452181) | Latin | 0.8 | 1 | `452181` |
| [NIIP](https://lda.data.parliament.uk/terms/461045) | Latin | 0.8 | 1 | `461045` |
| [Alternative fur Deutschland](https://lda.data.parliament.uk/terms/467989) | German | 0.8 | 3 | `467989` |
| [Paediatric inflammatory multisystem syndrome](https://lda.data.parliament.uk/terms/491671) | Latin | 0.8 | 4 | `491671` |
| [Constructions mecaniques de Normandie](https://lda.data.parliament.uk/terms/497224) | French | 0.8 | 4 | `497224` |
| [Sciensus](https://lda.data.parliament.uk/terms/501893) | Latin | 0.8 | 1 | `501893` |
| [DQB](https://lda.data.parliament.uk/terms/507139) | Welsh | 0.8 | 1 | `507139` |
| [Organ Utilisation Group](https://lda.data.parliament.uk/terms/512924) | French | 0.8 | 3 | `512924` |
| [EYDP](https://lda.data.parliament.uk/terms/52324) | Welsh | 0.8 | 1 | `52324` |
| [FRY](https://lda.data.parliament.uk/terms/52382) | Welsh | 0.8 | 1 | `52382` |
| [Newcleo](https://lda.data.parliament.uk/terms/549986) | Welsh | 0.8 | 1 | `549986` |
| [CRWG](https://lda.data.parliament.uk/terms/551278) | Welsh | 0.8 | 1 | `551278` |
| [Bundesbank](https://lda.data.parliament.uk/terms/55182) | German | 0.8 | 1 | `55182` |
| [HMYOI Downview](https://lda.data.parliament.uk/terms/555437) | Welsh | 0.8 | 2 | `555437` |
| [Agence de la Francophonie](https://lda.data.parliament.uk/terms/714) | French | 0.8 | 4 | `714` |
| [Connexions](https://lda.data.parliament.uk/terms/74769) | French | 0.8 | 1 | `74769` |
| [COPUS](https://lda.data.parliament.uk/terms/74822) | Latin | 0.8 | 1 | `74822` |
| [CVWW](https://lda.data.parliament.uk/terms/75102) | Dutch | 0.8 | 1 | `75102` |
| [Heddlu Gwent](https://lda.data.parliament.uk/terms/76542) | Welsh | 0.8 | 2 | `76542` |
| [ENSDC](https://lda.data.parliament.uk/terms/77413) | Dutch | 0.8 | 1 | `77413` |
| [IDBNI](https://lda.data.parliament.uk/terms/77539) | Portuguese | 0.8 | 1 | `77539` |
| [NPfIT](https://lda.data.parliament.uk/terms/78695) | German | 0.8 | 1 | `78695` |
| [Botulinum toxin](https://lda.data.parliament.uk/terms/8750) | Latin | 0.8 | 2 | `8750` |
| [Bibliography](https://lda.data.parliament.uk/terms/90329) | Latin | 0.8 | 1 | `90329` |
| [Encyclopaedias](https://lda.data.parliament.uk/terms/91122) | Latin | 0.8 | 1 | `91122` |
| [Denbighshire](https://lda.data.parliament.uk/terms/9607) | Welsh | 0.8 | 1 | `9607` |
| [MWP](https://lda.data.parliament.uk/terms/96146) | Welsh | 0.8 | 1 | `96146` |
| [RAF Quedgeley](https://lda.data.parliament.uk/terms/11394) | Welsh | 0.79 | 2 | `11394` |
| [Analysys](https://lda.data.parliament.uk/terms/1381) | German | 0.79 | 1 | `1381` |
| [Eccles College](https://lda.data.parliament.uk/terms/287138) | Latin | 0.79 | 2 | `287138` |
| [Kremers, Jeroen JM](https://lda.data.parliament.uk/terms/291133) | Dutch | 0.79 | 3 | `291133` |
| [CYWU](https://lda.data.parliament.uk/terms/298591) | Welsh | 0.79 | 1 | `298591` |
| [Baldassarre, Raffaele](https://lda.data.parliament.uk/terms/298995) | Italian | 0.79 | 2 | `298995` |
| [Borghezio, Mario](https://lda.data.parliament.uk/terms/299260) | Italian | 0.79 | 2 | `299260` |
| [Bouwman, Theo](https://lda.data.parliament.uk/terms/299286) | Dutch | 0.79 | 2 | `299286` |
| [Carvalho, Maria da Graca](https://lda.data.parliament.uk/terms/299613) | Portuguese | 0.79 | 4 | `299613` |
| [Guerreiro, Pedro](https://lda.data.parliament.uk/terms/300960) | Portuguese | 0.79 | 2 | `300960` |
| [Haarder, Bertel](https://lda.data.parliament.uk/terms/300982) | Dutch | 0.79 | 2 | `300982` |
| [Jones, Ieuan Wyn](https://lda.data.parliament.uk/terms/301516) | Welsh | 0.79 | 3 | `301516` |
| [Keller, Franziska](https://lda.data.parliament.uk/terms/301577) | German | 0.79 | 2 | `301577` |
| [Kreissl-Dorfler, Wolfgang](https://lda.data.parliament.uk/terms/301708) | German | 0.79 | 2 | `301708` |
| [Mattina, Vincenzo](https://lda.data.parliament.uk/terms/302198) | Italian | 0.79 | 2 | `302198` |
| [Bouwman,Theo](https://lda.data.parliament.uk/terms/307154) | Dutch | 0.79 | 1 | `307154` |
| [Figueiredo, Maria Ilda](https://lda.data.parliament.uk/terms/312286) | Portuguese | 0.79 | 3 | `312286` |
| [Figueiredo,Maria Ilda](https://lda.data.parliament.uk/terms/312288) | Portuguese | 0.79 | 2 | `312288` |
| [Haarder,Bertel](https://lda.data.parliament.uk/terms/314182) | Dutch | 0.79 | 1 | `314182` |
| [Kreissl-Dorfler,Wolfgang](https://lda.data.parliament.uk/terms/317778) | German | 0.79 | 1 | `317778` |
| [Mattina,Vincenzo](https://lda.data.parliament.uk/terms/319846) | Italian | 0.79 | 1 | `319846` |
| [Cornelissen, Marije](https://lda.data.parliament.uk/terms/351790) | Dutch | 0.79 | 2 | `351790` |
| [Atypical haemolytic uraemic syndrome](https://lda.data.parliament.uk/terms/370371) | Latin | 0.79 | 4 | `370371` |
| [Gwynedd Council](https://lda.data.parliament.uk/terms/37293) | Welsh | 0.79 | 2 | `37293` |
| [Mercatus Center](https://lda.data.parliament.uk/terms/408994) | Latin | 0.79 | 2 | `408994` |
| [Ieuan Wyn Jones](https://lda.data.parliament.uk/terms/409318) | Welsh | 0.79 | 3 | `409318` |
| [Zeichner, Daniel](https://lda.data.parliament.uk/terms/416332) | German | 0.79 | 2 | `416332` |
| [Daniel Zeichner](https://lda.data.parliament.uk/terms/416350) | German | 0.79 | 2 | `416350` |
| [Charles Russell Speechlys](https://lda.data.parliament.uk/terms/431833) | Welsh | 0.79 | 3 | `431833` |
| [Hortefeux, Brice](https://lda.data.parliament.uk/terms/442803) | French | 0.79 | 2 | `442803` |
| [Hunt Saboteurs Association](https://lda.data.parliament.uk/terms/448000) | French | 0.79 | 3 | `448000` |
| [Mind Cymru](https://lda.data.parliament.uk/terms/45868) | Welsh | 0.79 | 2 | `45868` |
| [Universiteit Leiden](https://lda.data.parliament.uk/terms/484004) | Dutch | 0.79 | 2 | `484004` |
| [Norges idrettsforbund](https://lda.data.parliament.uk/terms/492422) | German | 0.79 | 2 | `492422` |
| [Peterlee](https://lda.data.parliament.uk/terms/501611) | Dutch | 0.79 | 1 | `501611` |
| [Kanyandekwe, Elysee](https://lda.data.parliament.uk/terms/505802) | Dutch | 0.79 | 2 | `505802` |
| [Elysee Kanyandekwe](https://lda.data.parliament.uk/terms/505804) | Dutch | 0.79 | 2 | `505804` |
| [PSVs](https://lda.data.parliament.uk/terms/50809) | Dutch | 0.79 | 1 | `50809` |
| [dxw](https://lda.data.parliament.uk/terms/508728) | Irish | 0.79 | 1 | `508728` |
| [Leiomyomas](https://lda.data.parliament.uk/terms/509158) | Latin | 0.79 | 1 | `509158` |
| [Flusso](https://lda.data.parliament.uk/terms/510811) | Italian | 0.79 | 1 | `510811` |
| [Syllabus](https://lda.data.parliament.uk/terms/51147) | Latin | 0.79 | 1 | `51147` |
| [MMR](https://lda.data.parliament.uk/terms/51555) | Welsh | 0.79 | 1 | `51555` |
| [ICW](https://lda.data.parliament.uk/terms/517593) | Welsh | 0.79 | 1 | `517593` |
| [ACCPA](https://lda.data.parliament.uk/terms/522567) | Spanish | 0.79 | 1 | `522567` |
| [Keolis Amey Wales Cymru](https://lda.data.parliament.uk/terms/529441) | Welsh | 0.79 | 4 | `529441` |
| [BBPA](https://lda.data.parliament.uk/terms/54098) | Italian | 0.79 | 1 | `54098` |
| [AHGMS](https://lda.data.parliament.uk/terms/54424) | French | 0.79 | 1 | `54424` |
| [ACCA](https://lda.data.parliament.uk/terms/54673) | Italian | 0.79 | 1 | `54673` |
| [Welireg](https://lda.data.parliament.uk/terms/550110) | Welsh | 0.79 | 1 | `550110` |
| [de Leeuw, Paul](https://lda.data.parliament.uk/terms/553798) | Dutch | 0.79 | 3 | `553798` |
| [Caernarfon Rugby Football Club](https://lda.data.parliament.uk/terms/558458) | Welsh | 0.79 | 4 | `558458` |
| [Wazoku](https://lda.data.parliament.uk/terms/569776) | Latin | 0.79 | 1 | `569776` |
| [Oppenheim Finanzanalyse](https://lda.data.parliament.uk/terms/60539) | German | 0.79 | 2 | `60539` |
| [Rassemblement pour la France](https://lda.data.parliament.uk/terms/65958) | French | 0.79 | 4 | `65958` |
| [Renaissance Maritime Charitable Trust](https://lda.data.parliament.uk/terms/66287) | French | 0.79 | 4 | `66287` |
| [EECMB](https://lda.data.parliament.uk/terms/77228) | Irish | 0.79 | 1 | `77228` |
| [Metrix Consortium](https://lda.data.parliament.uk/terms/79210) | Latin | 0.79 | 2 | `79210` |
| [Pobal an Chaistil](https://lda.data.parliament.uk/terms/82895) | Irish | 0.79 | 3 | `82895` |
| [Trillium](https://lda.data.parliament.uk/terms/84168) | Latin | 0.79 | 1 | `84168` |
| [MRBCV](https://lda.data.parliament.uk/terms/96093) | Welsh | 0.79 | 1 | `96093` |
| [NAEGA](https://lda.data.parliament.uk/terms/96195) | Latin | 0.79 | 1 | `96195` |
| [NCPEC](https://lda.data.parliament.uk/terms/96629) | Latin | 0.79 | 1 | `96629` |
| [NHS Cymru](https://lda.data.parliament.uk/terms/96772) | Welsh | 0.79 | 2 | `96772` |
| [Wassenaar Arrangement](https://lda.data.parliament.uk/terms/13688) | Dutch | 0.78 | 2 | `13688` |
| [Anchorpac](https://lda.data.parliament.uk/terms/1391) | Irish | 0.78 | 1 | `1391` |
| [AquaFed](https://lda.data.parliament.uk/terms/1653) | Latin | 0.78 | 1 | `1653` |
| [Comataidh Telebhisein Gaidhlig](https://lda.data.parliament.uk/terms/25423) | Irish | 0.78 | 3 | `25423` |
| [Kooperationsstelle Hamburg](https://lda.data.parliament.uk/terms/288354) | German | 0.78 | 2 | `288354` |
| [DFDS](https://lda.data.parliament.uk/terms/29024) | Dutch | 0.78 | 1 | `29024` |
| [Avaya](https://lda.data.parliament.uk/terms/2926) | Spanish | 0.78 | 1 | `2926` |
| [Carrilho, Maria](https://lda.data.parliament.uk/terms/299599) | Portuguese | 0.78 | 2 | `299599` |
| [Castagnetti, Pierluigi](https://lda.data.parliament.uk/terms/299625) | Italian | 0.78 | 2 | `299625` |
| [Dam, Rijk Van](https://lda.data.parliament.uk/terms/300008) | Dutch | 0.78 | 3 | `300008` |
| [Kuijpers, Willy](https://lda.data.parliament.uk/terms/301717) | Dutch | 0.78 | 2 | `301717` |
| [McGuinness, Mairead](https://lda.data.parliament.uk/terms/302289) | Irish | 0.78 | 2 | `302289` |
| [Roberts of Llandudno, Lord](https://lda.data.parliament.uk/terms/303244) | Welsh | 0.78 | 4 | `303244` |
| [Stamoulis, Ioannis](https://lda.data.parliament.uk/terms/303749) | Latin | 0.78 | 2 | `303749` |
| [Carrilho,Maria](https://lda.data.parliament.uk/terms/308654) | Portuguese | 0.78 | 1 | `308654` |
| [Castagnetti,Pierluigi](https://lda.data.parliament.uk/terms/308732) | Italian | 0.78 | 1 | `308732` |
| [Dam,Rijk Van](https://lda.data.parliament.uk/terms/310342) | Dutch | 0.78 | 2 | `310342` |
| [Fava, Giovanni](https://lda.data.parliament.uk/terms/312166) | Italian | 0.78 | 2 | `312166` |
| [Fava,Giovanni](https://lda.data.parliament.uk/terms/312168) | Italian | 0.78 | 1 | `312168` |
| [Kuijpers,Willy](https://lda.data.parliament.uk/terms/317792) | Dutch | 0.78 | 1 | `317792` |
| [Clwyd Fire Brigade](https://lda.data.parliament.uk/terms/358956) | Welsh | 0.78 | 3 | `358956` |
| [ADFAM](https://lda.data.parliament.uk/terms/385) | Welsh | 0.78 | 1 | `385` |
| [Lord Roberts of Llandudno](https://lda.data.parliament.uk/terms/400534) | Welsh | 0.78 | 4 | `400534` |
| [Quod](https://lda.data.parliament.uk/terms/402888) | Latin | 0.78 | 1 | `402888` |
| [Ribeiro, Sofia](https://lda.data.parliament.uk/terms/417511) | Portuguese | 0.78 | 2 | `417511` |
| [Hypophosphatasia](https://lda.data.parliament.uk/terms/426659) | Latin | 0.78 | 1 | `426659` |
| [Llewellyn of Steep, Lord](https://lda.data.parliament.uk/terms/431327) | Welsh | 0.78 | 4 | `431327` |
| [Lord Llewellyn of Steep](https://lda.data.parliament.uk/terms/431329) | Welsh | 0.78 | 4 | `431329` |
| [Corrao, Ignazio](https://lda.data.parliament.uk/terms/431423) | Italian | 0.78 | 2 | `431423` |
| [Aurelius](https://lda.data.parliament.uk/terms/433807) | Latin | 0.78 | 1 | `433807` |
| [HMICFRS](https://lda.data.parliament.uk/terms/439255) | Latin | 0.78 | 1 | `439255` |
| [Reach](https://lda.data.parliament.uk/terms/447497) | Irish | 0.78 | 1 | `447497` |
| [Confucius Institutes](https://lda.data.parliament.uk/terms/454266) | Latin | 0.78 | 2 | `454266` |
| [Qioptiq](https://lda.data.parliament.uk/terms/456935) | Latin | 0.78 | 1 | `456935` |
| [Destination management organisations](https://lda.data.parliament.uk/terms/478498) | French | 0.78 | 3 | `478498` |
| [Aquariums](https://lda.data.parliament.uk/terms/481852) | Latin | 0.78 | 1 | `481852` |
| [GGSS](https://lda.data.parliament.uk/terms/488408) | German | 0.78 | 1 | `488408` |
| [Macrogol](https://lda.data.parliament.uk/terms/506031) | Welsh | 0.78 | 1 | `506031` |
| [EASAC](https://lda.data.parliament.uk/terms/507750) | Irish | 0.78 | 1 | `507750` |
| [South Caernarfon Creameries](https://lda.data.parliament.uk/terms/511958) | Welsh | 0.78 | 3 | `511958` |
| [Nikolaiets, Sofiia](https://lda.data.parliament.uk/terms/512386) | Welsh | 0.78 | 2 | `512386` |
| [Sofiia Nikolaiets](https://lda.data.parliament.uk/terms/512388) | Welsh | 0.78 | 2 | `512388` |
| [Methicillin resistant staphylococcus aureus](https://lda.data.parliament.uk/terms/52825) | Latin | 0.78 | 4 | `52825` |
| [Ambassade de France au Royaume-Uni](https://lda.data.parliament.uk/terms/54577) | French | 0.78 | 5 | `54577` |
| [Amicus-CMA](https://lda.data.parliament.uk/terms/54604) | Latin | 0.78 | 1 | `54604` |
| [Walsall and Bloxwich](https://lda.data.parliament.uk/terms/546286) | Welsh | 0.78 | 3 | `546286` |
| [Aon Ghuth](https://lda.data.parliament.uk/terms/550538) | Irish | 0.78 | 2 | `550538` |
| [Steer](https://lda.data.parliament.uk/terms/552097) | Dutch | 0.78 | 1 | `552097` |
| [Age Cymru](https://lda.data.parliament.uk/terms/559141) | Welsh | 0.78 | 2 | `559141` |
| [PTI Cymru](https://lda.data.parliament.uk/terms/62272) | Welsh | 0.78 | 2 | `62272` |
| [CSSC](https://lda.data.parliament.uk/terms/75054) | German | 0.78 | 1 | `75054` |
| [IFHF](https://lda.data.parliament.uk/terms/77568) | Welsh | 0.78 | 1 | `77568` |
| [IWC](https://lda.data.parliament.uk/terms/78140) | Welsh | 0.78 | 1 | `78140` |
| [Llewelyn-Davies Planning](https://lda.data.parliament.uk/terms/78845) | Welsh | 0.78 | 2 | `78845` |
| [Barium](https://lda.data.parliament.uk/terms/8545) | Latin | 0.78 | 1 | `8545` |
| [NAW](https://lda.data.parliament.uk/terms/96518) | Welsh | 0.78 | 1 | `96518` |
| [Pontypridd College](https://lda.data.parliament.uk/terms/98753) | Welsh | 0.78 | 2 | `98753` |
| [Valletta](https://lda.data.parliament.uk/terms/13570) | Italian | 0.77 | 1 | `13570` |
| [Bro Morgannwg NHS Trust](https://lda.data.parliament.uk/terms/16506) | Welsh | 0.77 | 4 | `16506` |
| [ArtsEkta](https://lda.data.parliament.uk/terms/1921) | German | 0.77 | 1 | `1921` |
| [Asamblea de Madrid](https://lda.data.parliament.uk/terms/1935) | Spanish | 0.77 | 3 | `1935` |
| [Cerebus](https://lda.data.parliament.uk/terms/19930) | Latin | 0.77 | 1 | `19930` |
| [CommsTec](https://lda.data.parliament.uk/terms/21043) | German | 0.77 | 1 | `21043` |
| [Construction Procurement Group](https://lda.data.parliament.uk/terms/21257) | French | 0.77 | 3 | `21257` |
| [Merthyr Valleys Homes](https://lda.data.parliament.uk/terms/286765) | Welsh | 0.77 | 3 | `286765` |
| [GLDVP](https://lda.data.parliament.uk/terms/287278) | Latin | 0.77 | 1 | `287278` |
| [Kremers, Jeroen](https://lda.data.parliament.uk/terms/291450) | Dutch | 0.77 | 2 | `291450` |
| [Crawshaw, Lord](https://lda.data.parliament.uk/terms/299934) | Welsh | 0.77 | 2 | `299934` |
| [Davies of Penrhys, Lord](https://lda.data.parliament.uk/terms/300045) | Welsh | 0.77 | 4 | `300045` |
| [Graziani, Antonio](https://lda.data.parliament.uk/terms/300894) | Italian | 0.77 | 2 | `300894` |
| [Laidlaw, Lord](https://lda.data.parliament.uk/terms/301734) | Welsh | 0.77 | 2 | `301734` |
| [Mantovani, Agostino](https://lda.data.parliament.uk/terms/302115) | Italian | 0.77 | 2 | `302115` |
| [Merz, Friedrich](https://lda.data.parliament.uk/terms/302376) | German | 0.77 | 2 | `302376` |
| [Vankerkhoven, Paul](https://lda.data.parliament.uk/terms/304167) | Dutch | 0.77 | 2 | `304167` |
| [Williams, Kirsty](https://lda.data.parliament.uk/terms/304411) | Welsh | 0.77 | 2 | `304411` |
| [Graziani,Antonio](https://lda.data.parliament.uk/terms/313842) | Italian | 0.77 | 1 | `313842` |
| [Mantovani,Agostino](https://lda.data.parliament.uk/terms/319532) | Italian | 0.77 | 1 | `319532` |
| [Merz,Friedrich](https://lda.data.parliament.uk/terms/320818) | German | 0.77 | 1 | `320818` |
| [Kirsty Williams](https://lda.data.parliament.uk/terms/329380) | Welsh | 0.77 | 2 | `329380` |
| [Exit Deutschland](https://lda.data.parliament.uk/terms/33700) | German | 0.77 | 2 | `33700` |
| [Dyfed Act 1987](https://lda.data.parliament.uk/terms/378224) | Welsh | 0.77 | 3 | `378224` |
| [PostNL](https://lda.data.parliament.uk/terms/398075) | Dutch | 0.77 | 1 | `398075` |
| [Bertot, Fabrizio](https://lda.data.parliament.uk/terms/402369) | Italian | 0.77 | 2 | `402369` |
| [Lord Laidlaw](https://lda.data.parliament.uk/terms/407177) | Welsh | 0.77 | 2 | `407177` |
| [Lord Crawshaw](https://lda.data.parliament.uk/terms/409436) | Welsh | 0.77 | 2 | `409436` |
| [Lord Davies of Penrhys](https://lda.data.parliament.uk/terms/413716) | Welsh | 0.77 | 4 | `413716` |
| [Elise Rietveld](https://lda.data.parliament.uk/terms/413828) | Dutch | 0.77 | 2 | `413828` |
| [Messerschmidt, Morten](https://lda.data.parliament.uk/terms/414269) | German | 0.77 | 2 | `414269` |
| [Paclitaxel](https://lda.data.parliament.uk/terms/422023) | Latin | 0.77 | 1 | `422023` |
| [DfBEIS](https://lda.data.parliament.uk/terms/429268) | German | 0.77 | 1 | `429268` |
| [MedCity](https://lda.data.parliament.uk/terms/454133) | Latin | 0.77 | 1 | `454133` |
| [John Adrian Treymayne Rodd](https://lda.data.parliament.uk/terms/467464) | Welsh | 0.77 | 4 | `467464` |
| [Feuerkrieg Division](https://lda.data.parliament.uk/terms/470489) | German | 0.77 | 2 | `470489` |
| [Plentywaka](https://lda.data.parliament.uk/terms/487552) | Welsh | 0.77 | 1 | `487552` |
| [NWMF](https://lda.data.parliament.uk/terms/488718) | Welsh | 0.77 | 1 | `488718` |
| [Hypothecation](https://lda.data.parliament.uk/terms/50157) | Latin | 0.77 | 1 | `50157` |
| [Hymenoscyphus fraxineus](https://lda.data.parliament.uk/terms/514731) | Latin | 0.77 | 2 | `514731` |
| [AquaEnviro](https://lda.data.parliament.uk/terms/515812) | Latin | 0.77 | 1 | `515812` |
| [Letby, Lucy](https://lda.data.parliament.uk/terms/520166) | Welsh | 0.77 | 2 | `520166` |
| [Lucy Letby](https://lda.data.parliament.uk/terms/520168) | Welsh | 0.77 | 2 | `520168` |
| [Heracleum mantegazzianum](https://lda.data.parliament.uk/terms/52481) | Latin | 0.77 | 2 | `52481` |
| [Myalgic encephalomyelitis](https://lda.data.parliament.uk/terms/52836) | Latin | 0.77 | 2 | `52836` |
| [IREGG](https://lda.data.parliament.uk/terms/528442) | Italian | 0.77 | 1 | `528442` |
| [ADSS Cymru](https://lda.data.parliament.uk/terms/54197) | Welsh | 0.77 | 2 | `54197` |
| [BIIBA](https://lda.data.parliament.uk/terms/54804) | Latin | 0.77 | 1 | `54804` |
| [Bdap, Y Quynh](https://lda.data.parliament.uk/terms/552000) | Welsh | 0.77 | 3 | `552000` |
| [Y Quynh Bdap](https://lda.data.parliament.uk/terms/552946) | Welsh | 0.77 | 3 | `552946` |
| [Cancrum oris](https://lda.data.parliament.uk/terms/556757) | Latin | 0.77 | 2 | `556757` |
| [Matta](https://lda.data.parliament.uk/terms/562068) | Italian | 0.77 | 1 | `562068` |
| [Nithio](https://lda.data.parliament.uk/terms/562898) | Welsh | 0.77 | 1 | `562898` |
| [Arculus](https://lda.data.parliament.uk/terms/564584) | Latin | 0.77 | 1 | `564584` |
| [Quantinuum](https://lda.data.parliament.uk/terms/571598) | Latin | 0.77 | 1 | `571598` |
| [Panmure Liberum](https://lda.data.parliament.uk/terms/571947) | Latin | 0.77 | 2 | `571947` |
| [Hypoxic-ischaemic encephalopathy](https://lda.data.parliament.uk/terms/578677) | Latin | 0.77 | 2 | `578677` |
| [Oxonica](https://lda.data.parliament.uk/terms/60835) | Latin | 0.77 | 1 | `60835` |
| [CCLR](https://lda.data.parliament.uk/terms/74041) | Latin | 0.77 | 1 | `74041` |
| [CITBNI](https://lda.data.parliament.uk/terms/74439) | German | 0.77 | 1 | `74439` |
| [HCW](https://lda.data.parliament.uk/terms/76504) | Welsh | 0.77 | 1 | `76504` |
| [HQDL](https://lda.data.parliament.uk/terms/76780) | German | 0.77 | 1 | `76780` |
| [IFAA](https://lda.data.parliament.uk/terms/77562) | Dutch | 0.77 | 1 | `77562` |
| [IIS](https://lda.data.parliament.uk/terms/77610) | Latin | 0.77 | 1 | `77610` |
| [MHRA](https://lda.data.parliament.uk/terms/79234) | Irish | 0.77 | 1 | `79234` |
| [Aluminium](https://lda.data.parliament.uk/terms/8321) | Latin | 0.77 | 1 | `8321` |
| [Tenovus](https://lda.data.parliament.uk/terms/83237) | Latin | 0.77 | 1 | `83237` |
| [Voluntary Action Merthyr Tydfil](https://lda.data.parliament.uk/terms/85798) | Welsh | 0.77 | 4 | `85798` |
| [Incitement](https://lda.data.parliament.uk/terms/91625) | French | 0.77 | 1 | `91625` |
| [Caernarvonshire Historical Society](https://lda.data.parliament.uk/terms/18407) | Welsh | 0.76 | 3 | `18407` |
| [Clwyd County Council](https://lda.data.parliament.uk/terms/20840) | Welsh | 0.76 | 3 | `20840` |
| [IGD](https://lda.data.parliament.uk/terms/26397) | Dutch | 0.76 | 1 | `26397` |
| [Logystyx UK](https://lda.data.parliament.uk/terms/287571) | Welsh | 0.76 | 2 | `287571` |
| [De Groot, Gerard](https://lda.data.parliament.uk/terms/291033) | Dutch | 0.76 | 3 | `291033` |
| [Gerard De Groot](https://lda.data.parliament.uk/terms/291512) | Dutch | 0.76 | 3 | `291512` |
| [Boothby, Robert](https://lda.data.parliament.uk/terms/291605) | Welsh | 0.76 | 2 | `291605` |
| [Keith, Kathryn](https://lda.data.parliament.uk/terms/294089) | Welsh | 0.76 | 2 | `294089` |
| [Kathryn Keith](https://lda.data.parliament.uk/terms/294647) | Welsh | 0.76 | 2 | `294647` |
| [Dresdner Kleinwort Benson](https://lda.data.parliament.uk/terms/29479) | German | 0.76 | 3 | `29479` |
| [Elwyn-Jones, Lord](https://lda.data.parliament.uk/terms/300352) | Welsh | 0.76 | 2 | `300352` |
| [McCarthy-Fry, Sarah](https://lda.data.parliament.uk/terms/302240) | Welsh | 0.76 | 2 | `302240` |
| [Prodi, Vittorio](https://lda.data.parliament.uk/terms/303069) | Italian | 0.76 | 2 | `303069` |
| [St Aldwyn, Earl](https://lda.data.parliament.uk/terms/303733) | Welsh | 0.76 | 3 | `303733` |
| [Vergeer, Willem](https://lda.data.parliament.uk/terms/304194) | Dutch | 0.76 | 2 | `304194` |
| [Argyros, Stylianos](https://lda.data.parliament.uk/terms/305462) | Latin | 0.76 | 2 | `305462` |
| [Argyros,Stylianos](https://lda.data.parliament.uk/terms/305464) | Latin | 0.76 | 1 | `305464` |
| [Sarah McCarthy-Fry](https://lda.data.parliament.uk/terms/320063) | Welsh | 0.76 | 2 | `320063` |
| [Feuchter](https://lda.data.parliament.uk/terms/34186) | German | 0.76 | 1 | `34186` |
| [Mumsnet](https://lda.data.parliament.uk/terms/346475) | Dutch | 0.76 | 1 | `346475` |
| [Earl St Aldwyn](https://lda.data.parliament.uk/terms/348731) | Welsh | 0.76 | 3 | `348731` |
| [Teixeira, Nuno](https://lda.data.parliament.uk/terms/362039) | Portuguese | 0.76 | 2 | `362039` |
| [Haemolytic uraemic syndrome](https://lda.data.parliament.uk/terms/370369) | Latin | 0.76 | 3 | `370369` |
| [Impetus](https://lda.data.parliament.uk/terms/412543) | Latin | 0.76 | 1 | `412543` |
| [Lord Elwyn-Jones](https://lda.data.parliament.uk/terms/413899) | Welsh | 0.76 | 2 | `413899` |
| [Robert Boothby](https://lda.data.parliament.uk/terms/414536) | Welsh | 0.76 | 2 | `414536` |
| [Vandenkendelaere, Tom](https://lda.data.parliament.uk/terms/437935) | Dutch | 0.76 | 2 | `437935` |
| [CDPC](https://lda.data.parliament.uk/terms/439614) | French | 0.76 | 1 | `439614` |
| [Centre on Radicalisation and Terrorism](https://lda.data.parliament.uk/terms/453033) | French | 0.76 | 5 | `453033` |
| [TikTok](https://lda.data.parliament.uk/terms/457437) | German | 0.76 | 1 | `457437` |
| [NCCMH](https://lda.data.parliament.uk/terms/468608) | Irish | 0.76 | 1 | `468608` |
| [ECCU](https://lda.data.parliament.uk/terms/469693) | Latin | 0.76 | 1 | `469693` |
| [MHC](https://lda.data.parliament.uk/terms/470648) | Irish | 0.76 | 1 | `470648` |
| [Odevixibat](https://lda.data.parliament.uk/terms/491206) | Latin | 0.76 | 1 | `491206` |
| [Mark Bampfylde](https://lda.data.parliament.uk/terms/498487) | German | 0.76 | 2 | `498487` |
| [Bampfylde, Mark](https://lda.data.parliament.uk/terms/498489) | German | 0.76 | 2 | `498489` |
| [Jestyn Philipps](https://lda.data.parliament.uk/terms/505482) | Welsh | 0.76 | 2 | `505482` |
| [ISSEE](https://lda.data.parliament.uk/terms/506316) | Dutch | 0.76 | 1 | `506316` |
| [Phenethylline](https://lda.data.parliament.uk/terms/509531) | Welsh | 0.76 | 1 | `509531` |
| [Meperidine](https://lda.data.parliament.uk/terms/512254) | Latin | 0.76 | 1 | `512254` |
| [Talarius](https://lda.data.parliament.uk/terms/512507) | Latin | 0.76 | 1 | `512507` |
| [Bannau Brycheiniog National Park](https://lda.data.parliament.uk/terms/517638) | Welsh | 0.76 | 4 | `517638` |
| [Begg, Moazzam](https://lda.data.parliament.uk/terms/524620) | Italian | 0.76 | 2 | `524620` |
| [Moazzam Begg](https://lda.data.parliament.uk/terms/524622) | Italian | 0.76 | 2 | `524622` |
| [BBTA](https://lda.data.parliament.uk/terms/54104) | Italian | 0.76 | 1 | `54104` |
| [Kinetiq](https://lda.data.parliament.uk/terms/553100) | Latin | 0.76 | 1 | `553100` |
| [HMYOI Holloway](https://lda.data.parliament.uk/terms/555161) | Welsh | 0.76 | 2 | `555161` |
| [HMYOI Sudbury](https://lda.data.parliament.uk/terms/555417) | Welsh | 0.76 | 2 | `555417` |
| [Redress](https://lda.data.parliament.uk/terms/66083) | French | 0.76 | 1 | `66083` |
| [Sonae](https://lda.data.parliament.uk/terms/68127) | Latin | 0.76 | 1 | `68127` |
| [Clwyd Language Centre](https://lda.data.parliament.uk/terms/74508) | Welsh | 0.76 | 3 | `74508` |
| [Dyfed-Powys Constabulary](https://lda.data.parliament.uk/terms/77017) | Welsh | 0.76 | 2 | `77017` |
| [IHM](https://lda.data.parliament.uk/terms/77593) | German | 0.76 | 1 | `77593` |
| [Impfstoffwerke Dessau Tornav](https://lda.data.parliament.uk/terms/77666) | German | 0.76 | 3 | `77666` |
| [Impfstoffwerke Dessau-Tornav](https://lda.data.parliament.uk/terms/77668) | German | 0.76 | 2 | `77668` |
| [NPF](https://lda.data.parliament.uk/terms/78693) | German | 0.76 | 1 | `78693` |
| [LTL](https://lda.data.parliament.uk/terms/78984) | German | 0.76 | 1 | `78984` |
| [Attendance](https://lda.data.parliament.uk/terms/90278) | French | 0.76 | 1 | `90278` |
| [Tenants](https://lda.data.parliament.uk/terms/93244) | French | 0.76 | 1 | `93244` |
| [NACUW](https://lda.data.parliament.uk/terms/96189) | Latin | 0.76 | 1 | `96189` |
| [NFUW](https://lda.data.parliament.uk/terms/96755) | Welsh | 0.76 | 1 | `96755` |
| [PFLP](https://lda.data.parliament.uk/terms/98645) | German | 0.76 | 1 | `98645` |
| [Un Llais Cymru](https://lda.data.parliament.uk/terms/100128) | Welsh | 0.75 | 3 | `100128` |
| [Gyrodactylus salaris](https://lda.data.parliament.uk/terms/10581) | Latin | 0.75 | 2 | `10581` |
| [Platinum](https://lda.data.parliament.uk/terms/12164) | Latin | 0.75 | 1 | `12164` |
| [Systemic lupus erythematosus](https://lda.data.parliament.uk/terms/13177) | Latin | 0.75 | 3 | `13177` |
| [Instrumentarium](https://lda.data.parliament.uk/terms/27384) | Latin | 0.75 | 1 | `27384` |
| [Hardacre, Jeremy](https://lda.data.parliament.uk/terms/294030) | Welsh | 0.75 | 2 | `294030` |
| [Jeremy Hardacre](https://lda.data.parliament.uk/terms/294816) | Welsh | 0.75 | 2 | `294816` |
| [AHVLA](https://lda.data.parliament.uk/terms/298512) | Dutch | 0.75 | 1 | `298512` |
| [Belder, Bastiaan](https://lda.data.parliament.uk/terms/299092) | Dutch | 0.75 | 2 | `299092` |
| [Bigliardo, Roberto](https://lda.data.parliament.uk/terms/299172) | Italian | 0.75 | 2 | `299172` |
| [Castiglione, Giuseppe](https://lda.data.parliament.uk/terms/299628) | Italian | 0.75 | 2 | `299628` |
| [Corbyn, Jeremy](https://lda.data.parliament.uk/terms/299867) | Welsh | 0.75 | 2 | `299867` |
| [Filinis, Konstantinos](https://lda.data.parliament.uk/terms/300503) | Latin | 0.75 | 2 | `300503` |
| [Leichtfried, Jorg](https://lda.data.parliament.uk/terms/301848) | German | 0.75 | 2 | `301848` |
| [Llewelyn-Davies of Hastoe, Baroness](https://lda.data.parliament.uk/terms/301935) | Welsh | 0.75 | 4 | `301935` |
| [Porrazzini, Giacomo](https://lda.data.parliament.uk/terms/303019) | Italian | 0.75 | 2 | `303019` |
| [Sondergaard, Soren Bo](https://lda.data.parliament.uk/terms/303681) | Dutch | 0.75 | 3 | `303681` |
| [van Dijk, Nel](https://lda.data.parliament.uk/terms/304151) | Dutch | 0.75 | 3 | `304151` |
| [Bigliardo,Roberto](https://lda.data.parliament.uk/terms/306626) | Italian | 0.75 | 1 | `306626` |
| [Jeremy Corbyn](https://lda.data.parliament.uk/terms/309790) | Welsh | 0.75 | 2 | `309790` |
| [Filinis,Konstantinos](https://lda.data.parliament.uk/terms/312292) | Latin | 0.75 | 1 | `312292` |
| [Banpyne](https://lda.data.parliament.uk/terms/3219) | Welsh | 0.75 | 1 | `3219` |
| [Zanicchi, Iva](https://lda.data.parliament.uk/terms/347484) | Italian | 0.75 | 2 | `347484` |
| [Fratelli Borletti](https://lda.data.parliament.uk/terms/34952) | Italian | 0.75 | 2 | `34952` |
| [Heineken](https://lda.data.parliament.uk/terms/364937) | Dutch | 0.75 | 1 | `364937` |
| [LOROL](https://lda.data.parliament.uk/terms/370054) | Welsh | 0.75 | 1 | `370054` |
| [Baroness Llewelyn-Davies of Hastoe](https://lda.data.parliament.uk/terms/412939) | Welsh | 0.75 | 4 | `412939` |
| [Lavrilleux, Jerome](https://lda.data.parliament.uk/terms/417481) | French | 0.75 | 2 | `417481` |
| [O'Neill, Diarmuid](https://lda.data.parliament.uk/terms/423624) | Irish | 0.75 | 2 | `423624` |
| [Maslaha](https://lda.data.parliament.uk/terms/423866) | Irish | 0.75 | 1 | `423866` |
| [Joint Intelligence Organisation](https://lda.data.parliament.uk/terms/425565) | French | 0.75 | 3 | `425565` |
| [Cairnryan Port](https://lda.data.parliament.uk/terms/441090) | Welsh | 0.75 | 2 | `441090` |
| [Diarmuid O'Neill](https://lda.data.parliament.uk/terms/460593) | Irish | 0.75 | 2 | `460593` |
| [Royle, Anthony Henry Fanshawe](https://lda.data.parliament.uk/terms/461788) | Welsh | 0.75 | 4 | `461788` |
| [Anthony Henry Fanshawe Royle](https://lda.data.parliament.uk/terms/461790) | Welsh | 0.75 | 4 | `461790` |
| [Calcifediol](https://lda.data.parliament.uk/terms/474864) | Welsh | 0.75 | 1 | `474864` |
| [DEAC](https://lda.data.parliament.uk/terms/477014) | Irish | 0.75 | 1 | `477014` |
| [Williams, Bryn](https://lda.data.parliament.uk/terms/480010) | Welsh | 0.75 | 2 | `480010` |
| [Bryn Williams](https://lda.data.parliament.uk/terms/480048) | Welsh | 0.75 | 2 | `480048` |
| [Geographic atrophy](https://lda.data.parliament.uk/terms/501780) | Latin | 0.75 | 2 | `501780` |
| [Echinococcus multilocularis](https://lda.data.parliament.uk/terms/515351) | Latin | 0.75 | 2 | `515351` |
| [LEWG](https://lda.data.parliament.uk/terms/523072) | Welsh | 0.75 | 1 | `523072` |
| [Dieudonne Niyonsenga](https://lda.data.parliament.uk/terms/525700) | French | 0.75 | 2 | `525700` |
| [Niyonsenga, Dieudonne](https://lda.data.parliament.uk/terms/525702) | French | 0.75 | 2 | `525702` |
| [Le Monde Diplomatique](https://lda.data.parliament.uk/terms/52683) | French | 0.75 | 3 | `52683` |
| [AFPRB](https://lda.data.parliament.uk/terms/54376) | Dutch | 0.75 | 1 | `54376` |
| [ASCSA](https://lda.data.parliament.uk/terms/54683) | Irish | 0.75 | 1 | `54683` |
| [BTHA](https://lda.data.parliament.uk/terms/55162) | Irish | 0.75 | 1 | `55162` |
| [Berwyn Prison](https://lda.data.parliament.uk/terms/555238) | Welsh | 0.75 | 2 | `555238` |
| [Bioethanol](https://lda.data.parliament.uk/terms/561156) | Welsh | 0.75 | 1 | `561156` |
| [Teledyne Marine](https://lda.data.parliament.uk/terms/580516) | Welsh | 0.75 | 2 | `580516` |
| [Newidiem](https://lda.data.parliament.uk/terms/58635) | Welsh | 0.75 | 1 | `58635` |
| [Noctis](https://lda.data.parliament.uk/terms/58902) | Latin | 0.75 | 1 | `58902` |
| [Reed Elsevier](https://lda.data.parliament.uk/terms/66097) | Dutch | 0.75 | 2 | `66097` |
| [Sociedad General de Aguas de Barcelona](https://lda.data.parliament.uk/terms/67895) | Spanish | 0.75 | 6 | `67895` |
| [CNAA](https://lda.data.parliament.uk/terms/74527) | Dutch | 0.75 | 1 | `74527` |
| [IEPG](https://lda.data.parliament.uk/terms/77557) | Dutch | 0.75 | 1 | `77557` |
| [LGDUW](https://lda.data.parliament.uk/terms/78531) | Dutch | 0.75 | 1 | `78531` |
| [NWC](https://lda.data.parliament.uk/terms/78776) | Welsh | 0.75 | 1 | `78776` |
| [Transnuklear](https://lda.data.parliament.uk/terms/84011) | German | 0.75 | 1 | `84011` |
| [Vimpex](https://lda.data.parliament.uk/terms/85707) | Latin | 0.75 | 1 | `85707` |
| [Brussels](https://lda.data.parliament.uk/terms/8855) | Dutch | 0.75 | 1 | `8855` |
| [NAWFM](https://lda.data.parliament.uk/terms/96565) | Welsh | 0.75 | 1 | `96565` |
| [NCCI](https://lda.data.parliament.uk/terms/96594) | Latin | 0.75 | 1 | `96594` |
| [NIREX](https://lda.data.parliament.uk/terms/96966) | Latin | 0.75 | 1 | `96966` |
| [Federation internationale des communautes educatives](https://lda.data.parliament.uk/terms/97408) | French | 0.75 | 5 | `97408` |
| [Rofecoxib](https://lda.data.parliament.uk/terms/13625) | Latin | 0.74 | 1 | `13625` |
| [Arriva](https://lda.data.parliament.uk/terms/1841) | Italian | 0.74 | 1 | `1841` |
| [CCAMLR](https://lda.data.parliament.uk/terms/288343) | Welsh | 0.74 | 1 | `288343` |
| [De Groot, Gerard J](https://lda.data.parliament.uk/terms/291794) | Dutch | 0.74 | 4 | `291794` |
| [Beumer, Bouke](https://lda.data.parliament.uk/terms/299159) | Dutch | 0.74 | 2 | `299159` |
| [Brantner, Franziska](https://lda.data.parliament.uk/terms/299336) | German | 0.74 | 2 | `299336` |
| [Coelho, Carlos](https://lda.data.parliament.uk/terms/299803) | Portuguese | 0.74 | 2 | `299803` |
| [Cunha Oliveira, Artur da](https://lda.data.parliament.uk/terms/299970) | Portuguese | 0.74 | 4 | `299970` |
| [Hudghton, Ian](https://lda.data.parliament.uk/terms/301314) | Welsh | 0.74 | 2 | `301314` |
| [Kohler, Heinz](https://lda.data.parliament.uk/terms/301687) | German | 0.74 | 2 | `301687` |
| [Plooij-van Gorsel, PC](https://lda.data.parliament.uk/terms/302986) | Dutch | 0.74 | 3 | `302986` |
| [Poggiolini, Danilo](https://lda.data.parliament.uk/terms/302996) | Italian | 0.74 | 2 | `302996` |
| [Schiedermeier, Edgar](https://lda.data.parliament.uk/terms/303466) | German | 0.74 | 2 | `303466` |
| [Speroni, Francesco Enrico](https://lda.data.parliament.uk/terms/303717) | Italian | 0.74 | 3 | `303717` |
| [Trefgarne, Lord](https://lda.data.parliament.uk/terms/304057) | Welsh | 0.74 | 2 | `304057` |
| [Vermeer, Herman](https://lda.data.parliament.uk/terms/304197) | Dutch | 0.74 | 2 | `304197` |
| [Beumer,Bouke](https://lda.data.parliament.uk/terms/306584) | Dutch | 0.74 | 1 | `306584` |
| [Coelho,Carlos](https://lda.data.parliament.uk/terms/309494) | Portuguese | 0.74 | 1 | `309494` |
| [Cunha Oliveira,Artur da](https://lda.data.parliament.uk/terms/310150) | Portuguese | 0.74 | 3 | `310150` |
| [Kohler,Heinz](https://lda.data.parliament.uk/terms/317744) | German | 0.74 | 1 | `317744` |
| [Florus Wijsenbeek](https://lda.data.parliament.uk/terms/329276) | Dutch | 0.74 | 2 | `329276` |
| [Fianna Fail](https://lda.data.parliament.uk/terms/34198) | Irish | 0.74 | 2 | `34198` |
| [EE](https://lda.data.parliament.uk/terms/346906) | Dutch | 0.74 | 1 | `346906` |
| [Glas Cymru](https://lda.data.parliament.uk/terms/36549) | Welsh | 0.74 | 2 | `36549` |
| [Gwynedd County Council](https://lda.data.parliament.uk/terms/37294) | Welsh | 0.74 | 3 | `37294` |
| [Salavrakos, Nikolaos](https://lda.data.parliament.uk/terms/396610) | Portuguese | 0.74 | 2 | `396610` |
| [Lord Trefgarne](https://lda.data.parliament.uk/terms/400849) | Welsh | 0.74 | 2 | `400849` |
| [Silva Pereira, Pedro](https://lda.data.parliament.uk/terms/417490) | Portuguese | 0.74 | 3 | `417490` |
| [ADPKD](https://lda.data.parliament.uk/terms/427152) | Dutch | 0.74 | 1 | `427152` |
| [Bremische Burgerschaft](https://lda.data.parliament.uk/terms/4300) | German | 0.74 | 2 | `4300` |
| [Eribulin](https://lda.data.parliament.uk/terms/434394) | Latin | 0.74 | 1 | `434394` |
| [AMST-Systemtechnik GmbH](https://lda.data.parliament.uk/terms/436512) | German | 0.74 | 2 | `436512` |
| [IICI](https://lda.data.parliament.uk/terms/437582) | Latin | 0.74 | 1 | `437582` |
| [Association internationale de boxe amateur](https://lda.data.parliament.uk/terms/450040) | French | 0.74 | 5 | `450040` |
| [Fellowes, John Ailwyn](https://lda.data.parliament.uk/terms/461262) | Welsh | 0.74 | 3 | `461262` |
| [John Ailwyn Fellowes](https://lda.data.parliament.uk/terms/461264) | Welsh | 0.74 | 3 | `461264` |
| [Dewar, Henry Evelyn Alexander](https://lda.data.parliament.uk/terms/461894) | Welsh | 0.74 | 4 | `461894` |
| [Henry Evelyn Alexander Dewar](https://lda.data.parliament.uk/terms/461896) | Welsh | 0.74 | 4 | `461896` |
| [Crematoriums](https://lda.data.parliament.uk/terms/467193) | Latin | 0.74 | 1 | `467193` |
| [FWD](https://lda.data.parliament.uk/terms/469100) | Welsh | 0.74 | 1 | `469100` |
| [David Trefgarne](https://lda.data.parliament.uk/terms/475658) | Welsh | 0.74 | 2 | `475658` |
| [Atomwaffen Division](https://lda.data.parliament.uk/terms/480477) | German | 0.74 | 2 | `480477` |
| [Flunazolam](https://lda.data.parliament.uk/terms/487998) | Spanish | 0.74 | 1 | `487998` |
| [Centre national d'etudes spatiales](https://lda.data.parliament.uk/terms/493508) | French | 0.74 | 4 | `493508` |
| [NFT](https://lda.data.parliament.uk/terms/493832) | German | 0.74 | 1 | `493832` |
| [Aspergillosis](https://lda.data.parliament.uk/terms/497033) | Latin | 0.74 | 1 | `497033` |
| [Mark Shuldham Schreiber](https://lda.data.parliament.uk/terms/499515) | German | 0.74 | 3 | `499515` |
| [Sint Eustatius](https://lda.data.parliament.uk/terms/508058) | Latin | 0.74 | 2 | `508058` |
| [MoltexFLEX](https://lda.data.parliament.uk/terms/508791) | Latin | 0.74 | 1 | `508791` |
| [HRWP](https://lda.data.parliament.uk/terms/511313) | Welsh | 0.74 | 1 | `511313` |
| [emqc](https://lda.data.parliament.uk/terms/511950) | Latin | 0.74 | 1 | `511950` |
| [Cerebral autosomal dominant arteriopathy with subcortical infarcts and leucoencephalopathy](https://lda.data.parliament.uk/terms/51909) | Latin | 0.74 | 9 | `51909` |
| [Scaife, Anna](https://lda.data.parliament.uk/terms/525075) | Irish | 0.74 | 2 | `525075` |
| [Anna Scaife](https://lda.data.parliament.uk/terms/525077) | Irish | 0.74 | 2 | `525077` |
| [Llangollen Railway](https://lda.data.parliament.uk/terms/540004) | Welsh | 0.74 | 2 | `540004` |
| [BBKA](https://lda.data.parliament.uk/terms/54097) | Italian | 0.74 | 1 | `54097` |
| [AFDF](https://lda.data.parliament.uk/terms/54367) | Dutch | 0.74 | 1 | `54367` |
| [Aberystwyth University](https://lda.data.parliament.uk/terms/54561) | Welsh | 0.74 | 2 | `54561` |
| [Blaenau Gwent and Rhymney](https://lda.data.parliament.uk/terms/545769) | Welsh | 0.74 | 4 | `545769` |
| [Montgomeryshire and Glyndwr](https://lda.data.parliament.uk/terms/545782) | Welsh | 0.74 | 3 | `545782` |
| [PRP](https://lda.data.parliament.uk/terms/556353) | Latin | 0.74 | 1 | `556353` |
| [NICCO](https://lda.data.parliament.uk/terms/577925) | Italian | 0.74 | 1 | `577925` |
| [AC Oxgangs CFC](https://lda.data.parliament.uk/terms/583390) | Dutch | 0.74 | 3 | `583390` |
| [BWSA](https://lda.data.parliament.uk/terms/73804) | Welsh | 0.74 | 1 | `73804` |
| [CAEP](https://lda.data.parliament.uk/terms/73839) | Latin | 0.74 | 1 | `73839` |
| [COWLHA](https://lda.data.parliament.uk/terms/74909) | Welsh | 0.74 | 1 | `74909` |
| [CWS](https://lda.data.parliament.uk/terms/75107) | Welsh | 0.74 | 1 | `75107` |
| [Fremskrittspartiet](https://lda.data.parliament.uk/terms/75975) | German | 0.74 | 1 | `75975` |
| [HNWU](https://lda.data.parliament.uk/terms/76684) | German | 0.74 | 1 | `76684` |
| [DUOB](https://lda.data.parliament.uk/terms/76993) | Latin | 0.74 | 1 | `76993` |
| [IACC](https://lda.data.parliament.uk/terms/77437) | Italian | 0.74 | 1 | `77437` |
| [IHRC](https://lda.data.parliament.uk/terms/77596) | German | 0.74 | 1 | `77596` |
| [IRRV](https://lda.data.parliament.uk/terms/78057) | Portuguese | 0.74 | 1 | `78057` |
| [JDS](https://lda.data.parliament.uk/terms/78183) | Dutch | 0.74 | 1 | `78183` |
| [MAPW](https://lda.data.parliament.uk/terms/79069) | Welsh | 0.74 | 1 | `79069` |
| [Taith](https://lda.data.parliament.uk/terms/82467) | Irish | 0.74 | 1 | `82467` |
| [VEBA](https://lda.data.parliament.uk/terms/85556) | Latin | 0.74 | 1 | `85556` |
| [Ceredigion](https://lda.data.parliament.uk/terms/9052) | Welsh | 0.74 | 1 | `9052` |
| [NICCY](https://lda.data.parliament.uk/terms/96895) | Welsh | 0.74 | 1 | `96895` |
| [Dounreay](https://lda.data.parliament.uk/terms/9706) | Irish | 0.74 | 1 | `9706` |
| [Trenau Arriva Cymru](https://lda.data.parliament.uk/terms/99856) | Welsh | 0.74 | 3 | `99856` |
| [Tetanus](https://lda.data.parliament.uk/terms/13247) | Latin | 0.73 | 1 | `13247` |
| [Opium](https://lda.data.parliament.uk/terms/13961) | Latin | 0.73 | 1 | `13961` |
| [Essex Archaeological and Historical Congress](https://lda.data.parliament.uk/terms/18154) | Latin | 0.73 | 5 | `18154` |
| [Acronym Consortium](https://lda.data.parliament.uk/terms/253) | Latin | 0.73 | 2 | `253` |
| [Institut Merieux](https://lda.data.parliament.uk/terms/26964) | French | 0.73 | 2 | `26964` |
| [Institut national de statistique](https://lda.data.parliament.uk/terms/26968) | French | 0.73 | 4 | `26968` |
| [Dacca](https://lda.data.parliament.uk/terms/286992) | Italian | 0.73 | 1 | `286992` |
| [Deutsche Bank](https://lda.data.parliament.uk/terms/28941) | German | 0.73 | 2 | `28941` |
| [De Vries, Gijs](https://lda.data.parliament.uk/terms/300107) | Dutch | 0.73 | 3 | `300107` |
| [Ghilardotti, Fiorella](https://lda.data.parliament.uk/terms/300720) | Italian | 0.73 | 2 | `300720` |
| [Herrero-Tejedor, Luis](https://lda.data.parliament.uk/terms/301184) | Spanish | 0.73 | 2 | `301184` |
| [Mantovani, Mario](https://lda.data.parliament.uk/terms/302116) | Italian | 0.73 | 2 | `302116` |
| [Napolitano, Giorgio](https://lda.data.parliament.uk/terms/302600) | Italian | 0.73 | 2 | `302600` |
| [Pleguezuelos Aguilar, Francisca](https://lda.data.parliament.uk/terms/302984) | Spanish | 0.73 | 3 | `302984` |
| [Raggio, Andrea](https://lda.data.parliament.uk/terms/303115) | Italian | 0.73 | 2 | `303115` |
| [Tatarella, Salvatore](https://lda.data.parliament.uk/terms/303914) | Italian | 0.73 | 2 | `303914` |
| [De Vries,Gijs](https://lda.data.parliament.uk/terms/310746) | Dutch | 0.73 | 2 | `310746` |
| [Ghilardotti,Fiorella](https://lda.data.parliament.uk/terms/313260) | Italian | 0.73 | 1 | `313260` |
| [Herrero-Tejedor,Luis](https://lda.data.parliament.uk/terms/315168) | Spanish | 0.73 | 1 | `315168` |
| [Mantovani,Mario](https://lda.data.parliament.uk/terms/319534) | Italian | 0.73 | 1 | `319534` |
| [Napolitano,Giorgio](https://lda.data.parliament.uk/terms/321888) | Italian | 0.73 | 1 | `321888` |
| [Dyno-Rod](https://lda.data.parliament.uk/terms/32777) | Welsh | 0.73 | 1 | `32777` |
| [Eurosources](https://lda.data.parliament.uk/terms/33639) | French | 0.73 | 1 | `33639` |
| [Deutschmark](https://lda.data.parliament.uk/terms/346874) | German | 0.73 | 1 | `346874` |
| [Cinematograph Act 1909](https://lda.data.parliament.uk/terms/374309) | Latin | 0.73 | 3 | `374309` |
| [EHTPA](https://lda.data.parliament.uk/terms/401611) | German | 0.73 | 1 | `401611` |
| [PCFF](https://lda.data.parliament.uk/terms/408871) | French | 0.73 | 1 | `408871` |
| [OEE](https://lda.data.parliament.uk/terms/411962) | Welsh | 0.73 | 1 | `411962` |
| [Fesehazion, Astier](https://lda.data.parliament.uk/terms/422435) | Italian | 0.73 | 2 | `422435` |
| [Babesiosis](https://lda.data.parliament.uk/terms/424478) | Latin | 0.73 | 1 | `424478` |
| [Leek College](https://lda.data.parliament.uk/terms/42633) | Dutch | 0.73 | 2 | `42633` |
| [Forenza, Eleonora](https://lda.data.parliament.uk/terms/430179) | Italian | 0.73 | 2 | `430179` |
| [Frunzulica, Doru-Claudian](https://lda.data.parliament.uk/terms/442800) | Latin | 0.73 | 2 | `442800` |
| [Imbruvica](https://lda.data.parliament.uk/terms/446354) | Latin | 0.73 | 1 | `446354` |
| [Ethanol](https://lda.data.parliament.uk/terms/458905) | Welsh | 0.73 | 1 | `458905` |
| [MS Zaandam](https://lda.data.parliament.uk/terms/468549) | Dutch | 0.73 | 2 | `468549` |
| [Aguilar Barreras, Ernesto](https://lda.data.parliament.uk/terms/471573) | Spanish | 0.73 | 3 | `471573` |
| [Ernesto Aguilar Barreras](https://lda.data.parliament.uk/terms/471575) | Spanish | 0.73 | 3 | `471575` |
| [FiveXMore](https://lda.data.parliament.uk/terms/476185) | Welsh | 0.73 | 1 | `476185` |
| [Legatus Global](https://lda.data.parliament.uk/terms/477932) | Latin | 0.73 | 2 | `477932` |
| [LongCovidSOS](https://lda.data.parliament.uk/terms/488734) | Latin | 0.73 | 1 | `488734` |
| [Anthony John Methuen](https://lda.data.parliament.uk/terms/499975) | Welsh | 0.73 | 3 | `499975` |
| [Tusmor](https://lda.data.parliament.uk/terms/512334) | Latin | 0.73 | 1 | `512334` |
| [Accutane](https://lda.data.parliament.uk/terms/51677) | Latin | 0.73 | 1 | `51677` |
| [Clostridium difficile](https://lda.data.parliament.uk/terms/51975) | Latin | 0.73 | 2 | `51975` |
| [Cimicosis](https://lda.data.parliament.uk/terms/526134) | Latin | 0.73 | 1 | `526134` |
| [LCJBs](https://lda.data.parliament.uk/terms/52682) | Portuguese | 0.73 | 1 | `52682` |
| [Efudix](https://lda.data.parliament.uk/terms/555826) | Latin | 0.73 | 1 | `555826` |
| [Evans, Delyth](https://lda.data.parliament.uk/terms/558230) | Welsh | 0.73 | 2 | `558230` |
| [Delyth Evans](https://lda.data.parliament.uk/terms/558232) | Welsh | 0.73 | 2 | `558232` |
| [Nga, Thach](https://lda.data.parliament.uk/terms/571295) | Irish | 0.73 | 2 | `571295` |
| [Thach Nga](https://lda.data.parliament.uk/terms/571297) | Irish | 0.73 | 2 | `571297` |
| [Praesta](https://lda.data.parliament.uk/terms/61803) | Latin | 0.73 | 1 | `61803` |
| [Premier Prison Services](https://lda.data.parliament.uk/terms/61828) | French | 0.73 | 3 | `61828` |
| [Roxby](https://lda.data.parliament.uk/terms/66888) | Welsh | 0.73 | 1 | `66888` |
| [DARDNIE](https://lda.data.parliament.uk/terms/75162) | Dutch | 0.73 | 1 | `75162` |
| [ESGOSS](https://lda.data.parliament.uk/terms/75520) | Welsh | 0.73 | 1 | `75520` |
| [FAO](https://lda.data.parliament.uk/terms/75741) | Irish | 0.73 | 1 | `75741` |
| [GLACHC](https://lda.data.parliament.uk/terms/76167) | Irish | 0.73 | 1 | `76167` |
| [Statens Serum Institut](https://lda.data.parliament.uk/terms/83399) | Latin | 0.73 | 3 | `83399` |
| [Xidex](https://lda.data.parliament.uk/terms/86687) | Latin | 0.73 | 1 | `86687` |
| [Maintenance](https://lda.data.parliament.uk/terms/91913) | French | 0.73 | 1 | `91913` |
| [MPF](https://lda.data.parliament.uk/terms/96084) | German | 0.73 | 1 | `96084` |
| [NCWGB](https://lda.data.parliament.uk/terms/96642) | Welsh | 0.73 | 1 | `96642` |
| [OPG](https://lda.data.parliament.uk/terms/97379) | Dutch | 0.73 | 1 | `97379` |
| [Organisations](https://lda.data.parliament.uk/terms/1) | French | 0.72 | 1 | `1` |
| [Millennium](https://lda.data.parliament.uk/terms/11680) | Latin | 0.72 | 1 | `11680` |
| [Newry](https://lda.data.parliament.uk/terms/11922) | Welsh | 0.72 | 1 | `11922` |
| [Ecclesiological Society](https://lda.data.parliament.uk/terms/17056) | Latin | 0.72 | 2 | `17056` |
| [Central Intelligence Organisation](https://lda.data.parliament.uk/terms/19402) | French | 0.72 | 3 | `19402` |
| [Comitato Difesa Consumatori](https://lda.data.parliament.uk/terms/25440) | Italian | 0.72 | 3 | `25440` |
| [Eskmeals](https://lda.data.parliament.uk/terms/27174) | Dutch | 0.72 | 1 | `27174` |
| [Cynefin y werin](https://lda.data.parliament.uk/terms/28150) | Welsh | 0.72 | 3 | `28150` |
| [IMHE](https://lda.data.parliament.uk/terms/286272) | Irish | 0.72 | 1 | `286272` |
| [Blyth, Anthony](https://lda.data.parliament.uk/terms/291520) | Welsh | 0.72 | 2 | `291520` |
| [Cravinho, Joao](https://lda.data.parliament.uk/terms/299928) | Portuguese | 0.72 | 2 | `299928` |
| [Hedh, Anna](https://lda.data.parliament.uk/terms/301147) | Irish | 0.72 | 2 | `301147` |
| [Lataillade, Pierre](https://lda.data.parliament.uk/terms/301776) | French | 0.72 | 2 | `301776` |
| [Madeira, Jamila](https://lda.data.parliament.uk/terms/302063) | Portuguese | 0.72 | 2 | `302063` |
| [Perschau, Hartmut](https://lda.data.parliament.uk/terms/302924) | German | 0.72 | 2 | `302924` |
| [Phlix, Alphonsine](https://lda.data.parliament.uk/terms/302952) | Latin | 0.72 | 2 | `302952` |
| [Rowe-Beddoe, Lord](https://lda.data.parliament.uk/terms/303344) | Welsh | 0.72 | 2 | `303344` |
| [Trivelli, Renzo](https://lda.data.parliament.uk/terms/304071) | Italian | 0.72 | 2 | `304071` |
| [Cravinho,Joao](https://lda.data.parliament.uk/terms/309998) | Portuguese | 0.72 | 1 | `309998` |
| [Lataillade,Pierre](https://lda.data.parliament.uk/terms/318040) | French | 0.72 | 1 | `318040` |
| [Fokker](https://lda.data.parliament.uk/terms/34584) | Dutch | 0.72 | 1 | `34584` |
| [Capitus](https://lda.data.parliament.uk/terms/348272) | Latin | 0.72 | 1 | `348272` |
| [FEPS](https://lda.data.parliament.uk/terms/350908) | Latin | 0.72 | 1 | `350908` |
| [Streptococcus](https://lda.data.parliament.uk/terms/368447) | Latin | 0.72 | 1 | `368447` |
| [Maintenance Enforcement Act 1991](https://lda.data.parliament.uk/terms/384157) | French | 0.72 | 4 | `384157` |
| [Hofschroer, Barbara](https://lda.data.parliament.uk/terms/396743) | Dutch | 0.72 | 2 | `396743` |
| [Tai Pawb](https://lda.data.parliament.uk/terms/397993) | Welsh | 0.72 | 2 | `397993` |
| [CIHT](https://lda.data.parliament.uk/terms/398342) | German | 0.72 | 1 | `398342` |
| [Lord Rowe-Beddoe](https://lda.data.parliament.uk/terms/400556) | Welsh | 0.72 | 2 | `400556` |
| [Ankyloglossia](https://lda.data.parliament.uk/terms/402566) | Latin | 0.72 | 1 | `402566` |
| [Anthony Blyth](https://lda.data.parliament.uk/terms/408602) | Welsh | 0.72 | 2 | `408602` |
| [ACCEA](https://lda.data.parliament.uk/terms/412551) | Latin | 0.72 | 1 | `412551` |
| [Vajgl, Ivo](https://lda.data.parliament.uk/terms/418621) | Portuguese | 0.72 | 2 | `418621` |
| [Lenaers, Jeroen](https://lda.data.parliament.uk/terms/422077) | Dutch | 0.72 | 2 | `422077` |
| [Badawi, Raif](https://lda.data.parliament.uk/terms/424542) | Welsh | 0.72 | 2 | `424542` |
| [Raif Badawi](https://lda.data.parliament.uk/terms/424770) | Welsh | 0.72 | 2 | `424770` |
| [Port of Cairnryan](https://lda.data.parliament.uk/terms/441088) | Welsh | 0.72 | 3 | `441088` |
| [ICCO](https://lda.data.parliament.uk/terms/442358) | Italian | 0.72 | 1 | `442358` |
| [National Memorial Arboretum](https://lda.data.parliament.uk/terms/447580) | Latin | 0.72 | 3 | `447580` |
| [Marine Management Organisation](https://lda.data.parliament.uk/terms/44945) | French | 0.72 | 3 | `44945` |
| [Melniks, Vasilijs](https://lda.data.parliament.uk/terms/450138) | Dutch | 0.72 | 2 | `450138` |
| [Vasilijs Melniks](https://lda.data.parliament.uk/terms/450140) | Dutch | 0.72 | 2 | `450140` |
| [Monteiro de Aguiar, Claudia](https://lda.data.parliament.uk/terms/450636) | Portuguese | 0.72 | 4 | `450636` |
| [Nextbike UK](https://lda.data.parliament.uk/terms/451356) | Dutch | 0.72 | 2 | `451356` |
| [EEFNI](https://lda.data.parliament.uk/terms/473625) | Welsh | 0.72 | 1 | `473625` |
| [Clairvoyance](https://lda.data.parliament.uk/terms/49417) | French | 0.72 | 1 | `49417` |
| [Alimentum](https://lda.data.parliament.uk/terms/496025) | Latin | 0.72 | 1 | `496025` |
| [Manoeuvres](https://lda.data.parliament.uk/terms/50374) | French | 0.72 | 1 | `50374` |
| [NCBs](https://lda.data.parliament.uk/terms/50513) | Portuguese | 0.72 | 1 | `50513` |
| [Baricitinib](https://lda.data.parliament.uk/terms/522414) | Latin | 0.72 | 1 | `522414` |
| [Gym](https://lda.data.parliament.uk/terms/52447) | Welsh | 0.72 | 1 | `52447` |
| [Gymnasium](https://lda.data.parliament.uk/terms/52449) | Latin | 0.72 | 1 | `52449` |
| [ECtHR](https://lda.data.parliament.uk/terms/52592) | Welsh | 0.72 | 1 | `52592` |
| [MTBE](https://lda.data.parliament.uk/terms/52828) | German | 0.72 | 1 | `52828` |
| [Apax](https://lda.data.parliament.uk/terms/53653) | Latin | 0.72 | 1 | `53653` |
| [Bethnal Green and Stepney](https://lda.data.parliament.uk/terms/545960) | Welsh | 0.72 | 4 | `545960` |
| [Boord o Leid](https://lda.data.parliament.uk/terms/54928) | Dutch | 0.72 | 3 | `54928` |
| [Albanese, Francesca](https://lda.data.parliament.uk/terms/550311) | Italian | 0.72 | 2 | `550311` |
| [Francesca Albanese](https://lda.data.parliament.uk/terms/550313) | Italian | 0.72 | 2 | `550313` |
| [BSSRS](https://lda.data.parliament.uk/terms/55153) | German | 0.72 | 1 | `55153` |
| [Orfhlaith Begley](https://lda.data.parliament.uk/terms/552936) | Irish | 0.72 | 2 | `552936` |
| [Begley, Orfhlaith](https://lda.data.parliament.uk/terms/552938) | Irish | 0.72 | 2 | `552938` |
| [Barbara Hofschroer](https://lda.data.parliament.uk/terms/552965) | Dutch | 0.72 | 2 | `552965` |
| [Centchroman](https://lda.data.parliament.uk/terms/553898) | Latin | 0.72 | 1 | `553898` |
| [Mostyn, Nicholas](https://lda.data.parliament.uk/terms/554709) | Welsh | 0.72 | 2 | `554709` |
| [Nicholas Mostyn](https://lda.data.parliament.uk/terms/554711) | Welsh | 0.72 | 2 | `554711` |
| [HMYOI Chelmsford](https://lda.data.parliament.uk/terms/555449) | Welsh | 0.72 | 2 | `555449` |
| [Naftna Industrija Srbije](https://lda.data.parliament.uk/terms/556091) | Dutch | 0.72 | 3 | `556091` |
| [CICT](https://lda.data.parliament.uk/terms/74398) | Latin | 0.72 | 1 | `74398` |
| [CTITF](https://lda.data.parliament.uk/terms/75066) | Irish | 0.72 | 1 | `75066` |
| [Deutsche Boerse](https://lda.data.parliament.uk/terms/75345) | German | 0.72 | 2 | `75345` |
| [Hoge Raad voor Diamant](https://lda.data.parliament.uk/terms/76691) | Dutch | 0.72 | 4 | `76691` |
| [ICRC](https://lda.data.parliament.uk/terms/77515) | Welsh | 0.72 | 1 | `77515` |
| [International Telecommunications Satellite Organisation](https://lda.data.parliament.uk/terms/77964) | French | 0.72 | 4 | `77964` |
| [IRORV](https://lda.data.parliament.uk/terms/78054) | Latin | 0.72 | 1 | `78054` |
| [LRHRU](https://lda.data.parliament.uk/terms/78962) | Welsh | 0.72 | 1 | `78962` |
| [Turquoise](https://lda.data.parliament.uk/terms/84297) | French | 0.72 | 1 | `84297` |
| [Zweck](https://lda.data.parliament.uk/terms/86876) | German | 0.72 | 1 | `86876` |
| [Assassination](https://lda.data.parliament.uk/terms/90264) | French | 0.72 | 1 | `90264` |
| [MVRIB](https://lda.data.parliament.uk/terms/96144) | Dutch | 0.72 | 1 | `96144` |
| [Djibouti](https://lda.data.parliament.uk/terms/9681) | French | 0.72 | 1 | `9681` |
| [OLSCC](https://lda.data.parliament.uk/terms/97349) | Irish | 0.72 | 1 | `97349` |
| [Organisation internationale de la vigne et du vin](https://lda.data.parliament.uk/terms/97409) | French | 0.72 | 8 | `97409` |
| [Guadeloupe](https://lda.data.parliament.uk/terms/10554) | French | 0.71 | 1 | `10554` |
| [Methanol](https://lda.data.parliament.uk/terms/11631) | Welsh | 0.71 | 1 | `11631` |
| [Pentachlorophenol](https://lda.data.parliament.uk/terms/12100) | Welsh | 0.71 | 1 | `12100` |
| [Rio de Janeiro](https://lda.data.parliament.uk/terms/12522) | Portuguese | 0.71 | 3 | `12522` |
| [Seychelles](https://lda.data.parliament.uk/terms/12763) | French | 0.71 | 1 | `12763` |
| [Straw](https://lda.data.parliament.uk/terms/13083) | Welsh | 0.71 | 1 | `13083` |
| [Amicus-AEEU](https://lda.data.parliament.uk/terms/1358) | Latin | 0.71 | 1 | `1358` |
| [Clo Ostaig](https://lda.data.parliament.uk/terms/20825) | Irish | 0.71 | 2 | `20825` |
| [Morgan, Bryn](https://lda.data.parliament.uk/terms/294158) | Welsh | 0.71 | 2 | `294158` |
| [Bryn Morgan](https://lda.data.parliament.uk/terms/294450) | Welsh | 0.71 | 2 | `294450` |
| [Graziani, Carlo](https://lda.data.parliament.uk/terms/300895) | Italian | 0.71 | 2 | `300895` |
| [Mihr, Karl-Heinrich](https://lda.data.parliament.uk/terms/302393) | German | 0.71 | 2 | `302393` |
| [Piecyk, Willi](https://lda.data.parliament.uk/terms/302956) | Welsh | 0.71 | 2 | `302956` |
| [Stauffenberg, Franz](https://lda.data.parliament.uk/terms/303758) | German | 0.71 | 2 | `303758` |
| [Wagenknecht, Sahra](https://lda.data.parliament.uk/terms/304244) | German | 0.71 | 2 | `304244` |
| [Zavvos, Georgio](https://lda.data.parliament.uk/terms/304536) | Italian | 0.71 | 2 | `304536` |
| [Zecchino, O](https://lda.data.parliament.uk/terms/304539) | Italian | 0.71 | 2 | `304539` |
| [Graziani,Carlo](https://lda.data.parliament.uk/terms/313844) | Italian | 0.71 | 1 | `313844` |
| [Mihr,Karl-Heinrich](https://lda.data.parliament.uk/terms/320894) | German | 0.71 | 1 | `320894` |
| [La Via, Giovanni](https://lda.data.parliament.uk/terms/348992) | Italian | 0.71 | 3 | `348992` |
| [Fulcrum TV](https://lda.data.parliament.uk/terms/35134) | Latin | 0.71 | 2 | `35134` |
| [Enerdata](https://lda.data.parliament.uk/terms/403204) | Italian | 0.71 | 1 | `403204` |
| [Van Bossuyt, Anneleen](https://lda.data.parliament.uk/terms/422093) | Dutch | 0.71 | 3 | `422093` |
| [Demesmaeker, Mark](https://lda.data.parliament.uk/terms/424948) | Dutch | 0.71 | 2 | `424948` |
| [Beghin, Tiziana](https://lda.data.parliament.uk/terms/430185) | Italian | 0.71 | 2 | `430185` |
| [Castaldo, Fabio Massimo](https://lda.data.parliament.uk/terms/431420) | Italian | 0.71 | 3 | `431420` |
| [Lewaa al-Thawra](https://lda.data.parliament.uk/terms/443864) | Dutch | 0.71 | 2 | `443864` |
| [Nctm](https://lda.data.parliament.uk/terms/444457) | Latin | 0.71 | 1 | `444457` |
| [Koudou Laurent Gbagbo](https://lda.data.parliament.uk/terms/452612) | French | 0.71 | 3 | `452612` |
| [Gbagbo, Koudou Laurent](https://lda.data.parliament.uk/terms/452614) | French | 0.71 | 3 | `452614` |
| [Mencap Cymru](https://lda.data.parliament.uk/terms/45351) | Welsh | 0.71 | 2 | `45351` |
| [Mosquitos](https://lda.data.parliament.uk/terms/455054) | Portuguese | 0.71 | 1 | `455054` |
| [RootsTech](https://lda.data.parliament.uk/terms/455098) | Dutch | 0.71 | 1 | `455098` |
| [Rhyl](https://lda.data.parliament.uk/terms/466921) | Welsh | 0.71 | 1 | `466921` |
| [Gokce Tuyluoglu](https://lda.data.parliament.uk/terms/467934) | Dutch | 0.71 | 2 | `467934` |
| [Sonnenkrieg Division](https://lda.data.parliament.uk/terms/467942) | German | 0.71 | 2 | `467942` |
| [Anthony Trafford](https://lda.data.parliament.uk/terms/475639) | Welsh | 0.71 | 2 | `475639` |
| [Cail Bruich](https://lda.data.parliament.uk/terms/478857) | Irish | 0.71 | 2 | `478857` |
| [GoodGym](https://lda.data.parliament.uk/terms/492416) | Welsh | 0.71 | 1 | `492416` |
| [Bibliographies](https://lda.data.parliament.uk/terms/49290) | Latin | 0.71 | 1 | `49290` |
| [William McCarthy](https://lda.data.parliament.uk/terms/499589) | Welsh | 0.71 | 2 | `499589` |
| [McCarthy, William](https://lda.data.parliament.uk/terms/499591) | Welsh | 0.71 | 2 | `499591` |
| [ABSA Bank](https://lda.data.parliament.uk/terms/502541) | German | 0.71 | 2 | `502541` |
| [Lyttelton, John](https://lda.data.parliament.uk/terms/504899) | Welsh | 0.71 | 2 | `504899` |
| [John Lyttelton](https://lda.data.parliament.uk/terms/504901) | Welsh | 0.71 | 2 | `504901` |
| [Port of Zeebrugge](https://lda.data.parliament.uk/terms/510932) | Dutch | 0.71 | 3 | `510932` |
| [Mobocertinib](https://lda.data.parliament.uk/terms/515745) | Latin | 0.71 | 1 | `515745` |
| [Gleiss Lutz](https://lda.data.parliament.uk/terms/516846) | German | 0.71 | 2 | `516846` |
| [Abercynon RFC](https://lda.data.parliament.uk/terms/517181) | Welsh | 0.71 | 2 | `517181` |
| [AEIC](https://lda.data.parliament.uk/terms/54350) | Irish | 0.71 | 1 | `54350` |
| [Amicus AEEU](https://lda.data.parliament.uk/terms/54602) | Latin | 0.71 | 2 | `54602` |
| [Eccles, Cat](https://lda.data.parliament.uk/terms/547115) | Latin | 0.71 | 2 | `547115` |
| [Cat Eccles](https://lda.data.parliament.uk/terms/547426) | Latin | 0.71 | 2 | `547426` |
| [Jenkins, Gwyn](https://lda.data.parliament.uk/terms/550020) | Welsh | 0.71 | 2 | `550020` |
| [Gwyn Jenkins](https://lda.data.parliament.uk/terms/550022) | Welsh | 0.71 | 2 | `550022` |
| [Ingushetia](https://lda.data.parliament.uk/terms/564152) | Latin | 0.71 | 1 | `564152` |
| [Debendox](https://lda.data.parliament.uk/terms/564854) | Latin | 0.71 | 1 | `564854` |
| [Hallux rigidus](https://lda.data.parliament.uk/terms/577651) | Latin | 0.71 | 2 | `577651` |
| [National Joint Ocean Surveillance Information Centre](https://lda.data.parliament.uk/terms/58293) | French | 0.71 | 6 | `58293` |
| [Project for Historical Biobibliography](https://lda.data.parliament.uk/terms/62148) | Latin | 0.71 | 4 | `62148` |
| [Special Reconnaissance Regiment](https://lda.data.parliament.uk/terms/68744) | French | 0.71 | 3 | `68744` |
| [BVRLA](https://lda.data.parliament.uk/terms/73768) | Italian | 0.71 | 1 | `73768` |
| [CAABU](https://lda.data.parliament.uk/terms/73815) | Latin | 0.71 | 1 | `73815` |
| [CPNI](https://lda.data.parliament.uk/terms/74921) | Dutch | 0.71 | 1 | `74921` |
| [DH](https://lda.data.parliament.uk/terms/75373) | Irish | 0.71 | 1 | `75373` |
| [Federation generale du travail de Belgique](https://lda.data.parliament.uk/terms/75818) | French | 0.71 | 6 | `75818` |
| [GJW](https://lda.data.parliament.uk/terms/76161) | Dutch | 0.71 | 1 | `76161` |
| [IACGEC](https://lda.data.parliament.uk/terms/77439) | Latin | 0.71 | 1 | `77439` |
| [Bordeaux](https://lda.data.parliament.uk/terms/8741) | French | 0.71 | 1 | `8741` |
| [Anglicanism](https://lda.data.parliament.uk/terms/90208) | Latin | 0.71 | 1 | `90208` |
| [Historiography](https://lda.data.parliament.uk/terms/91519) | Latin | 0.71 | 1 | `91519` |
| [NACETT](https://lda.data.parliament.uk/terms/96178) | French | 0.71 | 1 | `96178` |
| [NCMD](https://lda.data.parliament.uk/terms/96622) | Welsh | 0.71 | 1 | `96622` |
| [Gemcitabine](https://lda.data.parliament.uk/terms/10425) | Latin | 0.7 | 1 | `10425` |
| [Magnesium](https://lda.data.parliament.uk/terms/11483) | Latin | 0.7 | 1 | `11483` |
| [Esselte Studium](https://lda.data.parliament.uk/terms/18149) | German | 0.7 | 2 | `18149` |
| [Association of Direct Labour Organisations](https://lda.data.parliament.uk/terms/2372) | French | 0.7 | 5 | `2372` |
| [Dairygold](https://lda.data.parliament.uk/terms/28218) | Welsh | 0.7 | 1 | `28218` |
| [Berlusconi, Silvio](https://lda.data.parliament.uk/terms/296429) | Italian | 0.7 | 2 | `296429` |
| [Waen Brewery](https://lda.data.parliament.uk/terms/297387) | Welsh | 0.7 | 2 | `297387` |
| [Barbarella, Carla](https://lda.data.parliament.uk/terms/299019) | Italian | 0.7 | 2 | `299019` |
| [Ciancaglini, Michelangelo](https://lda.data.parliament.uk/terms/299720) | Italian | 0.7 | 2 | `299720` |
| [Goodlad, Alastair](https://lda.data.parliament.uk/terms/300836) | Irish | 0.7 | 2 | `300836` |
| [Griffith, Nia](https://lda.data.parliament.uk/terms/300925) | Welsh | 0.7 | 2 | `300925` |
| [Mastenbroek, Edith](https://lda.data.parliament.uk/terms/302185) | Dutch | 0.7 | 2 | `302185` |
| [Nistico, Giuseppe](https://lda.data.parliament.uk/terms/302658) | Italian | 0.7 | 2 | `302658` |
| [Pagano, Maria Grazia](https://lda.data.parliament.uk/terms/302796) | Italian | 0.7 | 3 | `302796` |
| [Ribeiro, Lord](https://lda.data.parliament.uk/terms/303206) | Portuguese | 0.7 | 2 | `303206` |
| [Schleicher, Ursula](https://lda.data.parliament.uk/terms/303470) | German | 0.7 | 2 | `303470` |
| [Stavreva, Petya](https://lda.data.parliament.uk/terms/303760) | Welsh | 0.7 | 2 | `303760` |
| [Wijsenbeek, Florus A](https://lda.data.parliament.uk/terms/304396) | Dutch | 0.7 | 3 | `304396` |
| [Barbarella,Carla](https://lda.data.parliament.uk/terms/305980) | Italian | 0.7 | 1 | `305980` |
| [Ciancaglini,Michelangelo](https://lda.data.parliament.uk/terms/309118) | Italian | 0.7 | 1 | `309118` |
| [Nia Griffith](https://lda.data.parliament.uk/terms/313966) | Welsh | 0.7 | 2 | `313966` |
| [Mastenbroek,Edith](https://lda.data.parliament.uk/terms/319816) | Dutch | 0.7 | 1 | `319816` |
| [Nistico,Giuseppe](https://lda.data.parliament.uk/terms/322152) | Italian | 0.7 | 1 | `322152` |
| [Florus A Wijsenbeek](https://lda.data.parliament.uk/terms/329275) | Dutch | 0.7 | 3 | `329275` |
| [BWC](https://lda.data.parliament.uk/terms/346172) | Welsh | 0.7 | 1 | `346172` |
| [ATVOD](https://lda.data.parliament.uk/terms/346607) | Dutch | 0.7 | 1 | `346607` |
| [Beaulieu Group](https://lda.data.parliament.uk/terms/3469) | French | 0.7 | 2 | `3469` |
| [Hydrographic Dept](https://lda.data.parliament.uk/terms/350560) | Latin | 0.7 | 2 | `350560` |
| [MIEU](https://lda.data.parliament.uk/terms/361166) | French | 0.7 | 1 | `361166` |
| [GC100](https://lda.data.parliament.uk/terms/36233) | Irish | 0.7 | 1 | `36233` |
| [Genus](https://lda.data.parliament.uk/terms/36369) | Latin | 0.7 | 1 | `36369` |
| [Karins, Krisjanis](https://lda.data.parliament.uk/terms/364034) | French | 0.7 | 2 | `364034` |
| [Myalgic Encephalomyelitis Bill 1987/88](https://lda.data.parliament.uk/terms/385556) | Latin | 0.7 | 4 | `385556` |
| [Myalgic Encephalomyelitis Bill 1990/91](https://lda.data.parliament.uk/terms/385557) | Latin | 0.7 | 4 | `385557` |
| [Alastair Goodlad](https://lda.data.parliament.uk/terms/399536) | Irish | 0.7 | 2 | `399536` |
| [Lord Ribeiro](https://lda.data.parliament.uk/terms/400524) | Portuguese | 0.7 | 2 | `400524` |
| [APFA](https://lda.data.parliament.uk/terms/402870) | Irish | 0.7 | 1 | `402870` |
| [Istituto Carlo Cattaneo](https://lda.data.parliament.uk/terms/41236) | Italian | 0.7 | 3 | `41236` |
| [MLMS](https://lda.data.parliament.uk/terms/416875) | Welsh | 0.7 | 1 | `416875` |
| [Arabic](https://lda.data.parliament.uk/terms/419225) | Latin | 0.7 | 1 | `419225` |
| [AFSP](https://lda.data.parliament.uk/terms/425656) | Dutch | 0.7 | 1 | `425656` |
| [African trypanosomiasis](https://lda.data.parliament.uk/terms/436437) | Latin | 0.7 | 2 | `436437` |
| [Madeireira Juary](https://lda.data.parliament.uk/terms/43943) | Portuguese | 0.7 | 2 | `43943` |
| [OpenRent](https://lda.data.parliament.uk/terms/446843) | French | 0.7 | 1 | `446843` |
| [Sisodia, Mrunal](https://lda.data.parliament.uk/terms/459900) | Welsh | 0.7 | 2 | `459900` |
| [Mrunal Sisodia](https://lda.data.parliament.uk/terms/459902) | Welsh | 0.7 | 2 | `459902` |
| [Davies, Evan Mervyn](https://lda.data.parliament.uk/terms/461224) | Welsh | 0.7 | 3 | `461224` |
| [Evan Mervyn Davies](https://lda.data.parliament.uk/terms/461226) | Welsh | 0.7 | 3 | `461226` |
| [Mackrory, Cherilyn](https://lda.data.parliament.uk/terms/464965) | Welsh | 0.7 | 2 | `464965` |
| [Cherilyn Mackrory](https://lda.data.parliament.uk/terms/465161) | Welsh | 0.7 | 2 | `465161` |
| [Blyth](https://lda.data.parliament.uk/terms/481314) | Welsh | 0.7 | 1 | `481314` |
| [Stellantis](https://lda.data.parliament.uk/terms/485393) | Latin | 0.7 | 1 | `485393` |
| [International Maritime Organisation](https://lda.data.parliament.uk/terms/489631) | French | 0.7 | 3 | `489631` |
| [LBST](https://lda.data.parliament.uk/terms/490300) | German | 0.7 | 1 | `490300` |
| [DAO](https://lda.data.parliament.uk/terms/49564) | Irish | 0.7 | 1 | `49564` |
| [Delyth Morgan](https://lda.data.parliament.uk/terms/498173) | Welsh | 0.7 | 2 | `498173` |
| [Morgan Delyth](https://lda.data.parliament.uk/terms/498175) | Welsh | 0.7 | 2 | `498175` |
| [Titanium](https://lda.data.parliament.uk/terms/501230) | Latin | 0.7 | 1 | `501230` |
| [Cross, Assheton Henry](https://lda.data.parliament.uk/terms/504949) | Welsh | 0.7 | 3 | `504949` |
| [Assheton Henry Cross](https://lda.data.parliament.uk/terms/504951) | Welsh | 0.7 | 3 | `504951` |
| [NVZs](https://lda.data.parliament.uk/terms/50558) | Latin | 0.7 | 1 | `50558` |
| [DevClever](https://lda.data.parliament.uk/terms/507480) | German | 0.7 | 1 | `507480` |
| [Silvio Berlusconi](https://lda.data.parliament.uk/terms/514382) | Italian | 0.7 | 2 | `514382` |
| [Bannau Brycheiniog National Park Authority](https://lda.data.parliament.uk/terms/515664) | Welsh | 0.7 | 5 | `515664` |
| [Nuisances](https://lda.data.parliament.uk/terms/51576) | French | 0.7 | 1 | `51576` |
| [Antarctica](https://lda.data.parliament.uk/terms/51733) | Latin | 0.7 | 1 | `51733` |
| [Tubuitamana, Kia](https://lda.data.parliament.uk/terms/518539) | Latin | 0.7 | 2 | `518539` |
| [Kia Tubuitamana](https://lda.data.parliament.uk/terms/518541) | Latin | 0.7 | 2 | `518541` |
| [GAAC](https://lda.data.parliament.uk/terms/522234) | Dutch | 0.7 | 1 | `522234` |
| [ICCPR](https://lda.data.parliament.uk/terms/52537) | Latin | 0.7 | 1 | `52537` |
| [JDRF](https://lda.data.parliament.uk/terms/525444) | Dutch | 0.7 | 1 | `525444` |
| [GoHenry](https://lda.data.parliament.uk/terms/525644) | Welsh | 0.7 | 1 | `525644` |
| [Cimex lectularius](https://lda.data.parliament.uk/terms/526136) | Latin | 0.7 | 2 | `526136` |
| [International Maritime Satellite Organisation](https://lda.data.parliament.uk/terms/53693) | French | 0.7 | 4 | `53693` |
| [Aplastic anaemia](https://lda.data.parliament.uk/terms/554971) | Latin | 0.7 | 2 | `554971` |
| [Decorum NI](https://lda.data.parliament.uk/terms/567541) | Latin | 0.7 | 2 | `567541` |
| [Tadjadit, Mohamed](https://lda.data.parliament.uk/terms/569804) | French | 0.7 | 2 | `569804` |
| [Mohamed Tadjadit](https://lda.data.parliament.uk/terms/569806) | French | 0.7 | 2 | `569806` |
| [Public Transport Consortium of Non-Metropolitan Counties](https://lda.data.parliament.uk/terms/65532) | Latin | 0.7 | 6 | `65532` |
| [Qjump](https://lda.data.parliament.uk/terms/65584) | Spanish | 0.7 | 1 | `65584` |
| [Society for Mucopolysaccharide Diseases](https://lda.data.parliament.uk/terms/67916) | Latin | 0.7 | 4 | `67916` |
| [Staedtler](https://lda.data.parliament.uk/terms/68970) | German | 0.7 | 1 | `68970` |
| [SNAP Cymru](https://lda.data.parliament.uk/terms/70440) | Welsh | 0.7 | 2 | `70440` |
| [Snowdonia Society](https://lda.data.parliament.uk/terms/70447) | Welsh | 0.7 | 2 | `70447` |
| [CRND](https://lda.data.parliament.uk/terms/74994) | Welsh | 0.7 | 1 | `74994` |
| [CSAW](https://lda.data.parliament.uk/terms/75026) | Welsh | 0.7 | 1 | `75026` |
| [HGRG](https://lda.data.parliament.uk/terms/76579) | Welsh | 0.7 | 1 | `76579` |
| [IEDSS](https://lda.data.parliament.uk/terms/77551) | German | 0.7 | 1 | `77551` |
| [MHS](https://lda.data.parliament.uk/terms/79235) | Irish | 0.7 | 1 | `79235` |
| [Analgesics](https://lda.data.parliament.uk/terms/8345) | German | 0.7 | 1 | `8345` |
| [Tinopolis](https://lda.data.parliament.uk/terms/83701) | Latin | 0.7 | 1 | `83701` |
| [Dependants](https://lda.data.parliament.uk/terms/90864) | French | 0.7 | 1 | `90864` |
| [Law](https://lda.data.parliament.uk/terms/91795) | Welsh | 0.7 | 1 | `91795` |
| [NIHRC](https://lda.data.parliament.uk/terms/96948) | German | 0.7 | 1 | `96948` |
| [PARBUL](https://lda.data.parliament.uk/terms/98452) | Latin | 0.7 | 1 | `98452` |
| [ECOS-Ouverture](https://lda.data.parliament.uk/terms/9850) | French | 0.7 | 1 | `9850` |
| [Incontinence](https://lda.data.parliament.uk/terms/10868) | French | 0.69 | 1 | `10868` |
| [Liechtenstein](https://lda.data.parliament.uk/terms/11329) | German | 0.69 | 1 | `11329` |
| [Mauritius](https://lda.data.parliament.uk/terms/11573) | Latin | 0.69 | 1 | `11573` |
| [Spectacles](https://lda.data.parliament.uk/terms/12976) | French | 0.69 | 1 | `12976` |
| [Torfaen](https://lda.data.parliament.uk/terms/13312) | Welsh | 0.69 | 1 | `13312` |
| [Varroosis](https://lda.data.parliament.uk/terms/13580) | Latin | 0.69 | 1 | `13580` |
| [Electrolux](https://lda.data.parliament.uk/terms/17389) | Latin | 0.69 | 1 | `17389` |
| [esure](https://lda.data.parliament.uk/terms/18197) | French | 0.69 | 1 | `18197` |
| [ContactBabel](https://lda.data.parliament.uk/terms/21349) | Dutch | 0.69 | 1 | `21349` |
| [Accudyne](https://lda.data.parliament.uk/terms/229) | Welsh | 0.69 | 1 | `229` |
| [Institut royal des relations internationales](https://lda.data.parliament.uk/terms/26969) | French | 0.69 | 5 | `26969` |
| [Brigadas Internacionales](https://lda.data.parliament.uk/terms/287412) | Spanish | 0.69 | 2 | `287412` |
| [Aglietta, Maria Adelaide](https://lda.data.parliament.uk/terms/298779) | Italian | 0.69 | 3 | `298779` |
| [Carraro, Massimo](https://lda.data.parliament.uk/terms/299594) | Italian | 0.69 | 2 | `299594` |
| [Jones of Penybont, Lord](https://lda.data.parliament.uk/terms/301505) | Welsh | 0.69 | 4 | `301505` |
| [Lyell of Markyate, Lord](https://lda.data.parliament.uk/terms/302006) | Welsh | 0.69 | 4 | `302006` |
| [Napoletano, Pasqualina](https://lda.data.parliament.uk/terms/302599) | Italian | 0.69 | 2 | `302599` |
| [Rees, Merlyn](https://lda.data.parliament.uk/terms/303166) | Welsh | 0.69 | 2 | `303166` |
| [Terlezki, Stefan](https://lda.data.parliament.uk/terms/303950) | German | 0.69 | 2 | `303950` |
| [Tzounis, Ioannis](https://lda.data.parliament.uk/terms/304116) | Latin | 0.69 | 2 | `304116` |
| [Aglietta,Maria Adelaide](https://lda.data.parliament.uk/terms/305002) | Italian | 0.69 | 2 | `305002` |
| [Napoletano,Pasqualina](https://lda.data.parliament.uk/terms/321886) | Italian | 0.69 | 1 | `321886` |
| [Correia de Campos, Antonio Fernando](https://lda.data.parliament.uk/terms/347436) | Portuguese | 0.69 | 5 | `347436` |
| [Corticosteroids](https://lda.data.parliament.uk/terms/363960) | Latin | 0.69 | 1 | `363960` |
| [Gonville and Caius College](https://lda.data.parliament.uk/terms/36752) | Latin | 0.69 | 4 | `36752` |
| [International Rectifiers](https://lda.data.parliament.uk/terms/37732) | French | 0.69 | 2 | `37732` |
| [IEH](https://lda.data.parliament.uk/terms/395121) | German | 0.69 | 1 | `395121` |
| [Lord Lyell of Markyate](https://lda.data.parliament.uk/terms/400040) | Welsh | 0.69 | 4 | `400040` |
| [Merlyn Rees](https://lda.data.parliament.uk/terms/412385) | Welsh | 0.69 | 2 | `412385` |
| [Quindell](https://lda.data.parliament.uk/terms/416779) | Italian | 0.69 | 1 | `416779` |
| [CNCS](https://lda.data.parliament.uk/terms/426511) | French | 0.69 | 1 | `426511` |
| [POhWER](https://lda.data.parliament.uk/terms/438125) | German | 0.69 | 1 | `438125` |
| [RateSetter](https://lda.data.parliament.uk/terms/439046) | Italian | 0.69 | 1 | `439046` |
| [MU Maintenance](https://lda.data.parliament.uk/terms/44344) | French | 0.69 | 2 | `44344` |
| [Muiden Chemie](https://lda.data.parliament.uk/terms/44349) | Dutch | 0.69 | 2 | `44349` |
| [Royal HaskoningDHV](https://lda.data.parliament.uk/terms/452944) | Dutch | 0.69 | 2 | `452944` |
| [Arabsat](https://lda.data.parliament.uk/terms/454856) | German | 0.69 | 1 | `454856` |
| [CliniQ](https://lda.data.parliament.uk/terms/456180) | French | 0.69 | 1 | `456180` |
| [IFFIm](https://lda.data.parliament.uk/terms/456192) | Latin | 0.69 | 1 | `456192` |
| [SAIF](https://lda.data.parliament.uk/terms/457122) | Welsh | 0.69 | 1 | `457122` |
| [Ashoori, Anoosheh](https://lda.data.parliament.uk/terms/460526) | Dutch | 0.69 | 2 | `460526` |
| [Anoosheh Ashoori](https://lda.data.parliament.uk/terms/460528) | Dutch | 0.69 | 2 | `460528` |
| [AGNC](https://lda.data.parliament.uk/terms/460811) | Latin | 0.69 | 1 | `460811` |
| [Momentum Music](https://lda.data.parliament.uk/terms/46118) | Latin | 0.69 | 2 | `46118` |
| [Gareth Wyn Williams](https://lda.data.parliament.uk/terms/475950) | Welsh | 0.69 | 3 | `475950` |
| [Cerumen](https://lda.data.parliament.uk/terms/481896) | Latin | 0.69 | 1 | `481896` |
| [Capecchi, Mario](https://lda.data.parliament.uk/terms/485809) | Italian | 0.69 | 2 | `485809` |
| [Mario Capecchi](https://lda.data.parliament.uk/terms/485833) | Italian | 0.69 | 2 | `485833` |
| [Hagia Sophia](https://lda.data.parliament.uk/terms/488392) | Latin | 0.69 | 2 | `488392` |
| [Peritonitis](https://lda.data.parliament.uk/terms/488514) | Latin | 0.69 | 1 | `488514` |
| [International Civil Aviation Organisation](https://lda.data.parliament.uk/terms/489770) | French | 0.69 | 4 | `489770` |
| [UBI Lab Cymru](https://lda.data.parliament.uk/terms/490205) | Welsh | 0.69 | 3 | `490205` |
| [Sushantha Bhattacharyya](https://lda.data.parliament.uk/terms/495127) | Welsh | 0.69 | 2 | `495127` |
| [Bhattacharyya, Sushantha](https://lda.data.parliament.uk/terms/495130) | Welsh | 0.69 | 2 | `495130` |
| [Therium](https://lda.data.parliament.uk/terms/496736) | Latin | 0.69 | 1 | `496736` |
| [Caisse nationale de Credit agricole](https://lda.data.parliament.uk/terms/497058) | French | 0.69 | 5 | `497058` |
| [Idiopathic CD4+ lymphocytopenia](https://lda.data.parliament.uk/terms/498056) | Latin | 0.69 | 3 | `498056` |
| [Idiopathic CD4 lymphocytopenia](https://lda.data.parliament.uk/terms/498058) | Latin | 0.69 | 3 | `498058` |
| [COPFS](https://lda.data.parliament.uk/terms/500510) | German | 0.69 | 1 | `500510` |
| [Shionogi](https://lda.data.parliament.uk/terms/501713) | Welsh | 0.69 | 1 | `501713` |
| [Creag Riabhach Wind Farm](https://lda.data.parliament.uk/terms/501871) | Irish | 0.69 | 4 | `501871` |
| [Henry Lyttelton Alexander Hood](https://lda.data.parliament.uk/terms/505174) | Welsh | 0.69 | 4 | `505174` |
| [Hood, Henry Lyttelton Alexander](https://lda.data.parliament.uk/terms/505176) | Welsh | 0.69 | 4 | `505176` |
| [Fenethylline](https://lda.data.parliament.uk/terms/509527) | Welsh | 0.69 | 1 | `509527` |
| [Unique Positive Solutions](https://lda.data.parliament.uk/terms/513679) | French | 0.69 | 3 | `513679` |
| [al-Miqdad, Abdul Jalil](https://lda.data.parliament.uk/terms/515962) | Spanish | 0.69 | 3 | `515962` |
| [Abdul Jalil al-Miqdad](https://lda.data.parliament.uk/terms/515966) | Spanish | 0.69 | 3 | `515966` |
| [Tarazona, Javier](https://lda.data.parliament.uk/terms/516160) | Spanish | 0.69 | 2 | `516160` |
| [Javier Tarazona](https://lda.data.parliament.uk/terms/516162) | Spanish | 0.69 | 2 | `516162` |
| [Cardiopulmonary resuscitation](https://lda.data.parliament.uk/terms/517482) | Latin | 0.69 | 2 | `517482` |
| [CHPP](https://lda.data.parliament.uk/terms/51950) | Latin | 0.69 | 1 | `51950` |
| [Davies, Nerys](https://lda.data.parliament.uk/terms/519976) | Welsh | 0.69 | 2 | `519976` |
| [Nerys Davies](https://lda.data.parliament.uk/terms/519978) | Welsh | 0.69 | 2 | `519978` |
| [SWGfL](https://lda.data.parliament.uk/terms/526373) | Welsh | 0.69 | 1 | `526373` |
| [ArupTransportPlanning](https://lda.data.parliament.uk/terms/53732) | Dutch | 0.69 | 1 | `53732` |
| [ACSL](https://lda.data.parliament.uk/terms/53891) | Irish | 0.69 | 1 | `53891` |
| [BAAS](https://lda.data.parliament.uk/terms/53970) | Dutch | 0.69 | 1 | `53970` |
| [HMS Dalriada](https://lda.data.parliament.uk/terms/540873) | Welsh | 0.69 | 2 | `540873` |
| [Lord Jones of Penybont](https://lda.data.parliament.uk/terms/553912) | Welsh | 0.69 | 4 | `553912` |
| [HMYOI Hatfield](https://lda.data.parliament.uk/terms/555329) | Welsh | 0.69 | 2 | `555329` |
| [Bryan, Kieron (entrepreneur)](https://lda.data.parliament.uk/terms/556703) | French | 0.69 | 3 | `556703` |
| [Haskoning](https://lda.data.parliament.uk/terms/569583) | Dutch | 0.69 | 1 | `569583` |
| [Sotheby's](https://lda.data.parliament.uk/terms/68145) | Welsh | 0.69 | 1 | `68145` |
| [Stabilisation Unit](https://lda.data.parliament.uk/terms/68965) | French | 0.69 | 2 | `68965` |
| [Southeach](https://lda.data.parliament.uk/terms/70552) | Irish | 0.69 | 1 | `70552` |
| [BVAF](https://lda.data.parliament.uk/terms/73766) | Welsh | 0.69 | 1 | `73766` |
| [CEEP](https://lda.data.parliament.uk/terms/74091) | Dutch | 0.69 | 1 | `74091` |
| [CPGB](https://lda.data.parliament.uk/terms/74917) | Welsh | 0.69 | 1 | `74917` |
| [DLRVS](https://lda.data.parliament.uk/terms/76866) | French | 0.69 | 1 | `76866` |
| [UK Quantum Chromodynamics Collaboration](https://lda.data.parliament.uk/terms/84550) | Latin | 0.69 | 4 | `84550` |
| [Direct service organisations](https://lda.data.parliament.uk/terms/90914) | French | 0.69 | 3 | `90914` |
| [Management techniques](https://lda.data.parliament.uk/terms/91918) | French | 0.69 | 2 | `91918` |
| [Nationalisation](https://lda.data.parliament.uk/terms/92120) | French | 0.69 | 1 | `92120` |
| [NAHT Cymru](https://lda.data.parliament.uk/terms/96210) | Welsh | 0.69 | 2 | `96210` |
| [Vlaams Parlement](https://lda.data.parliament.uk/terms/100425) | Dutch | 0.68 | 2 | `100425` |
| [Frankfurt](https://lda.data.parliament.uk/terms/10355) | German | 0.68 | 1 | `10355` |
| [Monmouthshire](https://lda.data.parliament.uk/terms/11723) | Welsh | 0.68 | 1 | `11723` |
| [Britoil](https://lda.data.parliament.uk/terms/16493) | French | 0.68 | 1 | `16493` |
| [EKO Stahl](https://lda.data.parliament.uk/terms/17333) | German | 0.68 | 2 | `17333` |
| [Elm Village Tenants Association](https://lda.data.parliament.uk/terms/17453) | French | 0.68 | 4 | `17453` |
| [Carbolibrium](https://lda.data.parliament.uk/terms/18891) | Latin | 0.68 | 1 | `18891` |
| [Datarun](https://lda.data.parliament.uk/terms/28335) | Latin | 0.68 | 1 | `28335` |
| [De Zoete and Bevan](https://lda.data.parliament.uk/terms/28391) | Dutch | 0.68 | 4 | `28391` |
| [Deutsche Post](https://lda.data.parliament.uk/terms/28945) | German | 0.68 | 2 | `28945` |
| [Constantine, Theodore](https://lda.data.parliament.uk/terms/291579) | Latin | 0.68 | 2 | `291579` |
| [DrugScope](https://lda.data.parliament.uk/terms/29534) | Dutch | 0.68 | 1 | `29534` |
| [NUTFA](https://lda.data.parliament.uk/terms/298468) | German | 0.68 | 1 | `298468` |
| [Aigner, Heinrich](https://lda.data.parliament.uk/terms/298786) | German | 0.68 | 2 | `298786` |
| [Bartolozzi, Paolo](https://lda.data.parliament.uk/terms/299043) | Italian | 0.68 | 2 | `299043` |
| [Davies, Glyn](https://lda.data.parliament.uk/terms/300057) | Welsh | 0.68 | 2 | `300057` |
| [De Piccoli, Cesare](https://lda.data.parliament.uk/terms/300097) | Italian | 0.68 | 3 | `300097` |
| [Deutsch, Tamas](https://lda.data.parliament.uk/terms/300158) | German | 0.68 | 2 | `300158` |
| [Dumitriu, Constantin](https://lda.data.parliament.uk/terms/300270) | Latin | 0.68 | 2 | `300270` |
| [Griffiths, Lesley](https://lda.data.parliament.uk/terms/300932) | Welsh | 0.68 | 2 | `300932` |
| [Heinrich, Brigitte](https://lda.data.parliament.uk/terms/301153) | German | 0.68 | 2 | `301153` |
| [Kirkwood, Archy](https://lda.data.parliament.uk/terms/301657) | Welsh | 0.68 | 2 | `301657` |
| [Mitterdorfer, K](https://lda.data.parliament.uk/terms/302431) | German | 0.68 | 2 | `302431` |
| [Vincenzi, Marta](https://lda.data.parliament.uk/terms/304218) | Italian | 0.68 | 2 | `304218` |
| [Aigner,Heinrich](https://lda.data.parliament.uk/terms/305014) | German | 0.68 | 1 | `305014` |
| [Glyn Davies](https://lda.data.parliament.uk/terms/310561) | Welsh | 0.68 | 2 | `310561` |
| [De Piccoli,Cesare](https://lda.data.parliament.uk/terms/310720) | Italian | 0.68 | 2 | `310720` |
| [Heinrich,Brigitte](https://lda.data.parliament.uk/terms/315014) | German | 0.68 | 1 | `315014` |
| [Mitterdorfer,K](https://lda.data.parliament.uk/terms/321116) | German | 0.68 | 1 | `321116` |
| [EAGA](https://lda.data.parliament.uk/terms/32799) | Irish | 0.68 | 1 | `32799` |
| [Hooson, Hugh](https://lda.data.parliament.uk/terms/349154) | Welsh | 0.68 | 2 | `349154` |
| [Groupe des Sages](https://lda.data.parliament.uk/terms/35208) | French | 0.68 | 3 | `35208` |
| [Haycan](https://lda.data.parliament.uk/terms/35677) | Welsh | 0.68 | 1 | `35677` |
| [Rinaldi, Niccolo](https://lda.data.parliament.uk/terms/359843) | Italian | 0.68 | 2 | `359843` |
| [Hibernia Atlantic](https://lda.data.parliament.uk/terms/36112) | Latin | 0.68 | 2 | `36112` |
| [ISDDE](https://lda.data.parliament.uk/terms/366441) | Welsh | 0.68 | 1 | `366441` |
| [Act of Sederunt (Consumer Credit Act 1974) 1985 (Amendment) 1995](https://lda.data.parliament.uk/terms/370867) | Latin | 0.68 | 10 | `370867` |
| [OVESCO](https://lda.data.parliament.uk/terms/395322) | Italian | 0.68 | 1 | `395322` |
| [IACCM](https://lda.data.parliament.uk/terms/398029) | Italian | 0.68 | 1 | `398029` |
| [Archy Kirkwood](https://lda.data.parliament.uk/terms/399937) | Welsh | 0.68 | 2 | `399937` |
| [Turkiye Halk Kurtulus Partisi-Cephesi](https://lda.data.parliament.uk/terms/405758) | Latin | 0.68 | 4 | `405758` |
| [Buddi](https://lda.data.parliament.uk/terms/406470) | Welsh | 0.68 | 1 | `406470` |
| [Hugh Hooson](https://lda.data.parliament.uk/terms/406910) | Welsh | 0.68 | 2 | `406910` |
| [Theodore Constantine](https://lda.data.parliament.uk/terms/407609) | Latin | 0.68 | 2 | `407609` |
| [Ataxia telangiectasia](https://lda.data.parliament.uk/terms/421766) | Latin | 0.68 | 2 | `421766` |
| [Cabezon Ruiz, Soledad](https://lda.data.parliament.uk/terms/424943) | Spanish | 0.68 | 3 | `424943` |
| [EUIPO](https://lda.data.parliament.uk/terms/431272) | Spanish | 0.68 | 1 | `431272` |
| [EDAW](https://lda.data.parliament.uk/terms/438631) | Welsh | 0.68 | 1 | `438631` |
| [Piperacillin/tazobactam](https://lda.data.parliament.uk/terms/438784) | Latin | 0.68 | 1 | `438784` |
| [Walsall Arboretum](https://lda.data.parliament.uk/terms/456699) | Latin | 0.68 | 2 | `456699` |
| [Dahrendorf, Ralf](https://lda.data.parliament.uk/terms/461200) | German | 0.68 | 2 | `461200` |
| [Ralf Dahrendorf](https://lda.data.parliament.uk/terms/461202) | German | 0.68 | 2 | `461202` |
| [Laercio Souza Silva](https://lda.data.parliament.uk/terms/471588) | Portuguese | 0.68 | 3 | `471588` |
| [Dalriada Trustees](https://lda.data.parliament.uk/terms/472665) | Welsh | 0.68 | 2 | `472665` |
| [Topwood](https://lda.data.parliament.uk/terms/481463) | Welsh | 0.68 | 1 | `481463` |
| [Lesley Griffiths](https://lda.data.parliament.uk/terms/488891) | Welsh | 0.68 | 2 | `488891` |
| [RAF Shawbury](https://lda.data.parliament.uk/terms/491275) | Welsh | 0.68 | 2 | `491275` |
| [Clegg, Lee](https://lda.data.parliament.uk/terms/491381) | Dutch | 0.68 | 2 | `491381` |
| [Lee Clegg](https://lda.data.parliament.uk/terms/491383) | Dutch | 0.68 | 2 | `491383` |
| [Casirivimab/imdevimab](https://lda.data.parliament.uk/terms/491691) | Latin | 0.68 | 1 | `491691` |
| [Casirivimab](https://lda.data.parliament.uk/terms/491695) | Latin | 0.68 | 1 | `491695` |
| [Aerosol propellants](https://lda.data.parliament.uk/terms/49176) | Latin | 0.68 | 2 | `49176` |
| [Affirmations](https://lda.data.parliament.uk/terms/49179) | French | 0.68 | 1 | `49179` |
| [Amusements](https://lda.data.parliament.uk/terms/49215) | French | 0.68 | 1 | `49215` |
| [Hebblethwaite, Peter](https://lda.data.parliament.uk/terms/497177) | Welsh | 0.68 | 2 | `497177` |
| [Peter Hebblethwaite](https://lda.data.parliament.uk/terms/497179) | Welsh | 0.68 | 2 | `497179` |
| [Byng, Timothy](https://lda.data.parliament.uk/terms/505534) | Welsh | 0.68 | 2 | `505534` |
| [IYDU](https://lda.data.parliament.uk/terms/507150) | Welsh | 0.68 | 1 | `507150` |
| [CASCAIDr](https://lda.data.parliament.uk/terms/509765) | Irish | 0.68 | 1 | `509765` |
| [Asulam](https://lda.data.parliament.uk/terms/518487) | Latin | 0.68 | 1 | `518487` |
| [Derby, Earl](https://lda.data.parliament.uk/terms/522826) | Welsh | 0.68 | 2 | `522826` |
| [BenevolentBio](https://lda.data.parliament.uk/terms/523359) | Latin | 0.68 | 1 | `523359` |
| [Ebixa](https://lda.data.parliament.uk/terms/52767) | Portuguese | 0.68 | 1 | `52767` |
| [Kraft Heinz](https://lda.data.parliament.uk/terms/528550) | German | 0.68 | 2 | `528550` |
| [NDDP](https://lda.data.parliament.uk/terms/52861) | Latin | 0.68 | 1 | `52861` |
| [Oleoresin capsicum](https://lda.data.parliament.uk/terms/52962) | Latin | 0.68 | 2 | `52962` |
| [ACVT](https://lda.data.parliament.uk/terms/53999) | Latin | 0.68 | 1 | `53999` |
| [Vortioxetine](https://lda.data.parliament.uk/terms/548667) | Latin | 0.68 | 1 | `548667` |
| [Bruno Araujo Pereira](https://lda.data.parliament.uk/terms/552944) | Portuguese | 0.68 | 3 | `552944` |
| [HMYOI Aylesbury](https://lda.data.parliament.uk/terms/555127) | Welsh | 0.68 | 2 | `555127` |
| [Jones, Gwyn](https://lda.data.parliament.uk/terms/560072) | Welsh | 0.68 | 2 | `560072` |
| [Gwyn Jones](https://lda.data.parliament.uk/terms/560074) | Welsh | 0.68 | 2 | `560074` |
| [Connolly, Lucy](https://lda.data.parliament.uk/terms/560505) | Welsh | 0.68 | 2 | `560505` |
| [Lucy Connolly](https://lda.data.parliament.uk/terms/560507) | Welsh | 0.68 | 2 | `560507` |
| [Petrobras](https://lda.data.parliament.uk/terms/61559) | Portuguese | 0.68 | 1 | `61559` |
| [CPPIH](https://lda.data.parliament.uk/terms/74924) | Latin | 0.68 | 1 | `74924` |
| [EPAQS](https://lda.data.parliament.uk/terms/75454) | Welsh | 0.68 | 1 | `75454` |
| [FAFS](https://lda.data.parliament.uk/terms/75724) | Dutch | 0.68 | 1 | `75724` |
| [DSD](https://lda.data.parliament.uk/terms/76957) | Dutch | 0.68 | 1 | `76957` |
| [MDF](https://lda.data.parliament.uk/terms/79143) | Welsh | 0.68 | 1 | `79143` |
| [Surveillance](https://lda.data.parliament.uk/terms/93176) | French | 0.68 | 1 | `93176` |
| [Derby North](https://lda.data.parliament.uk/terms/9620) | Welsh | 0.68 | 2 | `9620` |
| [Madagascar](https://lda.data.parliament.uk/terms/11471) | French | 0.67 | 1 | `11471` |
| [Mauritania](https://lda.data.parliament.uk/terms/11572) | Latin | 0.67 | 1 | `11572` |
| [ECORYS](https://lda.data.parliament.uk/terms/17137) | Welsh | 0.67 | 1 | `17137` |
| [Caledonian MacBrayne](https://lda.data.parliament.uk/terms/18460) | Welsh | 0.67 | 2 | `18460` |
| [CWT](https://lda.data.parliament.uk/terms/19059) | Welsh | 0.67 | 1 | `19059` |
| [FDSW](https://lda.data.parliament.uk/terms/287193) | Dutch | 0.67 | 1 | `287193` |
| [Adams, Vyvyan](https://lda.data.parliament.uk/terms/290833) | Irish | 0.67 | 2 | `290833` |
| [Vyvyan Adams](https://lda.data.parliament.uk/terms/291406) | Irish | 0.67 | 2 | `291406` |
| [Cryptosporidium](https://lda.data.parliament.uk/terms/298444) | Latin | 0.67 | 1 | `298444` |
| [Baldarelli, Francesco](https://lda.data.parliament.uk/terms/298994) | Italian | 0.67 | 2 | `298994` |
| [Lowry, Lord](https://lda.data.parliament.uk/terms/301983) | Welsh | 0.67 | 2 | `301983` |
| [Pittella, Giovanni](https://lda.data.parliament.uk/terms/302977) | Italian | 0.67 | 2 | `302977` |
| [Todd, Lord](https://lda.data.parliament.uk/terms/304014) | Welsh | 0.67 | 2 | `304014` |
| [Volcic, Demetrio](https://lda.data.parliament.uk/terms/304232) | Latin | 0.67 | 2 | `304232` |
| [Baldarelli,Francesco](https://lda.data.parliament.uk/terms/305868) | Italian | 0.67 | 1 | `305868` |
| [Fidanza, Carlo](https://lda.data.parliament.uk/terms/348264) | Italian | 0.67 | 2 | `348264` |
| [Hamlyn Trust](https://lda.data.parliament.uk/terms/35450) | Welsh | 0.67 | 2 | `35450` |
| [GEHE](https://lda.data.parliament.uk/terms/36259) | German | 0.67 | 1 | `36259` |
| [Cohabitation (Contract Enforcement) Bill 1990/91](https://lda.data.parliament.uk/terms/374438) | French | 0.67 | 5 | `374438` |
| [4NW](https://lda.data.parliament.uk/terms/39) | Welsh | 0.67 | 1 | `39` |
| [Dyfed Bill (HL) 1985/86 to 1987/88](https://lda.data.parliament.uk/terms/391870) | Welsh | 0.67 | 6 | `391870` |
| [Malaria Consortium](https://lda.data.parliament.uk/terms/398366) | Latin | 0.67 | 2 | `398366` |
| [Silvestris, Sergio Paolo Francesco](https://lda.data.parliament.uk/terms/402429) | Italian | 0.67 | 4 | `402429` |
| [Bophutatswana Tuberculosis Association](https://lda.data.parliament.uk/terms/4083) | Latin | 0.67 | 3 | `4083` |
| [Islwyn Borough Council](https://lda.data.parliament.uk/terms/41208) | Welsh | 0.67 | 3 | `41208` |
| [Lord Lowry](https://lda.data.parliament.uk/terms/412893) | Welsh | 0.67 | 2 | `412893` |
| [Lord Todd](https://lda.data.parliament.uk/terms/412958) | Welsh | 0.67 | 2 | `412958` |
| [Documentation Francaise](https://lda.data.parliament.uk/terms/421845) | French | 0.67 | 2 | `421845` |
| [Pericarditis](https://lda.data.parliament.uk/terms/423209) | Latin | 0.67 | 1 | `423209` |
| [Tanasescu, Claudiu Ciprian](https://lda.data.parliament.uk/terms/425014) | Latin | 0.67 | 3 | `425014` |
| [Agulhas](https://lda.data.parliament.uk/terms/425787) | Portuguese | 0.67 | 1 | `425787` |
| [Translarna](https://lda.data.parliament.uk/terms/426688) | Latin | 0.67 | 1 | `426688` |
| [Dyfed Bill [HL] 1985/86 to 1987/88](https://lda.data.parliament.uk/terms/427778) | Welsh | 0.67 | 6 | `427778` |
| [Avient Aviation](https://lda.data.parliament.uk/terms/429865) | French | 0.67 | 2 | `429865` |
| [Bosutinib](https://lda.data.parliament.uk/terms/433698) | Latin | 0.67 | 1 | `433698` |
| [Nagy, Jozsef](https://lda.data.parliament.uk/terms/434025) | Welsh | 0.67 | 2 | `434025` |
| [Russell-Moyle, Lloyd](https://lda.data.parliament.uk/terms/437214) | Welsh | 0.67 | 2 | `437214` |
| [Lloyd Russell-Moyle](https://lda.data.parliament.uk/terms/437452) | Welsh | 0.67 | 2 | `437452` |
| [SpiritsEUROPE](https://lda.data.parliament.uk/terms/437545) | Dutch | 0.67 | 1 | `437545` |
| [Lifford, William](https://lda.data.parliament.uk/terms/442188) | Welsh | 0.67 | 2 | `442188` |
| [William Lifford](https://lda.data.parliament.uk/terms/442190) | Welsh | 0.67 | 2 | `442190` |
| [Zaitschenko, Stefan](https://lda.data.parliament.uk/terms/442318) | German | 0.67 | 2 | `442318` |
| [Atlas Elektronik UK](https://lda.data.parliament.uk/terms/451164) | German | 0.67 | 3 | `451164` |
| [Meirion-Dwyfor College](https://lda.data.parliament.uk/terms/45328) | Welsh | 0.67 | 2 | `45328` |
| [Ilesanmi, Oluwole](https://lda.data.parliament.uk/terms/453972) | Welsh | 0.67 | 2 | `453972` |
| [Oluwole Ilesanmi](https://lda.data.parliament.uk/terms/453974) | Welsh | 0.67 | 2 | `453974` |
| [Alphabet](https://lda.data.parliament.uk/terms/460913) | Latin | 0.67 | 1 | `460913` |
| [Eutrophication](https://lda.data.parliament.uk/terms/461004) | Latin | 0.67 | 1 | `461004` |
| [Crawshaw, Dick](https://lda.data.parliament.uk/terms/463063) | Welsh | 0.67 | 2 | `463063` |
| [Elizabeth Carnegy](https://lda.data.parliament.uk/terms/463145) | Welsh | 0.67 | 2 | `463145` |
| [Carnegy, Elizabeth](https://lda.data.parliament.uk/terms/463147) | Welsh | 0.67 | 2 | `463147` |
| [Dick Crawshaw](https://lda.data.parliament.uk/terms/463729) | Welsh | 0.67 | 2 | `463729` |
| [LFHC](https://lda.data.parliament.uk/terms/478867) | Irish | 0.67 | 1 | `478867` |
| [PrivatBank](https://lda.data.parliament.uk/terms/482503) | German | 0.67 | 1 | `482503` |
| [GDLS](https://lda.data.parliament.uk/terms/487570) | German | 0.67 | 1 | `487570` |
| [Llamas](https://lda.data.parliament.uk/terms/488089) | Spanish | 0.67 | 1 | `488089` |
| [Bruntwood](https://lda.data.parliament.uk/terms/488754) | Latin | 0.67 | 1 | `488754` |
| [CSEA](https://lda.data.parliament.uk/terms/490442) | Irish | 0.67 | 1 | `490442` |
| [EqualiTeach](https://lda.data.parliament.uk/terms/490864) | Irish | 0.67 | 1 | `490864` |
| [GatenbySanderson](https://lda.data.parliament.uk/terms/490868) | Welsh | 0.67 | 1 | `490868` |
| [Abattoirs](https://lda.data.parliament.uk/terms/49149) | French | 0.67 | 1 | `49149` |
| [TestnGo](https://lda.data.parliament.uk/terms/492023) | Welsh | 0.67 | 1 | `492023` |
| [Dorothy Thornhill](https://lda.data.parliament.uk/terms/497448) | Welsh | 0.67 | 2 | `497448` |
| [Infants](https://lda.data.parliament.uk/terms/50195) | French | 0.67 | 1 | `50195` |
| [Paul Edward Pellew](https://lda.data.parliament.uk/terms/502593) | Welsh | 0.67 | 3 | `502593` |
| [Pellew, Paul Edward](https://lda.data.parliament.uk/terms/502595) | Welsh | 0.67 | 3 | `502595` |
| [Lyttelton, John William Leonard](https://lda.data.parliament.uk/terms/504903) | Welsh | 0.67 | 4 | `504903` |
| [John William Leonard Lyttelton](https://lda.data.parliament.uk/terms/504905) | Welsh | 0.67 | 4 | `504905` |
| [Rithambara, Sadhvi](https://lda.data.parliament.uk/terms/507385) | Irish | 0.67 | 2 | `507385` |
| [Rhabdomyolysis](https://lda.data.parliament.uk/terms/512966) | Latin | 0.67 | 1 | `512966` |
| [Umuhoza, Victoire Ingabire](https://lda.data.parliament.uk/terms/515391) | French | 0.67 | 3 | `515391` |
| [Nuctech](https://lda.data.parliament.uk/terms/516043) | French | 0.67 | 1 | `516043` |
| [Mincione, Raffaele](https://lda.data.parliament.uk/terms/524357) | Italian | 0.67 | 2 | `524357` |
| [Raffaele Mincione](https://lda.data.parliament.uk/terms/524359) | Italian | 0.67 | 2 | `524359` |
| [Litfulo](https://lda.data.parliament.uk/terms/545680) | Welsh | 0.67 | 1 | `545680` |
| [Brecon, Radnor and Cwm Tawe](https://lda.data.parliament.uk/terms/545751) | Welsh | 0.67 | 5 | `545751` |
| [Rhondda and Ogmore](https://lda.data.parliament.uk/terms/545755) | Welsh | 0.67 | 3 | `545755` |
| [Peafowl](https://lda.data.parliament.uk/terms/549868) | Welsh | 0.67 | 1 | `549868` |
| [Travieso Darias, Dolores](https://lda.data.parliament.uk/terms/557265) | Spanish | 0.67 | 3 | `557265` |
| [Dolores Travieso Darias](https://lda.data.parliament.uk/terms/557267) | Spanish | 0.67 | 3 | `557267` |
| [Berry Bros Rudd](https://lda.data.parliament.uk/terms/562507) | Welsh | 0.67 | 3 | `562507` |
| [Berry Bros & Rudd](https://lda.data.parliament.uk/terms/562509) | Welsh | 0.67 | 4 | `562509` |
| [Giustozzi, Antonio](https://lda.data.parliament.uk/terms/565839) | Italian | 0.67 | 2 | `565839` |
| [Antonio Giustozzi](https://lda.data.parliament.uk/terms/565841) | Italian | 0.67 | 2 | `565841` |
| [Neptune Consortium](https://lda.data.parliament.uk/terms/58082) | Latin | 0.67 | 2 | `58082` |
| [Premier Transmission](https://lda.data.parliament.uk/terms/61829) | French | 0.67 | 2 | `61829` |
| [Somme Association](https://lda.data.parliament.uk/terms/68126) | French | 0.67 | 2 | `68126` |
| [Snowie](https://lda.data.parliament.uk/terms/70448) | German | 0.67 | 1 | `70448` |
| [CCUE](https://lda.data.parliament.uk/terms/74058) | French | 0.67 | 1 | `74058` |
| [CIPU](https://lda.data.parliament.uk/terms/74429) | Latin | 0.67 | 1 | `74429` |
| [COFEPOW](https://lda.data.parliament.uk/terms/74558) | Latin | 0.67 | 1 | `74558` |
| [CRY](https://lda.data.parliament.uk/terms/75017) | Welsh | 0.67 | 1 | `75017` |
| [DECC](https://lda.data.parliament.uk/terms/75223) | Latin | 0.67 | 1 | `75223` |
| [DVLA](https://lda.data.parliament.uk/terms/77005) | Dutch | 0.67 | 1 | `77005` |
| [IHFFC](https://lda.data.parliament.uk/terms/77592) | German | 0.67 | 1 | `77592` |
| [Irish Seanad](https://lda.data.parliament.uk/terms/78047) | Irish | 0.67 | 2 | `78047` |
| [NWWF](https://lda.data.parliament.uk/terms/78788) | Irish | 0.67 | 1 | `78788` |
| [Metropolitan Constabulary](https://lda.data.parliament.uk/terms/79214) | Latin | 0.67 | 2 | `79214` |
| [Terex](https://lda.data.parliament.uk/terms/83243) | Latin | 0.67 | 1 | `83243` |
| [Transnucleaire](https://lda.data.parliament.uk/terms/84010) | Dutch | 0.67 | 1 | `84010` |
| [Vantagepoint Management Consultants](https://lda.data.parliament.uk/terms/85532) | French | 0.67 | 3 | `85532` |
| [Philosophy](https://lda.data.parliament.uk/terms/92442) | Latin | 0.67 | 1 | `92442` |
| [Restraint techniques](https://lda.data.parliament.uk/terms/92841) | French | 0.67 | 2 | `92841` |
| [Deer](https://lda.data.parliament.uk/terms/9592) | Dutch | 0.67 | 1 | `9592` |
| [National Organisation of Cypriot Combatants](https://lda.data.parliament.uk/terms/96454) | French | 0.67 | 5 | `96454` |
| [NCFSC](https://lda.data.parliament.uk/terms/96606) | French | 0.67 | 1 | `96606` |
| [NFFC](https://lda.data.parliament.uk/terms/96737) | Welsh | 0.67 | 1 | `96737` |
| [TraCC](https://lda.data.parliament.uk/terms/99822) | Italian | 0.67 | 1 | `99822` |
| [Killyleagh](https://lda.data.parliament.uk/terms/11182) | Irish | 0.66 | 1 | `11182` |
| [Skopje](https://lda.data.parliament.uk/terms/12836) | Dutch | 0.66 | 1 | `12836` |
| [Warsaw](https://lda.data.parliament.uk/terms/13678) | Welsh | 0.66 | 1 | `13678` |
| [Anglia Polytechnic](https://lda.data.parliament.uk/terms/1434) | Latin | 0.66 | 2 | `1434` |
| [Elsevier](https://lda.data.parliament.uk/terms/17456) | Dutch | 0.66 | 1 | `17456` |
| [EU Situation Centre](https://lda.data.parliament.uk/terms/18259) | French | 0.66 | 3 | `18259` |
| [CTC](https://lda.data.parliament.uk/terms/28133) | Latin | 0.66 | 1 | `28133` |
| [Wedgwood Museum](https://lda.data.parliament.uk/terms/290378) | Latin | 0.66 | 2 | `290378` |
| [Redlich, Josef](https://lda.data.parliament.uk/terms/291224) | German | 0.66 | 2 | `291224` |
| [Josef Redlich](https://lda.data.parliament.uk/terms/291649) | German | 0.66 | 2 | `291649` |
| [Caerwys Historical Society](https://lda.data.parliament.uk/terms/298537) | Welsh | 0.66 | 3 | `298537` |
| [Danesin, Alessandro](https://lda.data.parliament.uk/terms/300014) | Italian | 0.66 | 2 | `300014` |
| [Davies, Jocelyn](https://lda.data.parliament.uk/terms/300059) | Welsh | 0.66 | 2 | `300059` |
| [Ephremidis, Vassilis](https://lda.data.parliament.uk/terms/300367) | Latin | 0.66 | 2 | `300367` |
| [Fuchs, K](https://lda.data.parliament.uk/terms/300631) | German | 0.66 | 2 | `300631` |
| [Garaikoetxea Urriza, Juan Carlos](https://lda.data.parliament.uk/terms/300665) | Spanish | 0.66 | 4 | `300665` |
| [Hansch, Klaus](https://lda.data.parliament.uk/terms/301046) | German | 0.66 | 2 | `301046` |
| [Jaatteenmaki, Anneli](https://lda.data.parliament.uk/terms/301418) | Dutch | 0.66 | 2 | `301418` |
| [Jones, Jenny](https://lda.data.parliament.uk/terms/301517) | Welsh | 0.66 | 2 | `301517` |
| [Ligios, Giosue](https://lda.data.parliament.uk/terms/301906) | Latin | 0.66 | 2 | `301906` |
| [Maij-Weggen, Johanna](https://lda.data.parliament.uk/terms/302077) | Dutch | 0.66 | 2 | `302077` |
| [Mavrommatis, Manolis](https://lda.data.parliament.uk/terms/302203) | Latin | 0.66 | 2 | `302203` |
| [Taylor of Gryfe, Lord](https://lda.data.parliament.uk/terms/303923) | Welsh | 0.66 | 4 | `303923` |
| [Wuori, Matti](https://lda.data.parliament.uk/terms/304500) | Italian | 0.66 | 2 | `304500` |
| [Zdanoka, Tatjana](https://lda.data.parliament.uk/terms/304537) | Latin | 0.66 | 2 | `304537` |
| [Danesin,Alessandro](https://lda.data.parliament.uk/terms/310362) | Italian | 0.66 | 1 | `310362` |
| [Jocelyn Davies](https://lda.data.parliament.uk/terms/310568) | Welsh | 0.66 | 2 | `310568` |
| [Ephremidis,Vassilis](https://lda.data.parliament.uk/terms/311822) | Latin | 0.66 | 1 | `311822` |
| [Fuchs,K](https://lda.data.parliament.uk/terms/312946) | German | 0.66 | 1 | `312946` |
| [Garaikoetxea Urriza,Juan Carlos](https://lda.data.parliament.uk/terms/313056) | Spanish | 0.66 | 3 | `313056` |
| [Hansch,Klaus](https://lda.data.parliament.uk/terms/314494) | German | 0.66 | 1 | `314494` |
| [Ligios,Giosue](https://lda.data.parliament.uk/terms/318568) | Latin | 0.66 | 1 | `318568` |
| [Maij-Weggen,Johanna](https://lda.data.parliament.uk/terms/319364) | Dutch | 0.66 | 1 | `319364` |
| [Batasuna](https://lda.data.parliament.uk/terms/3360) | Spanish | 0.66 | 1 | `3360` |
| [Forum](https://lda.data.parliament.uk/terms/34808) | Latin | 0.66 | 1 | `34808` |
| [Medecins du monde](https://lda.data.parliament.uk/terms/351849) | French | 0.66 | 3 | `351849` |
| [Grwp Gwalia](https://lda.data.parliament.uk/terms/35218) | Welsh | 0.66 | 2 | `35218` |
| [Berlitz](https://lda.data.parliament.uk/terms/3649) | German | 0.66 | 1 | `3649` |
| [Aidspan](https://lda.data.parliament.uk/terms/368133) | Dutch | 0.66 | 1 | `368133` |
| [International Organisations Act 1968](https://lda.data.parliament.uk/terms/383166) | French | 0.66 | 4 | `383166` |
| [International Organisations Act 2005](https://lda.data.parliament.uk/terms/383167) | French | 0.66 | 4 | `383167` |
| [Bergoglio, Jorge Mario](https://lda.data.parliament.uk/terms/396418) | Italian | 0.66 | 3 | `396418` |
| [OPQs](https://lda.data.parliament.uk/terms/403387) | Latin | 0.66 | 1 | `403387` |
| [Gangsline](https://lda.data.parliament.uk/terms/405956) | German | 0.66 | 1 | `405956` |
| [Nyerere, Julius](https://lda.data.parliament.uk/terms/407006) | Latin | 0.66 | 2 | `407006` |
| [Lord Taylor of Gryfe](https://lda.data.parliament.uk/terms/407755) | Welsh | 0.66 | 4 | `407755` |
| [Jenny Jones](https://lda.data.parliament.uk/terms/409316) | Welsh | 0.66 | 2 | `409316` |
| [Lactalis McLelland](https://lda.data.parliament.uk/terms/42241) | Latin | 0.66 | 2 | `42241` |
| [Methicillin susceptible staphylococcus aureus](https://lda.data.parliament.uk/terms/428911) | Latin | 0.66 | 4 | `428911` |
| [Congenital diaphragmatic hernia](https://lda.data.parliament.uk/terms/429751) | Latin | 0.66 | 3 | `429751` |
| [DDD](https://lda.data.parliament.uk/terms/431752) | Welsh | 0.66 | 1 | `431752` |
| [Coty](https://lda.data.parliament.uk/terms/435897) | Welsh | 0.66 | 1 | `435897` |
| [ELTSA](https://lda.data.parliament.uk/terms/439308) | German | 0.66 | 1 | `439308` |
| [Dimbleby, David](https://lda.data.parliament.uk/terms/448241) | Welsh | 0.66 | 2 | `448241` |
| [David Dimbleby](https://lda.data.parliament.uk/terms/448266) | Welsh | 0.66 | 2 | `448266` |
| [Marine Services Organisation](https://lda.data.parliament.uk/terms/44954) | French | 0.66 | 3 | `44954` |
| [Ocrevus](https://lda.data.parliament.uk/terms/450690) | Latin | 0.66 | 1 | `450690` |
| [Fathy, Amal](https://lda.data.parliament.uk/terms/451117) | Welsh | 0.66 | 2 | `451117` |
| [Amal Fathy](https://lda.data.parliament.uk/terms/451119) | Welsh | 0.66 | 2 | `451119` |
| [Mediaeval Academy of America](https://lda.data.parliament.uk/terms/45210) | Latin | 0.66 | 4 | `45210` |
| [Salini, Massimiliano](https://lda.data.parliament.uk/terms/453552) | Italian | 0.66 | 2 | `453552` |
| [Reindeer](https://lda.data.parliament.uk/terms/454978) | Dutch | 0.66 | 1 | `454978` |
| [Jazz](https://lda.data.parliament.uk/terms/455062) | Italian | 0.66 | 1 | `455062` |
| [Versus Arthritis](https://lda.data.parliament.uk/terms/457078) | Latin | 0.66 | 2 | `457078` |
| [Aramark](https://lda.data.parliament.uk/terms/457250) | Dutch | 0.66 | 1 | `457250` |
| [Davies, Mervyn](https://lda.data.parliament.uk/terms/461228) | Welsh | 0.66 | 2 | `461228` |
| [Mervyn Davies](https://lda.data.parliament.uk/terms/461230) | Welsh | 0.66 | 2 | `461230` |
| [Nab-paclitaxel](https://lda.data.parliament.uk/terms/466957) | Latin | 0.66 | 1 | `466957` |
| [Remdesivir](https://lda.data.parliament.uk/terms/469515) | Latin | 0.66 | 1 | `469515` |
| [ECCB](https://lda.data.parliament.uk/terms/469688) | Latin | 0.66 | 1 | `469688` |
| [Camcolit](https://lda.data.parliament.uk/terms/475031) | Latin | 0.66 | 1 | `475031` |
| [Manny Shinwell](https://lda.data.parliament.uk/terms/475250) | Welsh | 0.66 | 2 | `475250` |
| [GEAC](https://lda.data.parliament.uk/terms/478689) | Irish | 0.66 | 1 | `478689` |
| [Rosyth](https://lda.data.parliament.uk/terms/481322) | Welsh | 0.66 | 1 | `481322` |
| [Unique](https://lda.data.parliament.uk/terms/486002) | French | 0.66 | 1 | `486002` |
| [Bribery](https://lda.data.parliament.uk/terms/49322) | Welsh | 0.66 | 1 | `49322` |
| [Emetophobia](https://lda.data.parliament.uk/terms/494841) | Latin | 0.66 | 1 | `494841` |
| [CRPR](https://lda.data.parliament.uk/terms/496650) | Latin | 0.66 | 1 | `496650` |
| [Camara de Diputados](https://lda.data.parliament.uk/terms/497063) | Spanish | 0.66 | 3 | `497063` |
| [EU institutions](https://lda.data.parliament.uk/terms/49832) | French | 0.66 | 2 | `49832` |
| [Mansour, Mohammad Ghassan Ahmad](https://lda.data.parliament.uk/terms/500754) | French | 0.66 | 4 | `500754` |
| [Mohammad Ghassan Ahmad Mansour](https://lda.data.parliament.uk/terms/500756) | French | 0.66 | 4 | `500756` |
| [Homoeopathy](https://lda.data.parliament.uk/terms/50137) | Latin | 0.66 | 1 | `50137` |
| [CogCo](https://lda.data.parliament.uk/terms/508450) | Latin | 0.66 | 1 | `508450` |
| [OnlyMums and OnlyDads](https://lda.data.parliament.uk/terms/509354) | Welsh | 0.66 | 3 | `509354` |
| [Agrii](https://lda.data.parliament.uk/terms/512140) | Welsh | 0.66 | 1 | `512140` |
| [Saracens](https://lda.data.parliament.uk/terms/513673) | Latin | 0.66 | 1 | `513673` |
| [Julius Nyerere](https://lda.data.parliament.uk/terms/513827) | Latin | 0.66 | 2 | `513827` |
| [Munby, Sarah](https://lda.data.parliament.uk/terms/515062) | Welsh | 0.66 | 2 | `515062` |
| [Sarah Munby](https://lda.data.parliament.uk/terms/515064) | Welsh | 0.66 | 2 | `515064` |
| [NHMC](https://lda.data.parliament.uk/terms/515824) | Welsh | 0.66 | 1 | `515824` |
| [Lewy Body Society](https://lda.data.parliament.uk/terms/525858) | Welsh | 0.66 | 3 | `525858` |
| [Omeprazole](https://lda.data.parliament.uk/terms/527439) | Latin | 0.66 | 1 | `527439` |
| [Yachting](https://lda.data.parliament.uk/terms/53598) | Dutch | 0.66 | 1 | `53598` |
| [Austrian Bundesrat](https://lda.data.parliament.uk/terms/53900) | German | 0.66 | 2 | `53900` |
| [ALGAO](https://lda.data.parliament.uk/terms/54514) | Irish | 0.66 | 1 | `54514` |
| [Stiebahl, Sonja](https://lda.data.parliament.uk/terms/545228) | Latin | 0.66 | 2 | `545228` |
| [Ceredigion Preseli](https://lda.data.parliament.uk/terms/545778) | Welsh | 0.66 | 2 | `545778` |
| [HMYOI Hindley](https://lda.data.parliament.uk/terms/555043) | Welsh | 0.66 | 2 | `555043` |
| [HMYOI Peterborough](https://lda.data.parliament.uk/terms/555204) | Welsh | 0.66 | 2 | `555204` |
| [Telespazio UK](https://lda.data.parliament.uk/terms/557343) | Italian | 0.66 | 2 | `557343` |
| [Blinktime](https://lda.data.parliament.uk/terms/562517) | German | 0.66 | 1 | `562517` |
| [Waid Academy](https://lda.data.parliament.uk/terms/564120) | Welsh | 0.66 | 2 | `564120` |
| [Rosyth 2000](https://lda.data.parliament.uk/terms/66843) | Welsh | 0.66 | 2 | `66843` |
| [Sidex](https://lda.data.parliament.uk/terms/70166) | Latin | 0.66 | 1 | `70166` |
| [FEEM](https://lda.data.parliament.uk/terms/75795) | Dutch | 0.66 | 1 | `75795` |
| [EEF](https://lda.data.parliament.uk/terms/77231) | Dutch | 0.66 | 1 | `77231` |
| [Hungarian Orszaggyules](https://lda.data.parliament.uk/terms/77420) | Latin | 0.66 | 2 | `77420` |
| [IALANW](https://lda.data.parliament.uk/terms/77448) | Welsh | 0.66 | 1 | `77448` |
| [IIASA](https://lda.data.parliament.uk/terms/77603) | Irish | 0.66 | 1 | `77603` |
| [Bavaria](https://lda.data.parliament.uk/terms/8579) | Latin | 0.66 | 1 | `8579` |
| [Bexleyheath and Crayford](https://lda.data.parliament.uk/terms/8654) | Welsh | 0.66 | 3 | `8654` |
| [WXNET](https://lda.data.parliament.uk/terms/86661) | Welsh | 0.66 | 1 | `86661` |
| [Clostridium](https://lda.data.parliament.uk/terms/9216) | Latin | 0.66 | 1 | `9216` |
| [Nuisance](https://lda.data.parliament.uk/terms/92204) | French | 0.66 | 1 | `92204` |
| [EU institutions](https://lda.data.parliament.uk/terms/95590) | French | 0.66 | 2 | `95590` |
| [NFHA](https://lda.data.parliament.uk/terms/96741) | Irish | 0.66 | 1 | `96741` |
| [OnaE](https://lda.data.parliament.uk/terms/97358) | Latin | 0.66 | 1 | `97358` |
| [Synod](https://lda.data.parliament.uk/terms/99587) | Welsh | 0.66 | 1 | `99587` |
| [EURES](https://lda.data.parliament.uk/terms/10010) | French | 0.65 | 1 | `10010` |
| [Alitalia](https://lda.data.parliament.uk/terms/1023) | Italian | 0.65 | 1 | `1023` |
| [Klondiking](https://lda.data.parliament.uk/terms/11198) | Dutch | 0.65 | 1 | `11198` |
| [Samanalawewa dam](https://lda.data.parliament.uk/terms/12633) | Welsh | 0.65 | 2 | `12633` |
| [Centre for Procurement Performance](https://lda.data.parliament.uk/terms/19743) | French | 0.65 | 4 | `19743` |
| [Innogy](https://lda.data.parliament.uk/terms/26902) | Welsh | 0.65 | 1 | `26902` |
| [Qvortrup, Matt](https://lda.data.parliament.uk/terms/291219) | German | 0.65 | 2 | `291219` |
| [Ratzinger, Joseph Aloisius](https://lda.data.parliament.uk/terms/291446) | Latin | 0.65 | 3 | `291446` |
| [Matt Qvortrup](https://lda.data.parliament.uk/terms/291562) | German | 0.65 | 2 | `291562` |
| [Disablement Commission](https://lda.data.parliament.uk/terms/29236) | French | 0.65 | 2 | `29236` |
| [HMYOI Feltham](https://lda.data.parliament.uk/terms/296936) | Welsh | 0.65 | 2 | `296936` |
| [Athanasiu, Alexandru](https://lda.data.parliament.uk/terms/298938) | Latin | 0.65 | 2 | `298938` |
| [Barber of Tewkesbury, Lord](https://lda.data.parliament.uk/terms/299020) | Welsh | 0.65 | 4 | `299020` |
| [Benn, Tony](https://lda.data.parliament.uk/terms/299113) | Welsh | 0.65 | 2 | `299113` |
| [Cawdor, Earl](https://lda.data.parliament.uk/terms/299643) | Welsh | 0.65 | 2 | `299643` |
| [Fassa, Raimondo](https://lda.data.parliament.uk/terms/300453) | Italian | 0.65 | 2 | `300453` |
| [Fouque, Antoinette](https://lda.data.parliament.uk/terms/300580) | French | 0.65 | 2 | `300580` |
| [Garosci, Riccardo](https://lda.data.parliament.uk/terms/300687) | Italian | 0.65 | 2 | `300687` |
| [Gottardi, Donata](https://lda.data.parliament.uk/terms/300856) | Italian | 0.65 | 2 | `300856` |
| [Griffiths of Fforestfach, Lord](https://lda.data.parliament.uk/terms/300927) | Welsh | 0.65 | 4 | `300927` |
| [Krouwel-Vlam, J](https://lda.data.parliament.uk/terms/301712) | Dutch | 0.65 | 2 | `301712` |
| [Maes, Nelly](https://lda.data.parliament.uk/terms/302066) | Welsh | 0.65 | 2 | `302066` |
| [Mezzaroma, Roberto](https://lda.data.parliament.uk/terms/302384) | Italian | 0.65 | 2 | `302384` |
| [Rosati, Dariusz](https://lda.data.parliament.uk/terms/303311) | Latin | 0.65 | 2 | `303311` |
| [Sanders-Ten-Holte, Marieke](https://lda.data.parliament.uk/terms/303423) | Dutch | 0.65 | 2 | `303423` |
| [Vecchi, Luciano](https://lda.data.parliament.uk/terms/304185) | Italian | 0.65 | 2 | `304185` |
| [Fassa,Raimondo](https://lda.data.parliament.uk/terms/312138) | Italian | 0.65 | 1 | `312138` |
| [Fouque,Antoinette](https://lda.data.parliament.uk/terms/312722) | French | 0.65 | 1 | `312722` |
| [Garosci,Riccardo](https://lda.data.parliament.uk/terms/313154) | Italian | 0.65 | 1 | `313154` |
| [Krouwel-Vlam,J](https://lda.data.parliament.uk/terms/317784) | Dutch | 0.65 | 1 | `317784` |
| [Maes,Nelly](https://lda.data.parliament.uk/terms/319318) | Welsh | 0.65 | 1 | `319318` |
| [Mezzaroma,Roberto](https://lda.data.parliament.uk/terms/320840) | Italian | 0.65 | 1 | `320840` |
| [Morgan, Mair Eluned](https://lda.data.parliament.uk/terms/347691) | Welsh | 0.65 | 3 | `347691` |
| [Fleckenstein, Knut](https://lda.data.parliament.uk/terms/349749) | German | 0.65 | 2 | `349749` |
| [Les Routiers](https://lda.data.parliament.uk/terms/351777) | French | 0.65 | 2 | `351777` |
| [Manoeuvres Act 1958](https://lda.data.parliament.uk/terms/384169) | French | 0.65 | 3 | `384169` |
| [Lord Barber of Tewkesbury](https://lda.data.parliament.uk/terms/398716) | Welsh | 0.65 | 4 | `398716` |
| [Lord Griffiths of Fforestfach](https://lda.data.parliament.uk/terms/399580) | Welsh | 0.65 | 4 | `399580` |
| [Mair Eluned Morgan](https://lda.data.parliament.uk/terms/400276) | Welsh | 0.65 | 3 | `400276` |
| [Tony Benn](https://lda.data.parliament.uk/terms/401420) | Welsh | 0.65 | 2 | `401420` |
| [ALCAB](https://lda.data.parliament.uk/terms/410587) | Spanish | 0.65 | 1 | `410587` |
| [Earl Cawdor](https://lda.data.parliament.uk/terms/414123) | Welsh | 0.65 | 2 | `414123` |
| [Erythromycin](https://lda.data.parliament.uk/terms/420911) | Latin | 0.65 | 1 | `420911` |
| [DFRMO](https://lda.data.parliament.uk/terms/421099) | Latin | 0.65 | 1 | `421099` |
| [National Maritime Information Centre](https://lda.data.parliament.uk/terms/423211) | French | 0.65 | 4 | `423211` |
| [Entrepreneurs' relief](https://lda.data.parliament.uk/terms/428782) | French | 0.65 | 2 | `428782` |
| [Entrepreneurs relief](https://lda.data.parliament.uk/terms/428784) | French | 0.65 | 2 | `428784` |
| [Jones Parry, Emyr](https://lda.data.parliament.uk/terms/429000) | Welsh | 0.65 | 3 | `429000` |
| [Emyr Jones Parry](https://lda.data.parliament.uk/terms/429002) | Welsh | 0.65 | 3 | `429002` |
| [LINX](https://lda.data.parliament.uk/terms/43036) | Latin | 0.65 | 1 | `43036` |
| [ICGN](https://lda.data.parliament.uk/terms/432263) | Latin | 0.65 | 1 | `432263` |
| [GPFF](https://lda.data.parliament.uk/terms/432635) | German | 0.65 | 1 | `432635` |
| [Appendicitis](https://lda.data.parliament.uk/terms/434528) | Latin | 0.65 | 1 | `434528` |
| [Mughrabi, Dalal](https://lda.data.parliament.uk/terms/435641) | Welsh | 0.65 | 2 | `435641` |
| [Dalal Mughrabi](https://lda.data.parliament.uk/terms/435643) | Welsh | 0.65 | 2 | `435643` |
| [Mediaedge:CIA](https://lda.data.parliament.uk/terms/438487) | Welsh | 0.65 | 1 | `438487` |
| [Mowll and Mowll](https://lda.data.parliament.uk/terms/44326) | Welsh | 0.65 | 3 | `44326` |
| [Gadolinium](https://lda.data.parliament.uk/terms/443891) | Latin | 0.65 | 1 | `443891` |
| [Fella, Stefano](https://lda.data.parliament.uk/terms/445773) | Italian | 0.65 | 2 | `445773` |
| [Stefano Fella](https://lda.data.parliament.uk/terms/445775) | Italian | 0.65 | 2 | `445775` |
| [Ibrutinib](https://lda.data.parliament.uk/terms/446352) | Latin | 0.65 | 1 | `446352` |
| [National Association of Bison Tenants](https://lda.data.parliament.uk/terms/44644) | French | 0.65 | 5 | `44644` |
| [CS Todd](https://lda.data.parliament.uk/terms/447020) | Welsh | 0.65 | 2 | `447020` |
| [National Bibliographic Service](https://lda.data.parliament.uk/terms/44775) | Latin | 0.65 | 3 | `44775` |
| [Dextropropoxyphene](https://lda.data.parliament.uk/terms/450557) | Welsh | 0.65 | 1 | `450557` |
| [Civil Enforcement Association](https://lda.data.parliament.uk/terms/452519) | French | 0.65 | 3 | `452519` |
| [Meggitt](https://lda.data.parliament.uk/terms/45325) | Italian | 0.65 | 1 | `45325` |
| [Diallo, Cellou Dalein](https://lda.data.parliament.uk/terms/453441) | French | 0.65 | 3 | `453441` |
| [Cellou Dalein Diallo](https://lda.data.parliament.uk/terms/453443) | French | 0.65 | 3 | `453443` |
| [Merseyrail](https://lda.data.parliament.uk/terms/45471) | Welsh | 0.65 | 1 | `45471` |
| [Lisdexamfetamine](https://lda.data.parliament.uk/terms/460550) | Latin | 0.65 | 1 | `460550` |
| [Dimbleby Review](https://lda.data.parliament.uk/terms/463503) | Welsh | 0.65 | 2 | `463503` |
| [Griffiths, William Hugh](https://lda.data.parliament.uk/terms/464092) | Welsh | 0.65 | 3 | `464092` |
| [William Hugh Griffiths](https://lda.data.parliament.uk/terms/464094) | Welsh | 0.65 | 3 | `464094` |
| [Paysa](https://lda.data.parliament.uk/terms/466330) | French | 0.65 | 1 | `466330` |
| [David Rowe-Beddoe](https://lda.data.parliament.uk/terms/467625) | Welsh | 0.65 | 2 | `467625` |
| [Nawajaa, Mahmoud](https://lda.data.parliament.uk/terms/471557) | Dutch | 0.65 | 2 | `471557` |
| [Mahmoud Nawajaa](https://lda.data.parliament.uk/terms/471559) | Dutch | 0.65 | 2 | `471559` |
| [Psilocybin](https://lda.data.parliament.uk/terms/472385) | Welsh | 0.65 | 1 | `472385` |
| [Phytophthora austrocedri](https://lda.data.parliament.uk/terms/473984) | Latin | 0.65 | 2 | `473984` |
| [Osimertinib](https://lda.data.parliament.uk/terms/482253) | Latin | 0.65 | 1 | `482253` |
| [Delirium](https://lda.data.parliament.uk/terms/482985) | Latin | 0.65 | 1 | `482985` |
| [APCUK](https://lda.data.parliament.uk/terms/488158) | Dutch | 0.65 | 1 | `488158` |
| [Rheinzink](https://lda.data.parliament.uk/terms/489619) | German | 0.65 | 1 | `489619` |
| [Lagevrio](https://lda.data.parliament.uk/terms/490186) | French | 0.65 | 1 | `490186` |
| [Faizulla Jalal](https://lda.data.parliament.uk/terms/493270) | Welsh | 0.65 | 2 | `493270` |
| [Jalal, Faizulla](https://lda.data.parliament.uk/terms/493274) | Welsh | 0.65 | 2 | `493274` |
| [Deltapoll](https://lda.data.parliament.uk/terms/493494) | Latin | 0.65 | 1 | `493494` |
| [Kiritimati](https://lda.data.parliament.uk/terms/493570) | Latin | 0.65 | 1 | `493570` |
| [BioYorkshire](https://lda.data.parliament.uk/terms/500786) | Welsh | 0.65 | 1 | `500786` |
| [ICGS](https://lda.data.parliament.uk/terms/501226) | Latin | 0.65 | 1 | `501226` |
| [Gohir, Shaista](https://lda.data.parliament.uk/terms/501633) | Welsh | 0.65 | 2 | `501633` |
| [Shaista Gohir](https://lda.data.parliament.uk/terms/501635) | Welsh | 0.65 | 2 | `501635` |
| [Lenses](https://lda.data.parliament.uk/terms/50314) | Latin | 0.65 | 1 | `50314` |
| [Holdsworth, Cathryn](https://lda.data.parliament.uk/terms/513115) | Welsh | 0.65 | 2 | `513115` |
| [Cathryn Holdsworth](https://lda.data.parliament.uk/terms/513117) | Welsh | 0.65 | 2 | `513117` |
| [Joseph Aloisius Ratzinger](https://lda.data.parliament.uk/terms/513699) | Latin | 0.65 | 3 | `513699` |
| [Senedd Cymru Finance Committee](https://lda.data.parliament.uk/terms/518045) | Welsh | 0.65 | 4 | `518045` |
| [Cote d'Ivoire](https://lda.data.parliament.uk/terms/52051) | French | 0.65 | 2 | `52051` |
| [EPV](https://lda.data.parliament.uk/terms/52258) | Dutch | 0.65 | 1 | `52258` |
| [FDGS](https://lda.data.parliament.uk/terms/52340) | French | 0.65 | 1 | `52340` |
| [ARHAI](https://lda.data.parliament.uk/terms/53702) | Welsh | 0.65 | 1 | `53702` |
| [BHA](https://lda.data.parliament.uk/terms/54230) | Irish | 0.65 | 1 | `54230` |
| [AFRC](https://lda.data.parliament.uk/terms/54377) | Latin | 0.65 | 1 | `54377` |
| [Synthetic cathinones](https://lda.data.parliament.uk/terms/550000) | Latin | 0.65 | 2 | `550000` |
| [Aupec](https://lda.data.parliament.uk/terms/553371) | Latin | 0.65 | 1 | `553371` |
| [Species dysphoria](https://lda.data.parliament.uk/terms/556736) | Latin | 0.65 | 2 | `556736` |
| [Coffee Afrik](https://lda.data.parliament.uk/terms/560363) | Dutch | 0.65 | 2 | `560363` |
| [Vorboss](https://lda.data.parliament.uk/terms/562515) | Italian | 0.65 | 1 | `562515` |
| [Trandolapril](https://lda.data.parliament.uk/terms/566921) | Italian | 0.65 | 1 | `566921` |
| [MyCardium AI](https://lda.data.parliament.uk/terms/572306) | Latin | 0.65 | 2 | `572306` |
| [Ketotifen](https://lda.data.parliament.uk/terms/579547) | Welsh | 0.65 | 1 | `579547` |
| [Portmeirion Group](https://lda.data.parliament.uk/terms/61665) | Welsh | 0.65 | 2 | `61665` |
| [Rhondda Cynon Taf County Borough Council](https://lda.data.parliament.uk/terms/66577) | Welsh | 0.65 | 6 | `66577` |
| [Afrika-Studiecentrum](https://lda.data.parliament.uk/terms/684) | Dutch | 0.65 | 1 | `684` |
| [CAPPA](https://lda.data.parliament.uk/terms/73932) | Italian | 0.65 | 1 | `73932` |
| [CCCEP](https://lda.data.parliament.uk/terms/74024) | Latin | 0.65 | 1 | `74024` |
| [CCSW](https://lda.data.parliament.uk/terms/74056) | Welsh | 0.65 | 1 | `74056` |
| [CIREA](https://lda.data.parliament.uk/terms/74430) | Irish | 0.65 | 1 | `74430` |
| [CORAA](https://lda.data.parliament.uk/terms/74823) | Dutch | 0.65 | 1 | `74823` |
| [CoRWM](https://lda.data.parliament.uk/terms/74856) | Welsh | 0.65 | 1 | `74856` |
| [Euskadi Ta Azkatasuna](https://lda.data.parliament.uk/terms/75661) | Spanish | 0.65 | 3 | `75661` |
| [FUW](https://lda.data.parliament.uk/terms/76034) | Welsh | 0.65 | 1 | `76034` |
| [EIU](https://lda.data.parliament.uk/terms/77292) | Latin | 0.65 | 1 | `77292` |
| [International Progress Organisation](https://lda.data.parliament.uk/terms/77922) | French | 0.65 | 3 | `77922` |
| [JNCCELA](https://lda.data.parliament.uk/terms/78216) | Latin | 0.65 | 1 | `78216` |
| [JNCCOLA](https://lda.data.parliament.uk/terms/78217) | Italian | 0.65 | 1 | `78217` |
| [Bureaux de change](https://lda.data.parliament.uk/terms/90398) | French | 0.65 | 3 | `90398` |
| [International organisations](https://lda.data.parliament.uk/terms/91715) | French | 0.65 | 2 | `91715` |
| [Poisons](https://lda.data.parliament.uk/terms/92475) | French | 0.65 | 1 | `92475` |
| [International organisations](https://lda.data.parliament.uk/terms/95649) | French | 0.65 | 2 | `95649` |
| [NCN](https://lda.data.parliament.uk/terms/96623) | Portuguese | 0.65 | 1 | `96623` |
| [OCJR](https://lda.data.parliament.uk/terms/97226) | Portuguese | 0.65 | 1 | `97226` |
| [Oftel](https://lda.data.parliament.uk/terms/97318) | Dutch | 0.65 | 1 | `97318` |
| [OLAF](https://lda.data.parliament.uk/terms/97339) | Welsh | 0.65 | 1 | `97339` |
| [Thain, Ian](https://lda.data.parliament.uk/terms/100544) | Irish | 0.64 | 2 | `100544` |
| [Foil](https://lda.data.parliament.uk/terms/10312) | Irish | 0.64 | 1 | `10312` |
| [Homophobia](https://lda.data.parliament.uk/terms/10747) | Latin | 0.64 | 1 | `10747` |
| [Phosphorus](https://lda.data.parliament.uk/terms/12134) | Latin | 0.64 | 1 | `12134` |
| [Egg](https://lda.data.parliament.uk/terms/17304) | Italian | 0.64 | 1 | `17304` |
| [Eigernet](https://lda.data.parliament.uk/terms/17323) | German | 0.64 | 1 | `17323` |
| [Euroed Wales](https://lda.data.parliament.uk/terms/18307) | Welsh | 0.64 | 2 | `18307` |
| [Buiter, Willem](https://lda.data.parliament.uk/terms/26876) | Dutch | 0.64 | 2 | `26876` |
| [Astrium](https://lda.data.parliament.uk/terms/2691) | Latin | 0.64 | 1 | `2691` |
| [DTZ](https://lda.data.parliament.uk/terms/29542) | German | 0.64 | 1 | `29542` |
| [Gummer, John Selwyn](https://lda.data.parliament.uk/terms/296403) | Welsh | 0.64 | 3 | `296403` |
| [Andenna, Ettore](https://lda.data.parliament.uk/terms/298861) | Italian | 0.64 | 2 | `298861` |
| [Boothby, Lord](https://lda.data.parliament.uk/terms/299256) | Welsh | 0.64 | 2 | `299256` |
| [Crawshaw of Aintree, Lord](https://lda.data.parliament.uk/terms/299933) | Welsh | 0.64 | 4 | `299933` |
| [Dunwoody, Gwyneth](https://lda.data.parliament.uk/terms/300285) | Welsh | 0.64 | 2 | `300285` |
| [Gordon of Strathblane, Lord](https://lda.data.parliament.uk/terms/300843) | Welsh | 0.64 | 4 | `300843` |
| [Hennicot-Schoepges, Erna](https://lda.data.parliament.uk/terms/301169) | Latin | 0.64 | 2 | `301169` |
| [Jones, Gwilym](https://lda.data.parliament.uk/terms/301513) | Welsh | 0.64 | 2 | `301513` |
| [Lokkegaard, Morten](https://lda.data.parliament.uk/terms/301959) | Dutch | 0.64 | 2 | `301959` |
| [Sonneveld, Jan](https://lda.data.parliament.uk/terms/303684) | Dutch | 0.64 | 2 | `303684` |
| [Stolojan, Theodor Dumitru](https://lda.data.parliament.uk/terms/303816) | Latin | 0.64 | 3 | `303816` |
| [Andenna,Ettore](https://lda.data.parliament.uk/terms/305334) | Italian | 0.64 | 1 | `305334` |
| [Blokland, Hans](https://lda.data.parliament.uk/terms/306814) | Dutch | 0.64 | 2 | `306814` |
| [Blokland,Hans](https://lda.data.parliament.uk/terms/306815) | Dutch | 0.64 | 1 | `306815` |
| [Finmeccanica](https://lda.data.parliament.uk/terms/34336) | Italian | 0.64 | 1 | `34336` |
| [Tonnage tax](https://lda.data.parliament.uk/terms/346867) | French | 0.64 | 2 | `346867` |
| [Helveta](https://lda.data.parliament.uk/terms/35979) | Latin | 0.64 | 1 | `35979` |
| [Geest](https://lda.data.parliament.uk/terms/36255) | Dutch | 0.64 | 1 | `36255` |
| [bbalibor](https://lda.data.parliament.uk/terms/362713) | Latin | 0.64 | 1 | `362713` |
| [TBEAG](https://lda.data.parliament.uk/terms/363474) | Irish | 0.64 | 1 | `363474` |
| [Geomorphological Services](https://lda.data.parliament.uk/terms/36391) | Latin | 0.64 | 2 | `36391` |
| [Antarctic Act 1994](https://lda.data.parliament.uk/terms/371039) | Latin | 0.64 | 3 | `371039` |
| [Gwynedd Archaeological Trust](https://lda.data.parliament.uk/terms/37291) | Welsh | 0.64 | 3 | `37291` |
| [International Maritime Bureau](https://lda.data.parliament.uk/terms/37657) | French | 0.64 | 3 | `37657` |
| [International Procurement Services](https://lda.data.parliament.uk/terms/37724) | French | 0.64 | 3 | `37724` |
| [Antarctic Act 2013](https://lda.data.parliament.uk/terms/382588) | Latin | 0.64 | 3 | `382588` |
| [John Selwyn Gummer](https://lda.data.parliament.uk/terms/399283) | Welsh | 0.64 | 3 | `399283` |
| [Lord Gordon of Strathblane](https://lda.data.parliament.uk/terms/399540) | Welsh | 0.64 | 4 | `399540` |
| [Delvaux, Anne](https://lda.data.parliament.uk/terms/402375) | French | 0.64 | 2 | `402375` |
| [Gwyneth Dunwoody](https://lda.data.parliament.uk/terms/408563) | Welsh | 0.64 | 2 | `408563` |
| [Gwilym Jones](https://lda.data.parliament.uk/terms/410522) | Welsh | 0.64 | 2 | `410522` |
| [Italian Parliament](https://lda.data.parliament.uk/terms/41255) | Italian | 0.64 | 2 | `41255` |
| [Lord Boothby](https://lda.data.parliament.uk/terms/413961) | Welsh | 0.64 | 2 | `413961` |
| [Lord Crawshaw of Aintree](https://lda.data.parliament.uk/terms/413963) | Welsh | 0.64 | 4 | `413963` |
| [Allan, Lucy](https://lda.data.parliament.uk/terms/415126) | Welsh | 0.64 | 2 | `415126` |
| [Lucy Allan](https://lda.data.parliament.uk/terms/415133) | Welsh | 0.64 | 2 | `415133` |
| [Prosser, Rebecca](https://lda.data.parliament.uk/terms/422674) | Italian | 0.64 | 2 | `422674` |
| [Landtag vom Baden-Wurttemberg](https://lda.data.parliament.uk/terms/42394) | German | 0.64 | 3 | `42394` |
| [Penderyn, Dic](https://lda.data.parliament.uk/terms/424413) | Welsh | 0.64 | 2 | `424413` |
| [Dic Penderyn](https://lda.data.parliament.uk/terms/424415) | Welsh | 0.64 | 2 | `424415` |
| [Trenitalia](https://lda.data.parliament.uk/terms/433939) | Italian | 0.64 | 1 | `433939` |
| [Cicada](https://lda.data.parliament.uk/terms/434548) | Portuguese | 0.64 | 1 | `434548` |
| [Abdulmawla, Abulmonem](https://lda.data.parliament.uk/terms/434566) | Welsh | 0.64 | 2 | `434566` |
| [Abulmonem Abdulmawla](https://lda.data.parliament.uk/terms/434568) | Welsh | 0.64 | 2 | `434568` |
| [LERU](https://lda.data.parliament.uk/terms/437825) | Latin | 0.64 | 1 | `437825` |
| [Bexleyheath line](https://lda.data.parliament.uk/terms/437964) | Welsh | 0.64 | 2 | `437964` |
| [Adtranz](https://lda.data.parliament.uk/terms/438) | German | 0.64 | 1 | `438` |
| [Ingenza](https://lda.data.parliament.uk/terms/438119) | Italian | 0.64 | 1 | `438119` |
| [Exploitation](https://lda.data.parliament.uk/terms/443399) | French | 0.64 | 1 | `443399` |
| [Toxoplasmosis](https://lda.data.parliament.uk/terms/44406) | Latin | 0.64 | 1 | `44406` |
| [Ciocca, Angelo](https://lda.data.parliament.uk/terms/444077) | Italian | 0.64 | 2 | `444077` |
| [Innogen Institute](https://lda.data.parliament.uk/terms/446109) | Latin | 0.64 | 2 | `446109` |
| [National Association of Social Maintenance](https://lda.data.parliament.uk/terms/44731) | French | 0.64 | 5 | `44731` |
| [Haemophilic arthropathy](https://lda.data.parliament.uk/terms/447700) | Latin | 0.64 | 2 | `447700` |
| [THC](https://lda.data.parliament.uk/terms/452083) | Irish | 0.64 | 1 | `452083` |
| [Tetrahydrocannabinol](https://lda.data.parliament.uk/terms/452084) | Welsh | 0.64 | 1 | `452084` |
| [Trimethylaminuria](https://lda.data.parliament.uk/terms/452850) | Latin | 0.64 | 1 | `452850` |
| [Haemochromatosis](https://lda.data.parliament.uk/terms/452996) | Latin | 0.64 | 1 | `452996` |
| [Scientific Forum on Invasive Alien Species](https://lda.data.parliament.uk/terms/455263) | Latin | 0.64 | 6 | `455263` |
| [Britannia Royal Naval College](https://lda.data.parliament.uk/terms/456784) | Latin | 0.64 | 4 | `456784` |
| [Law, Richard Edward Cecil](https://lda.data.parliament.uk/terms/460663) | Welsh | 0.64 | 4 | `460663` |
| [Richard Edward Cecil Law](https://lda.data.parliament.uk/terms/460665) | Welsh | 0.64 | 4 | `460665` |
| [Currie, Vivien](https://lda.data.parliament.uk/terms/466353) | Spanish | 0.64 | 2 | `466353` |
| [Vivien Currie](https://lda.data.parliament.uk/terms/466355) | Spanish | 0.64 | 2 | `466355` |
| [Mayne, Paddy](https://lda.data.parliament.uk/terms/466988) | Welsh | 0.64 | 2 | `466988` |
| [Paddy Mayne](https://lda.data.parliament.uk/terms/466990) | Welsh | 0.64 | 2 | `466990` |
| [PeachyKeen](https://lda.data.parliament.uk/terms/473712) | Welsh | 0.64 | 1 | `473712` |
| [Auschwitz-Birkenau](https://lda.data.parliament.uk/terms/476864) | German | 0.64 | 1 | `476864` |
| [Davies, (William) Dai](https://lda.data.parliament.uk/terms/478036) | Welsh | 0.64 | 3 | `478036` |
| [William Dai Davies](https://lda.data.parliament.uk/terms/478038) | Welsh | 0.64 | 3 | `478038` |
| [Mercaptamine hydrochloride](https://lda.data.parliament.uk/terms/480464) | Latin | 0.64 | 2 | `480464` |
| [MCW](https://lda.data.parliament.uk/terms/492694) | Welsh | 0.64 | 1 | `492694` |
| [CCWH](https://lda.data.parliament.uk/terms/49382) | Latin | 0.64 | 1 | `49382` |
| [Conscription](https://lda.data.parliament.uk/terms/49485) | Latin | 0.64 | 1 | `49485` |
| [William Edward John McCarthy](https://lda.data.parliament.uk/terms/499587) | Welsh | 0.64 | 4 | `499587` |
| [Bruno Pereira](https://lda.data.parliament.uk/terms/501053) | Portuguese | 0.64 | 2 | `501053` |
| [Herbs](https://lda.data.parliament.uk/terms/50107) | German | 0.64 | 1 | `50107` |
| [Northcote, Stafford Henry](https://lda.data.parliament.uk/terms/503795) | Welsh | 0.64 | 3 | `503795` |
| [Stafford Henry Northcote](https://lda.data.parliament.uk/terms/503799) | Welsh | 0.64 | 3 | `503799` |
| [Chetwynd-Talbot, Charles](https://lda.data.parliament.uk/terms/504441) | Welsh | 0.64 | 2 | `504441` |
| [Chetwynd-Talbot, Charles Henry John Benedict Crofton Chetwynd](https://lda.data.parliament.uk/terms/504443) | Welsh | 0.64 | 7 | `504443` |
| [Charles Chetwynd-Talbot](https://lda.data.parliament.uk/terms/504445) | Welsh | 0.64 | 2 | `504445` |
| [Charles Henry John Benedict Crofton Chetwynd Chetwynd-Talbot](https://lda.data.parliament.uk/terms/504447) | Welsh | 0.64 | 7 | `504447` |
| [Orbis](https://lda.data.parliament.uk/terms/513341) | Latin | 0.64 | 1 | `513341` |
| [Portabatabaei, Ali](https://lda.data.parliament.uk/terms/513727) | Latin | 0.64 | 2 | `513727` |
| [Ali Portabatabaei](https://lda.data.parliament.uk/terms/513729) | Latin | 0.64 | 2 | `513729` |
| [Ingabire, Victoire](https://lda.data.parliament.uk/terms/515395) | French | 0.64 | 2 | `515395` |
| [Samnas](https://lda.data.parliament.uk/terms/517316) | Latin | 0.64 | 1 | `517316` |
| [Wilders, Geert](https://lda.data.parliament.uk/terms/518370) | Dutch | 0.64 | 2 | `518370` |
| [Geert Wilders](https://lda.data.parliament.uk/terms/518372) | Dutch | 0.64 | 2 | `518372` |
| [PCDDs](https://lda.data.parliament.uk/terms/519959) | Portuguese | 0.64 | 1 | `519959` |
| [Boghall and Bathgate Caledonia Pipe Band](https://lda.data.parliament.uk/terms/520924) | Welsh | 0.64 | 6 | `520924` |
| [HCFCs](https://lda.data.parliament.uk/terms/52470) | Portuguese | 0.64 | 1 | `52470` |
| [X-linked hypophosphataemia](https://lda.data.parliament.uk/terms/525176) | Latin | 0.64 | 2 | `525176` |
| [Marinair](https://lda.data.parliament.uk/terms/52754) | French | 0.64 | 1 | `52754` |
| [MAPPA](https://lda.data.parliament.uk/terms/527849) | Italian | 0.64 | 1 | `527849` |
| [AAL](https://lda.data.parliament.uk/terms/54504) | Dutch | 0.64 | 1 | `54504` |
| [Almanaar](https://lda.data.parliament.uk/terms/556618) | Dutch | 0.64 | 1 | `556618` |
| [Cairngorm Brewery](https://lda.data.parliament.uk/terms/556674) | Welsh | 0.64 | 2 | `556674` |
| [Britannia Fire](https://lda.data.parliament.uk/terms/562875) | Latin | 0.64 | 2 | `562875` |
| [Willem Buiter](https://lda.data.parliament.uk/terms/564090) | Dutch | 0.64 | 2 | `564090` |
| [Baxdrostat](https://lda.data.parliament.uk/terms/567248) | Dutch | 0.64 | 1 | `567248` |
| [Webb, Derek](https://lda.data.parliament.uk/terms/567315) | Dutch | 0.64 | 2 | `567315` |
| [Derek Webb](https://lda.data.parliament.uk/terms/567318) | Dutch | 0.64 | 2 | `567318` |
| [STARK](https://lda.data.parliament.uk/terms/570854) | German | 0.64 | 1 | `570854` |
| [Hallux valgus](https://lda.data.parliament.uk/terms/577655) | Latin | 0.64 | 2 | `577655` |
| [Transcranial magnetic stimulation](https://lda.data.parliament.uk/terms/578435) | Latin | 0.64 | 3 | `578435` |
| [Novograde](https://lda.data.parliament.uk/terms/59990) | Portuguese | 0.64 | 1 | `59990` |
| [Ocwen](https://lda.data.parliament.uk/terms/60193) | Welsh | 0.64 | 1 | `60193` |
| [CAGUK](https://lda.data.parliament.uk/terms/73850) | Irish | 0.64 | 1 | `73850` |
| [CalMac](https://lda.data.parliament.uk/terms/73870) | Spanish | 0.64 | 1 | `73870` |
| [CGCE](https://lda.data.parliament.uk/terms/74229) | Irish | 0.64 | 1 | `74229` |
| [CMEA](https://lda.data.parliament.uk/terms/74515) | Irish | 0.64 | 1 | `74515` |
| [CWASU](https://lda.data.parliament.uk/terms/75104) | Welsh | 0.64 | 1 | `75104` |
| [FNNPE](https://lda.data.parliament.uk/terms/75896) | Welsh | 0.64 | 1 | `75896` |
| [FODO](https://lda.data.parliament.uk/terms/75898) | Welsh | 0.64 | 1 | `75898` |
| [HEFCE](https://lda.data.parliament.uk/terms/76544) | Welsh | 0.64 | 1 | `76544` |
| [DIUS](https://lda.data.parliament.uk/terms/76856) | Latin | 0.64 | 1 | `76856` |
| [DJNIE](https://lda.data.parliament.uk/terms/76860) | French | 0.64 | 1 | `76860` |
| [EACH](https://lda.data.parliament.uk/terms/77033) | Irish | 0.64 | 1 | `77033` |
| [EAEVE](https://lda.data.parliament.uk/terms/77035) | Latin | 0.64 | 1 | `77035` |
| [EASA](https://lda.data.parliament.uk/terms/77058) | Irish | 0.64 | 1 | `77058` |
| [EDF](https://lda.data.parliament.uk/terms/77201) | Welsh | 0.64 | 1 | `77201` |
| [IPF](https://lda.data.parliament.uk/terms/77988) | German | 0.64 | 1 | `77988` |
| [NRRW](https://lda.data.parliament.uk/terms/78714) | Welsh | 0.64 | 1 | `78714` |
| [Ian Thain](https://lda.data.parliament.uk/terms/82667) | Irish | 0.64 | 2 | `82667` |
| [Tros Gynnal](https://lda.data.parliament.uk/terms/84199) | Welsh | 0.64 | 2 | `84199` |
| [Vibroplant](https://lda.data.parliament.uk/terms/85649) | Latin | 0.64 | 1 | `85649` |
| [Wrexham and East Denbighshire Water](https://lda.data.parliament.uk/terms/86621) | Welsh | 0.64 | 5 | `86621` |
| [Cheddar cheese](https://lda.data.parliament.uk/terms/9097) | Welsh | 0.64 | 2 | `9097` |
| [Senses](https://lda.data.parliament.uk/terms/92966) | Latin | 0.64 | 1 | `92966` |
| [Crewe and Nantwich](https://lda.data.parliament.uk/terms/9486) | German | 0.64 | 3 | `9486` |
| [NFTMO](https://lda.data.parliament.uk/terms/96751) | German | 0.64 | 1 | `96751` |
| [NICC](https://lda.data.parliament.uk/terms/96891) | Italian | 0.64 | 1 | `96891` |
| [NIHR](https://lda.data.parliament.uk/terms/96947) | German | 0.64 | 1 | `96947` |
| [Dysphagia](https://lda.data.parliament.uk/terms/9766) | Latin | 0.64 | 1 | `9766` |
| [Pompidou Group](https://lda.data.parliament.uk/terms/98752) | French | 0.64 | 2 | `98752` |
| [Procurement Services International](https://lda.data.parliament.uk/terms/98873) | French | 0.64 | 3 | `98873` |
| [UKCMRI](https://lda.data.parliament.uk/terms/100047) | Welsh | 0.63 | 1 | `100047` |
| [Luxembourg compromise](https://lda.data.parliament.uk/terms/11448) | French | 0.63 | 2 | `11448` |
| [New Caledonia](https://lda.data.parliament.uk/terms/11874) | Welsh | 0.63 | 2 | `11874` |
| [Aluminium Federation](https://lda.data.parliament.uk/terms/1227) | Latin | 0.63 | 2 | `1227` |
| [Stabilisation Force in Bosnia](https://lda.data.parliament.uk/terms/13022) | French | 0.63 | 4 | `13022` |
| [Uranium](https://lda.data.parliament.uk/terms/13549) | Latin | 0.63 | 1 | `13549` |
| [Anglo Arab Organisation](https://lda.data.parliament.uk/terms/1458) | French | 0.63 | 3 | `1458` |
| [Antarctic Act Tribunal](https://lda.data.parliament.uk/terms/1559) | Latin | 0.63 | 3 | `1559` |
| [Care & Repair Cymru](https://lda.data.parliament.uk/terms/18974) | Welsh | 0.63 | 4 | `18974` |
| [Care Sector Consortium](https://lda.data.parliament.uk/terms/18999) | Latin | 0.63 | 3 | `18999` |
| [CE Delft](https://lda.data.parliament.uk/terms/19265) | Dutch | 0.63 | 2 | `19265` |
| [Conservatoire for Dance and Drama](https://lda.data.parliament.uk/terms/21158) | French | 0.63 | 5 | `21158` |
| [Dell](https://lda.data.parliament.uk/terms/28567) | Italian | 0.63 | 1 | `28567` |
| [Herbert, Henry](https://lda.data.parliament.uk/terms/291443) | Welsh | 0.63 | 2 | `291443` |
| [Hayek, Friedrich](https://lda.data.parliament.uk/terms/291805) | German | 0.63 | 2 | `291805` |
| [Bonaccini, Aldo](https://lda.data.parliament.uk/terms/299244) | Italian | 0.63 | 2 | `299244` |
| [Cocilovo, Luigi](https://lda.data.parliament.uk/terms/299796) | Italian | 0.63 | 2 | `299796` |
| [Dhanda, Parmjit](https://lda.data.parliament.uk/terms/300168) | French | 0.63 | 2 | `300168` |
| [Ferrari, Francesco](https://lda.data.parliament.uk/terms/300486) | Italian | 0.63 | 2 | `300486` |
| [Freitas, Duarte](https://lda.data.parliament.uk/terms/300615) | Portuguese | 0.63 | 2 | `300615` |
| [Krahmer, Holger](https://lda.data.parliament.uk/terms/301701) | German | 0.63 | 2 | `301701` |
| [Megahy, Thomas](https://lda.data.parliament.uk/terms/302348) | Welsh | 0.63 | 2 | `302348` |
| [Moretti, Luigi](https://lda.data.parliament.uk/terms/302486) | Italian | 0.63 | 2 | `302486` |
| [Paciotti, Elena Ornella](https://lda.data.parliament.uk/terms/302794) | Italian | 0.63 | 3 | `302794` |
| [Pohjamo, Samuli](https://lda.data.parliament.uk/terms/302997) | Latin | 0.63 | 2 | `302997` |
| [Scotta, Giancarlo](https://lda.data.parliament.uk/terms/303508) | Italian | 0.63 | 2 | `303508` |
| [Szajer, Jozsef](https://lda.data.parliament.uk/terms/303899) | Welsh | 0.63 | 2 | `303899` |
| [Tourrain, Raymond](https://lda.data.parliament.uk/terms/304045) | French | 0.63 | 2 | `304045` |
| [Bonaccini,Aldo](https://lda.data.parliament.uk/terms/306944) | Italian | 0.63 | 1 | `306944` |
| [CSGC](https://lda.data.parliament.uk/terms/308833) | Welsh | 0.63 | 1 | `308833` |
| [Cocilovo,Luigi](https://lda.data.parliament.uk/terms/309476) | Italian | 0.63 | 1 | `309476` |
| [Megahy,Thomas](https://lda.data.parliament.uk/terms/320696) | Welsh | 0.63 | 1 | `320696` |
| [Moretti,Luigi](https://lda.data.parliament.uk/terms/321342) | Italian | 0.63 | 1 | `321342` |
| [Ffestiniog Railway](https://lda.data.parliament.uk/terms/34184) | Welsh | 0.63 | 2 | `34184` |
| [Coleg Harlech](https://lda.data.parliament.uk/terms/35540) | Welsh | 0.63 | 2 | `35540` |
| [AFLCIO](https://lda.data.parliament.uk/terms/361480) | Welsh | 0.63 | 1 | `361480` |
| [LSLO](https://lda.data.parliament.uk/terms/364720) | Dutch | 0.63 | 1 | `364720` |
| [Brethren](https://lda.data.parliament.uk/terms/366805) | Welsh | 0.63 | 1 | `366805` |
| [Lyn Brown](https://lda.data.parliament.uk/terms/401204) | Welsh | 0.63 | 2 | `401204` |
| [Parmjit Dhanda](https://lda.data.parliament.uk/terms/406916) | French | 0.63 | 2 | `406916` |
| [Henry Herbert](https://lda.data.parliament.uk/terms/414074) | Welsh | 0.63 | 2 | `414074` |
| [Meirion Thomas, Joseph](https://lda.data.parliament.uk/terms/424595) | Welsh | 0.63 | 3 | `424595` |
| [Joseph Meirion Thomas](https://lda.data.parliament.uk/terms/424919) | Welsh | 0.63 | 3 | `424919` |
| [Telereal Trillium](https://lda.data.parliament.uk/terms/425605) | Latin | 0.63 | 2 | `425605` |
| [Brain, Kathryn](https://lda.data.parliament.uk/terms/426776) | Welsh | 0.63 | 2 | `426776` |
| [Kathryn Brain](https://lda.data.parliament.uk/terms/426778) | Welsh | 0.63 | 2 | `426778` |
| [Leverhulme Trust](https://lda.data.parliament.uk/terms/42797) | Dutch | 0.63 | 2 | `42797` |
| [ZPWB](https://lda.data.parliament.uk/terms/433269) | Welsh | 0.63 | 1 | `433269` |
| [PeoplePlus](https://lda.data.parliament.uk/terms/435082) | French | 0.63 | 1 | `435082` |
| [UCLouvain](https://lda.data.parliament.uk/terms/43778) | French | 0.63 | 1 | `43778` |
| [RNAS Culdrose](https://lda.data.parliament.uk/terms/443310) | Welsh | 0.63 | 2 | `443310` |
| [JMOCC](https://lda.data.parliament.uk/terms/444334) | Italian | 0.63 | 1 | `444334` |
| [NOCN](https://lda.data.parliament.uk/terms/444430) | German | 0.63 | 1 | `444430` |
| [Britannia Securities](https://lda.data.parliament.uk/terms/4454) | Latin | 0.63 | 2 | `4454` |
| [Janssen](https://lda.data.parliament.uk/terms/446125) | Dutch | 0.63 | 1 | `446125` |
| [Bryan Edward Bellew](https://lda.data.parliament.uk/terms/446662) | Welsh | 0.63 | 3 | `446662` |
| [Bellew, Bryan Edward](https://lda.data.parliament.uk/terms/446664) | Welsh | 0.63 | 3 | `446664` |
| [Hypoglycaemia](https://lda.data.parliament.uk/terms/447797) | Latin | 0.63 | 1 | `447797` |
| [Carrefour](https://lda.data.parliament.uk/terms/448104) | French | 0.63 | 1 | `448104` |
| [Barton, Tamsyn](https://lda.data.parliament.uk/terms/449610) | Welsh | 0.63 | 2 | `449610` |
| [Tamsyn Barton](https://lda.data.parliament.uk/terms/449612) | Welsh | 0.63 | 2 | `449612` |
| [Marketforce Communications](https://lda.data.parliament.uk/terms/44999) | French | 0.63 | 2 | `44999` |
| [Richard Lloyd](https://lda.data.parliament.uk/terms/450929) | Welsh | 0.63 | 2 | `450929` |
| [Medscreen](https://lda.data.parliament.uk/terms/45304) | German | 0.63 | 1 | `45304` |
| [ABB](https://lda.data.parliament.uk/terms/454118) | Italian | 0.63 | 1 | `454118` |
| [Liu, Feiyue](https://lda.data.parliament.uk/terms/454575) | Latin | 0.63 | 2 | `454575` |
| [Liu Feiyue](https://lda.data.parliament.uk/terms/454577) | Latin | 0.63 | 2 | `454577` |
| [van Miltenburg, Matthijs](https://lda.data.parliament.uk/terms/456470) | Dutch | 0.63 | 3 | `456470` |
| [Halyomorpha halys](https://lda.data.parliament.uk/terms/460172) | Latin | 0.63 | 2 | `460172` |
| [Keith, Henry](https://lda.data.parliament.uk/terms/463235) | Welsh | 0.63 | 2 | `463235` |
| [Henry Keith](https://lda.data.parliament.uk/terms/463237) | Welsh | 0.63 | 2 | `463237` |
| [Lloyd, Anthony John Leslie](https://lda.data.parliament.uk/terms/464732) | Welsh | 0.63 | 4 | `464732` |
| [Anthony John Leslie Lloyd](https://lda.data.parliament.uk/terms/464734) | Welsh | 0.63 | 4 | `464734` |
| [CCFF](https://lda.data.parliament.uk/terms/468494) | Latin | 0.63 | 1 | `468494` |
| [Bramford, Anthony](https://lda.data.parliament.uk/terms/476237) | Welsh | 0.63 | 2 | `476237` |
| [Buddy Hub](https://lda.data.parliament.uk/terms/477974) | Welsh | 0.63 | 2 | `477974` |
| [Aducanumab](https://lda.data.parliament.uk/terms/483514) | Latin | 0.63 | 1 | `483514` |
| [Penyrheol Comprehensive School](https://lda.data.parliament.uk/terms/485548) | Welsh | 0.63 | 3 | `485548` |
| [DiDi](https://lda.data.parliament.uk/terms/485600) | Latin | 0.63 | 1 | `485600` |
| [Conseil national du numerique](https://lda.data.parliament.uk/terms/497112) | French | 0.63 | 4 | `497112` |
| [Guerrillas](https://lda.data.parliament.uk/terms/50071) | Spanish | 0.63 | 1 | `50071` |
| [Atypical tuberculosis](https://lda.data.parliament.uk/terms/500877) | Latin | 0.63 | 2 | `500877` |
| [AWC](https://lda.data.parliament.uk/terms/501901) | Welsh | 0.63 | 1 | `501901` |
| [Carbon capture and utilisation](https://lda.data.parliament.uk/terms/508760) | French | 0.63 | 4 | `508760` |
| [Adoptionplus](https://lda.data.parliament.uk/terms/509341) | Latin | 0.63 | 1 | `509341` |
| [Prestatyn](https://lda.data.parliament.uk/terms/509874) | Welsh | 0.63 | 1 | `509874` |
| [Battersbee, Archie](https://lda.data.parliament.uk/terms/515564) | Dutch | 0.63 | 2 | `515564` |
| [Archie Battersbee](https://lda.data.parliament.uk/terms/515566) | Dutch | 0.63 | 2 | `515566` |
| [Tazhimuratov, Dauletmurat](https://lda.data.parliament.uk/terms/516113) | Italian | 0.63 | 2 | `516113` |
| [Dauletmurat Tazhimuratov](https://lda.data.parliament.uk/terms/516115) | Italian | 0.63 | 2 | `516115` |
| [Hanafin, Billy](https://lda.data.parliament.uk/terms/518826) | Welsh | 0.63 | 2 | `518826` |
| [Billy Hanafin](https://lda.data.parliament.uk/terms/518828) | Welsh | 0.63 | 2 | `518828` |
| [Clostridium perfringens](https://lda.data.parliament.uk/terms/51976) | Latin | 0.63 | 2 | `51976` |
| [HMS Argyll](https://lda.data.parliament.uk/terms/520111) | Welsh | 0.63 | 2 | `520111` |
| [Lloyd, Richard](https://lda.data.parliament.uk/terms/522180) | Welsh | 0.63 | 2 | `522180` |
| [Triamcinolone hexacetonide](https://lda.data.parliament.uk/terms/525365) | Latin | 0.63 | 2 | `525365` |
| [Anglo-Arab Organisation](https://lda.data.parliament.uk/terms/53622) | French | 0.63 | 2 | `53622` |
| [Double Taxation Relief and International Tax Enforcement (Luxembourg) Order 2010](https://lda.data.parliament.uk/terms/540644) | French | 0.63 | 10 | `540644` |
| [Double Taxation Relief and International Tax Enforcement (Luxembourg) Order 2009](https://lda.data.parliament.uk/terms/540647) | French | 0.63 | 10 | `540647` |
| [BAWP](https://lda.data.parliament.uk/terms/54088) | Welsh | 0.63 | 1 | `54088` |
| [Newport West and Islwyn](https://lda.data.parliament.uk/terms/545767) | Welsh | 0.63 | 4 | `545767` |
| [Brixham](https://lda.data.parliament.uk/terms/546451) | Latin | 0.63 | 1 | `546451` |
| [BRICMICS](https://lda.data.parliament.uk/terms/55012) | Italian | 0.63 | 1 | `55012` |
| [Brown, Lyn](https://lda.data.parliament.uk/terms/553919) | Welsh | 0.63 | 2 | `553919` |
| [WP Tweed](https://lda.data.parliament.uk/terms/554764) | Dutch | 0.63 | 2 | `554764` |
| [HMYOI New Hall](https://lda.data.parliament.uk/terms/555354) | Welsh | 0.63 | 3 | `555354` |
| [Titanium salicylate](https://lda.data.parliament.uk/terms/556744) | Latin | 0.63 | 2 | `556744` |
| [Bob Vylan](https://lda.data.parliament.uk/terms/563077) | Welsh | 0.63 | 2 | `563077` |
| [Cardenas Zepeda, Carlos](https://lda.data.parliament.uk/terms/567272) | Spanish | 0.63 | 3 | `567272` |
| [Carlos Cardenas Zepeda](https://lda.data.parliament.uk/terms/567276) | Spanish | 0.63 | 3 | `567276` |
| [Goaco](https://lda.data.parliament.uk/terms/567916) | Portuguese | 0.63 | 1 | `567916` |
| [Sibylline](https://lda.data.parliament.uk/terms/582883) | Latin | 0.63 | 1 | `582883` |
| [Parmalat](https://lda.data.parliament.uk/terms/61120) | Italian | 0.63 | 1 | `61120` |
| [Coleg Pencraig](https://lda.data.parliament.uk/terms/61327) | Welsh | 0.63 | 2 | `61327` |
| [Samsung](https://lda.data.parliament.uk/terms/67484) | German | 0.63 | 1 | `67484` |
| [Stewartry Care](https://lda.data.parliament.uk/terms/69291) | Welsh | 0.63 | 2 | `69291` |
| [Space Transportation Association](https://lda.data.parliament.uk/terms/70662) | French | 0.63 | 3 | `70662` |
| [CSAE](https://lda.data.parliament.uk/terms/75023) | Welsh | 0.63 | 1 | `75023` |
| [ESRF](https://lda.data.parliament.uk/terms/75527) | German | 0.63 | 1 | `75527` |
| [FRC](https://lda.data.parliament.uk/terms/75965) | Latin | 0.63 | 1 | `75965` |
| [EFDSS](https://lda.data.parliament.uk/terms/77245) | Dutch | 0.63 | 1 | `77245` |
| [IISS](https://lda.data.parliament.uk/terms/77612) | Latin | 0.63 | 1 | `77612` |
| [IPSM](https://lda.data.parliament.uk/terms/78012) | Latin | 0.63 | 1 | `78012` |
| [IRCC](https://lda.data.parliament.uk/terms/78027) | Latin | 0.63 | 1 | `78027` |
| [Sufferers of Iatrogenic Neglect](https://lda.data.parliament.uk/terms/82058) | Latin | 0.63 | 4 | `82058` |
| [Air Cadet Organisation](https://lda.data.parliament.uk/terms/831) | French | 0.63 | 3 | `831` |
| [Telekom Malaysia (UK)](https://lda.data.parliament.uk/terms/83176) | German | 0.63 | 3 | `83176` |
| [Chlorpropham](https://lda.data.parliament.uk/terms/9155) | Latin | 0.63 | 1 | `9155` |
| [NACSA](https://lda.data.parliament.uk/terms/96186) | Irish | 0.63 | 1 | `96186` |
| [NELFT](https://lda.data.parliament.uk/terms/96668) | Dutch | 0.63 | 1 | `96668` |
| [NICU](https://lda.data.parliament.uk/terms/96906) | Latin | 0.63 | 1 | `96906` |
| [NNRP](https://lda.data.parliament.uk/terms/97016) | Irish | 0.63 | 1 | `97016` |
| [Midlothian](https://lda.data.parliament.uk/terms/11666) | Welsh | 0.62 | 1 | `11666` |
| [Millennium exhibition](https://lda.data.parliament.uk/terms/11683) | Latin | 0.62 | 2 | `11683` |
| [Nauru](https://lda.data.parliament.uk/terms/11849) | Latin | 0.62 | 1 | `11849` |
| [Anarchist Syndicalist Alliance](https://lda.data.parliament.uk/terms/1387) | French | 0.62 | 3 | `1387` |
| [Anglican Communion Office](https://lda.data.parliament.uk/terms/1448) | Latin | 0.62 | 3 | `1448` |
| [Archaeology Forum](https://lda.data.parliament.uk/terms/1687) | Latin | 0.62 | 2 | `1687` |
| [Cable Communications Association](https://lda.data.parliament.uk/terms/17024) | French | 0.62 | 3 | `17024` |
| [Enforcement Services Association](https://lda.data.parliament.uk/terms/17669) | French | 0.62 | 3 | `17669` |
| [CoalPro](https://lda.data.parliament.uk/terms/20923) | Dutch | 0.62 | 1 | `20923` |
| [Coptic Orthodox Church](https://lda.data.parliament.uk/terms/21492) | Latin | 0.62 | 3 | `21492` |
| [HJ Heinz](https://lda.data.parliament.uk/terms/24942) | German | 0.62 | 2 | `24942` |
| [Commerzbank](https://lda.data.parliament.uk/terms/25476) | German | 0.62 | 1 | `25476` |
| [INCA Consortium](https://lda.data.parliament.uk/terms/26490) | Latin | 0.62 | 2 | `26490` |
| [Keohane, Dan](https://lda.data.parliament.uk/terms/291555) | Welsh | 0.62 | 2 | `291555` |
| [Amendola, Gianfranco](https://lda.data.parliament.uk/terms/298847) | Italian | 0.62 | 2 | `298847` |
| [Linkohr, Rolf](https://lda.data.parliament.uk/terms/301917) | German | 0.62 | 2 | `301917` |
| [Maibaum, Gepa](https://lda.data.parliament.uk/terms/302076) | German | 0.62 | 2 | `302076` |
| [Mitola, Pietro](https://lda.data.parliament.uk/terms/302430) | Italian | 0.62 | 2 | `302430` |
| [Nassauer, Hartmut](https://lda.data.parliament.uk/terms/302603) | German | 0.62 | 2 | `302603` |
| [Pettinari, Luciano](https://lda.data.parliament.uk/terms/302938) | Italian | 0.62 | 2 | `302938` |
| [Romagnoli, Carettoni](https://lda.data.parliament.uk/terms/303295) | Italian | 0.62 | 2 | `303295` |
| [Samland, Detlev](https://lda.data.parliament.uk/terms/303414) | Dutch | 0.62 | 2 | `303414` |
| [Schnellhardt, Horst](https://lda.data.parliament.uk/terms/303480) | German | 0.62 | 2 | `303480` |
| [Zissener, Sabine](https://lda.data.parliament.uk/terms/304548) | German | 0.62 | 2 | `304548` |
| [Amendola,Gianfranco](https://lda.data.parliament.uk/terms/305260) | Italian | 0.62 | 1 | `305260` |
| [Baedeker](https://lda.data.parliament.uk/terms/3081) | Dutch | 0.62 | 1 | `3081` |
| [Rachel Treweek](https://lda.data.parliament.uk/terms/313454) | Dutch | 0.62 | 2 | `313454` |
| [Linkohr,Rolf](https://lda.data.parliament.uk/terms/318622) | German | 0.62 | 1 | `318622` |
| [Maibaum,Gepa](https://lda.data.parliament.uk/terms/319362) | German | 0.62 | 1 | `319362` |
| [Mitola,Pietro](https://lda.data.parliament.uk/terms/321114) | Italian | 0.62 | 1 | `321114` |
| [Nassauer,Hartmut](https://lda.data.parliament.uk/terms/321898) | German | 0.62 | 1 | `321898` |
| [Earthkind](https://lda.data.parliament.uk/terms/32833) | Irish | 0.62 | 1 | `32833` |
| [Fincantieri](https://lda.data.parliament.uk/terms/34329) | Italian | 0.62 | 1 | `34329` |
| [Superannuation Act 2010](https://lda.data.parliament.uk/terms/345582) | Latin | 0.62 | 3 | `345582` |
| [Provera, Fiorello](https://lda.data.parliament.uk/terms/347439) | Italian | 0.62 | 2 | `347439` |
| [Balzani, Francesca](https://lda.data.parliament.uk/terms/347481) | Italian | 0.62 | 2 | `347481` |
| [Frankfurter Institut](https://lda.data.parliament.uk/terms/34946) | German | 0.62 | 2 | `34946` |
| [German Bundesbank](https://lda.data.parliament.uk/terms/36422) | German | 0.62 | 2 | `36422` |
| [German Bundesrat](https://lda.data.parliament.uk/terms/36423) | German | 0.62 | 2 | `36423` |
| [Gin Rectifiers and Distillers Association](https://lda.data.parliament.uk/terms/36511) | French | 0.62 | 5 | `36511` |
| [Gamma-butyrolactone (Prohibition) Bill 2007-08](https://lda.data.parliament.uk/terms/366194) | Latin | 0.62 | 4 | `366194` |
| [Interpretation Act 1978](https://lda.data.parliament.uk/terms/383178) | Latin | 0.62 | 3 | `383178` |
| [Superannuation Act 1972](https://lda.data.parliament.uk/terms/390027) | Latin | 0.62 | 3 | `390027` |
| [Prime Minister (Ecclesiastical Functions) Bill (HL) 1997/98](https://lda.data.parliament.uk/terms/392239) | Latin | 0.62 | 7 | `392239` |
| [Berenberg Bank](https://lda.data.parliament.uk/terms/398043) | Dutch | 0.62 | 2 | `398043` |
| [Ni Riada, Liadh](https://lda.data.parliament.uk/terms/408808) | Irish | 0.62 | 3 | `408808` |
| [Invest in Britain Bureau](https://lda.data.parliament.uk/terms/40959) | French | 0.62 | 4 | `40959` |
| [Jubilee 2000 UK](https://lda.data.parliament.uk/terms/41712) | Dutch | 0.62 | 3 | `41712` |
| [Kalayaan](https://lda.data.parliament.uk/terms/41787) | Dutch | 0.62 | 1 | `41787` |
| [Treweek, Rachel](https://lda.data.parliament.uk/terms/420282) | Dutch | 0.62 | 2 | `420282` |
| [Ruas, Fernando](https://lda.data.parliament.uk/terms/422100) | Portuguese | 0.62 | 2 | `422100` |
| [Haigh, David](https://lda.data.parliament.uk/terms/424569) | Irish | 0.62 | 2 | `424569` |
| [David Haigh](https://lda.data.parliament.uk/terms/424846) | Irish | 0.62 | 2 | `424846` |
| [Polygeia](https://lda.data.parliament.uk/terms/426287) | Welsh | 0.62 | 1 | `426287` |
| [Guo, Feixiong](https://lda.data.parliament.uk/terms/429019) | Welsh | 0.62 | 2 | `429019` |
| [Guo Feixiong](https://lda.data.parliament.uk/terms/429021) | Welsh | 0.62 | 2 | `429021` |
| [Mononucleosis](https://lda.data.parliament.uk/terms/431783) | Latin | 0.62 | 1 | `431783` |
| [Fragomen, Del Rey, Bernsen and Loewy](https://lda.data.parliament.uk/terms/434728) | Welsh | 0.62 | 6 | `434728` |
| [Rodriguez-Pinero Fernandez, Inmaculada](https://lda.data.parliament.uk/terms/437000) | Spanish | 0.62 | 3 | `437000` |
| [Aiuto, Daniela](https://lda.data.parliament.uk/terms/442797) | Italian | 0.62 | 2 | `442797` |
| [Stacey, Glenys](https://lda.data.parliament.uk/terms/444374) | Welsh | 0.62 | 2 | `444374` |
| [Glenys Stacey](https://lda.data.parliament.uk/terms/444376) | Welsh | 0.62 | 2 | `444376` |
| [Britannia Lift](https://lda.data.parliament.uk/terms/4453) | Latin | 0.62 | 2 | `4453` |
| [Jones, Stephen Henry](https://lda.data.parliament.uk/terms/451086) | Welsh | 0.62 | 3 | `451086` |
| [Stephen Henry Jones](https://lda.data.parliament.uk/terms/451088) | Welsh | 0.62 | 3 | `451088` |
| [Medecins sans frontieres](https://lda.data.parliament.uk/terms/45291) | French | 0.62 | 3 | `45291` |
| [Lithium](https://lda.data.parliament.uk/terms/454965) | Latin | 0.62 | 1 | `454965` |
| [Anosmia](https://lda.data.parliament.uk/terms/456289) | Latin | 0.62 | 1 | `456289` |
| [Opinium](https://lda.data.parliament.uk/terms/457104) | Latin | 0.62 | 1 | `457104` |
| [Jones, Frederick Elwyn](https://lda.data.parliament.uk/terms/460683) | Welsh | 0.62 | 3 | `460683` |
| [Frederick Elwyn Jones](https://lda.data.parliament.uk/terms/460685) | Welsh | 0.62 | 3 | `460685` |
| [Sandys, Duncan](https://lda.data.parliament.uk/terms/461417) | Welsh | 0.62 | 2 | `461417` |
| [Duncan Sandys](https://lda.data.parliament.uk/terms/461419) | Welsh | 0.62 | 2 | `461419` |
| [Britbet](https://lda.data.parliament.uk/terms/470197) | German | 0.62 | 1 | `470197` |
| [Iaaza, Yahya](https://lda.data.parliament.uk/terms/474506) | French | 0.62 | 2 | `474506` |
| [Yahya Iaaza](https://lda.data.parliament.uk/terms/474508) | French | 0.62 | 2 | `474508` |
| [Avant Garde Maritime Services](https://lda.data.parliament.uk/terms/479011) | French | 0.62 | 4 | `479011` |
| [Caffari, Dee](https://lda.data.parliament.uk/terms/480004) | Italian | 0.62 | 2 | `480004` |
| [Dee Caffari](https://lda.data.parliament.uk/terms/480026) | Italian | 0.62 | 2 | `480026` |
| [Jalal, Faizullah](https://lda.data.parliament.uk/terms/493268) | Welsh | 0.62 | 2 | `493268` |
| [Faizullah Jalal](https://lda.data.parliament.uk/terms/493272) | Welsh | 0.62 | 2 | `493272` |
| [Alpha Men Assemble](https://lda.data.parliament.uk/terms/493434) | French | 0.62 | 3 | `493434` |
| [William Molloy](https://lda.data.parliament.uk/terms/500019) | Welsh | 0.62 | 2 | `500019` |
| [Molloy, William](https://lda.data.parliament.uk/terms/500021) | Welsh | 0.62 | 2 | `500021` |
| [GalGael](https://lda.data.parliament.uk/terms/500200) | Welsh | 0.62 | 1 | `500200` |
| [Kindergarten](https://lda.data.parliament.uk/terms/50275) | German | 0.62 | 1 | `50275` |
| [Kanzen Karate](https://lda.data.parliament.uk/terms/502944) | German | 0.62 | 2 | `502944` |
| [Allenby, Michael Jaffray Hynman](https://lda.data.parliament.uk/terms/504767) | Welsh | 0.62 | 4 | `504767` |
| [Michael Jaffray Hynman Allenby](https://lda.data.parliament.uk/terms/504769) | Welsh | 0.62 | 4 | `504769` |
| [Lyttelton, Thomas](https://lda.data.parliament.uk/terms/504885) | Welsh | 0.62 | 2 | `504885` |
| [Thomas Lyttelton](https://lda.data.parliament.uk/terms/504889) | Welsh | 0.62 | 2 | `504889` |
| [PEEK](https://lda.data.parliament.uk/terms/507822) | Dutch | 0.62 | 1 | `507822` |
| [Revenue](https://lda.data.parliament.uk/terms/50912) | French | 0.62 | 1 | `50912` |
| [SpectrumX](https://lda.data.parliament.uk/terms/509674) | Latin | 0.62 | 1 | `509674` |
| [Tegretol](https://lda.data.parliament.uk/terms/510002) | Italian | 0.62 | 1 | `510002` |
| [Radio Glangwili](https://lda.data.parliament.uk/terms/510486) | Welsh | 0.62 | 2 | `510486` |
| [St Augustine's Episcopal Church](https://lda.data.parliament.uk/terms/521367) | Latin | 0.62 | 4 | `521367` |
| [LGfL](https://lda.data.parliament.uk/terms/527746) | Welsh | 0.62 | 1 | `527746` |
| [BAAF](https://lda.data.parliament.uk/terms/53965) | Dutch | 0.62 | 1 | `53965` |
| [St Giles' Cathedral](https://lda.data.parliament.uk/terms/540197) | Latin | 0.62 | 3 | `540197` |
| [BHRCA](https://lda.data.parliament.uk/terms/54243) | Spanish | 0.62 | 1 | `54243` |
| [AGH](https://lda.data.parliament.uk/terms/54403) | Irish | 0.62 | 1 | `54403` |
| [McNeill, Kirsty](https://lda.data.parliament.uk/terms/546937) | Welsh | 0.62 | 2 | `546937` |
| [Jermy, Terry](https://lda.data.parliament.uk/terms/547160) | Welsh | 0.62 | 2 | `547160` |
| [Kirsty McNeill](https://lda.data.parliament.uk/terms/547251) | Welsh | 0.62 | 2 | `547251` |
| [Terry Jermy](https://lda.data.parliament.uk/terms/547471) | Welsh | 0.62 | 2 | `547471` |
| [Palmieri, Lorenzo](https://lda.data.parliament.uk/terms/551680) | Italian | 0.62 | 2 | `551680` |
| [Lorenzo Palmieri](https://lda.data.parliament.uk/terms/551682) | Italian | 0.62 | 2 | `551682` |
| [Metaphysic](https://lda.data.parliament.uk/terms/552184) | Latin | 0.62 | 1 | `552184` |
| [HMYOI Hollesley Bay](https://lda.data.parliament.uk/terms/555148) | Welsh | 0.62 | 3 | `555148` |
| [HMP Prescoed](https://lda.data.parliament.uk/terms/555387) | Welsh | 0.62 | 2 | `555387` |
| [Moloney, Niamh](https://lda.data.parliament.uk/terms/556762) | Irish | 0.62 | 2 | `556762` |
| [Niamh Moloney](https://lda.data.parliament.uk/terms/556764) | Irish | 0.62 | 2 | `556764` |
| [Deach, Eric](https://lda.data.parliament.uk/terms/560292) | Irish | 0.62 | 2 | `560292` |
| [Eric Deach](https://lda.data.parliament.uk/terms/560294) | Irish | 0.62 | 2 | `560294` |
| [Glenigan](https://lda.data.parliament.uk/terms/566697) | Welsh | 0.62 | 1 | `566697` |
| [Schafer, Hannah](https://lda.data.parliament.uk/terms/582839) | German | 0.62 | 2 | `582839` |
| [Hannah Schafer](https://lda.data.parliament.uk/terms/582841) | German | 0.62 | 2 | `582841` |
| [Nonsuch Antiquarian Society](https://lda.data.parliament.uk/terms/58932) | Latin | 0.62 | 3 | `58932` |
| [Dyfed Fire Brigade](https://lda.data.parliament.uk/terms/59302) | Welsh | 0.62 | 3 | `59302` |
| [RRH Portreath](https://lda.data.parliament.uk/terms/60154) | Welsh | 0.62 | 2 | `60154` |
| [Orthodox Christian Studies Institute](https://lda.data.parliament.uk/terms/60664) | Latin | 0.62 | 4 | `60664` |
| [Rhone Merieux](https://lda.data.parliament.uk/terms/66583) | French | 0.62 | 2 | `66583` |
| [CRMPG](https://lda.data.parliament.uk/terms/74993) | Welsh | 0.62 | 1 | `74993` |
| [CYDAG](https://lda.data.parliament.uk/terms/75112) | Welsh | 0.62 | 1 | `75112` |
| [EFDS](https://lda.data.parliament.uk/terms/77244) | Dutch | 0.62 | 1 | `77244` |
| [ICDC](https://lda.data.parliament.uk/terms/77487) | French | 0.62 | 1 | `77487` |
| [ILEA](https://lda.data.parliament.uk/terms/77622) | Irish | 0.62 | 1 | `77622` |
| [ISG](https://lda.data.parliament.uk/terms/78076) | Welsh | 0.62 | 1 | `78076` |
| [JFSSG](https://lda.data.parliament.uk/terms/78198) | Dutch | 0.62 | 1 | `78198` |
| [LDDC](https://lda.data.parliament.uk/terms/78454) | Welsh | 0.62 | 1 | `78454` |
| [Marxist Leninist Organisations of Britain](https://lda.data.parliament.uk/terms/79084) | French | 0.62 | 5 | `79084` |
| [TaxAid](https://lda.data.parliament.uk/terms/82582) | Welsh | 0.62 | 1 | `82582` |
| [William Lloyd Williams and Son](https://lda.data.parliament.uk/terms/86147) | Welsh | 0.62 | 5 | `86147` |
| [Bosphorus](https://lda.data.parliament.uk/terms/8746) | Latin | 0.62 | 1 | `8746` |
| [Curfews](https://lda.data.parliament.uk/terms/90800) | Portuguese | 0.62 | 1 | `90800` |
| [Maladministration](https://lda.data.parliament.uk/terms/91914) | French | 0.62 | 1 | `91914` |
| [NAMSA](https://lda.data.parliament.uk/terms/96223) | Irish | 0.62 | 1 | `96223` |
| [NATTA](https://lda.data.parliament.uk/terms/96510) | Italian | 0.62 | 1 | `96510` |
| [NFWI](https://lda.data.parliament.uk/terms/96756) | Welsh | 0.62 | 1 | `96756` |
| [PABFP](https://lda.data.parliament.uk/terms/98413) | German | 0.62 | 1 | `98413` |
| [Anglia Polytechnic University](https://lda.data.parliament.uk/terms/1435) | Latin | 0.61 | 3 | `1435` |
| [Accommadata](https://lda.data.parliament.uk/terms/204) | Latin | 0.61 | 1 | `204` |
| [Codex Alimentarius Commission](https://lda.data.parliament.uk/terms/20958) | Latin | 0.61 | 3 | `20958` |
| [Association of Lord Lieutenants](https://lda.data.parliament.uk/terms/2497) | French | 0.61 | 4 | `2497` |
| [Institute for Optimum Nutrition](https://lda.data.parliament.uk/terms/27028) | Latin | 0.61 | 4 | `27028` |
| [Cumberland and Westmorland Antiquarian Archaeological Society](https://lda.data.parliament.uk/terms/28062) | Latin | 0.61 | 6 | `28062` |
| [OpTIC Glyndwr](https://lda.data.parliament.uk/terms/285865) | Welsh | 0.61 | 2 | `285865` |
| [FASNA](https://lda.data.parliament.uk/terms/286317) | Welsh | 0.61 | 1 | `286317` |
| [FoDP](https://lda.data.parliament.uk/terms/287241) | Welsh | 0.61 | 1 | `287241` |
| [Barsby, Andrew](https://lda.data.parliament.uk/terms/290878) | Welsh | 0.61 | 2 | `290878` |
| [Andrew Barsby](https://lda.data.parliament.uk/terms/291769) | Welsh | 0.61 | 2 | `291769` |
| [Kohl, Helmut](https://lda.data.parliament.uk/terms/298569) | German | 0.61 | 2 | `298569` |
| [Aelvoet, Magda GH](https://lda.data.parliament.uk/terms/298774) | Dutch | 0.61 | 3 | `298774` |
| [Caccia, Lord](https://lda.data.parliament.uk/terms/299510) | Italian | 0.61 | 2 | `299510` |
| [D'Angelosante, Francescopaolo](https://lda.data.parliament.uk/terms/300015) | Italian | 0.61 | 2 | `300015` |
| [De Rossa, Proinsias](https://lda.data.parliament.uk/terms/300101) | Irish | 0.61 | 3 | `300101` |
| [Elchlepp, Dietrich](https://lda.data.parliament.uk/terms/300330) | German | 0.61 | 2 | `300330` |
| [Ferreira, Anne](https://lda.data.parliament.uk/terms/300487) | Portuguese | 0.61 | 2 | `300487` |
| [Fuchs, G](https://lda.data.parliament.uk/terms/300630) | German | 0.61 | 2 | `300630` |
| [Gemelli, Vitaliano](https://lda.data.parliament.uk/terms/300704) | Italian | 0.61 | 2 | `300704` |
| [Gibault, Claire](https://lda.data.parliament.uk/terms/300723) | French | 0.61 | 2 | `300723` |
| [Holzfuss, Martin](https://lda.data.parliament.uk/terms/301254) | German | 0.61 | 2 | `301254` |
| [Lehideux, Bernard](https://lda.data.parliament.uk/terms/301842) | French | 0.61 | 2 | `301842` |
| [Lo Giudice, Calogero](https://lda.data.parliament.uk/terms/301950) | Italian | 0.61 | 3 | `301950` |
| [Luttge, Gunter](https://lda.data.parliament.uk/terms/302003) | German | 0.61 | 2 | `302003` |
| [Murphy of Torfaen, Lord](https://lda.data.parliament.uk/terms/302578) | Welsh | 0.61 | 4 | `302578` |
| [Nogueira Roman, Camilo](https://lda.data.parliament.uk/terms/302665) | Portuguese | 0.61 | 3 | `302665` |
| [Prosser, Baroness](https://lda.data.parliament.uk/terms/303071) | Italian | 0.61 | 2 | `303071` |
| [Redondo Jimenez, Encarnacion](https://lda.data.parliament.uk/terms/303160) | Spanish | 0.61 | 3 | `303160` |
| [Rinsche, Gunter](https://lda.data.parliament.uk/terms/303224) | German | 0.61 | 2 | `303224` |
| [Sassano, Mario](https://lda.data.parliament.uk/terms/303444) | Italian | 0.61 | 2 | `303444` |
| [Smith, Llew](https://lda.data.parliament.uk/terms/303659) | Welsh | 0.61 | 2 | `303659` |
| [Wynford, Lord](https://lda.data.parliament.uk/terms/304505) | Welsh | 0.61 | 2 | `304505` |
| [Aelvoet,Magda GH](https://lda.data.parliament.uk/terms/304992) | Dutch | 0.61 | 2 | `304992` |
| [D'Angelosante,Francescopaolo](https://lda.data.parliament.uk/terms/310364) | Italian | 0.61 | 1 | `310364` |
| [De Rossa,Proinsias](https://lda.data.parliament.uk/terms/310732) | Irish | 0.61 | 2 | `310732` |
| [Elchlepp,Dietrich](https://lda.data.parliament.uk/terms/311688) | German | 0.61 | 1 | `311688` |
| [Ferreira,Anne](https://lda.data.parliament.uk/terms/312236) | Portuguese | 0.61 | 1 | `312236` |
| [Fuchs,G](https://lda.data.parliament.uk/terms/312944) | German | 0.61 | 1 | `312944` |
| [Gemelli,Vitaliano](https://lda.data.parliament.uk/terms/313198) | Italian | 0.61 | 1 | `313198` |
| [Herrero-Tejedor, Luis Francisco](https://lda.data.parliament.uk/terms/315166) | Spanish | 0.61 | 3 | `315166` |
| [Herrero-Tejedor,Luis Francisco](https://lda.data.parliament.uk/terms/315167) | Spanish | 0.61 | 2 | `315167` |
| [Holzfuss,Martin](https://lda.data.parliament.uk/terms/315566) | German | 0.61 | 1 | `315566` |
| [Lo Giudice,Calogero](https://lda.data.parliament.uk/terms/318774) | Italian | 0.61 | 2 | `318774` |
| [Luttge,Gunter](https://lda.data.parliament.uk/terms/319004) | German | 0.61 | 1 | `319004` |
| [Nogueira Roman,Camilo](https://lda.data.parliament.uk/terms/322162) | Portuguese | 0.61 | 2 | `322162` |
| [Actis](https://lda.data.parliament.uk/terms/325) | Latin | 0.61 | 1 | `325` |
| [Llew Smith](https://lda.data.parliament.uk/terms/326166) | Welsh | 0.61 | 2 | `326166` |
| [Glaisyers](https://lda.data.parliament.uk/terms/36533) | Welsh | 0.61 | 1 | `36533` |
| [Danida](https://lda.data.parliament.uk/terms/370302) | Portuguese | 0.61 | 1 | `370302` |
| [Bangor](https://lda.data.parliament.uk/terms/370799) | Welsh | 0.61 | 1 | `370799` |
| [International Centre for Reconciliation](https://lda.data.parliament.uk/terms/37448) | French | 0.61 | 4 | `37448` |
| [Binder Hamlyn](https://lda.data.parliament.uk/terms/3758) | Welsh | 0.61 | 2 | `3758` |
| [InterSystems](https://lda.data.parliament.uk/terms/37884) | German | 0.61 | 1 | `37884` |
| [Maintenance Enforcement Bill (HL) 1990/91](https://lda.data.parliament.uk/terms/392113) | French | 0.61 | 5 | `392113` |
| [Pierre Audoin Consultants](https://lda.data.parliament.uk/terms/397802) | French | 0.61 | 3 | `397802` |
| [Baroness Prosser](https://lda.data.parliament.uk/terms/400478) | Italian | 0.61 | 2 | `400478` |
| [Trachoma](https://lda.data.parliament.uk/terms/401171) | Irish | 0.61 | 1 | `401171` |
| [Ulvskog, Marita](https://lda.data.parliament.uk/terms/402372) | Latin | 0.61 | 2 | `402372` |
| [Maintenance Enforcement Bill [HL] 1990/91](https://lda.data.parliament.uk/terms/404599) | French | 0.61 | 5 | `404599` |
| [Hill, Paddy](https://lda.data.parliament.uk/terms/407080) | Welsh | 0.61 | 2 | `407080` |
| [HMYOI Cookham Wood](https://lda.data.parliament.uk/terms/408738) | Welsh | 0.61 | 3 | `408738` |
| [Lord Wynford](https://lda.data.parliament.uk/terms/411861) | Welsh | 0.61 | 2 | `411861` |
| [Lord Caccia](https://lda.data.parliament.uk/terms/413783) | Italian | 0.61 | 2 | `413783` |
| [Hendry, Drew](https://lda.data.parliament.uk/terms/416092) | Welsh | 0.61 | 2 | `416092` |
| [Drew Hendry](https://lda.data.parliament.uk/terms/416432) | Welsh | 0.61 | 2 | `416432` |
| [Kerzner](https://lda.data.parliament.uk/terms/41929) | German | 0.61 | 1 | `41929` |
| [Diaconu, Mircea](https://lda.data.parliament.uk/terms/419682) | Latin | 0.61 | 2 | `419682` |
| [Lord Murphy of Torfaen](https://lda.data.parliament.uk/terms/421151) | Welsh | 0.61 | 4 | `421151` |
| [KAICIID](https://lda.data.parliament.uk/terms/422658) | Latin | 0.61 | 1 | `422658` |
| [Corbis](https://lda.data.parliament.uk/terms/426199) | Latin | 0.61 | 1 | `426199` |
| [Letslink UK](https://lda.data.parliament.uk/terms/42785) | Dutch | 0.61 | 2 | `42785` |
| [Krasnodebski, Zdzislaw](https://lda.data.parliament.uk/terms/430161) | Welsh | 0.61 | 2 | `430161` |
| [Aldaba](https://lda.data.parliament.uk/terms/431008) | Spanish | 0.61 | 1 | `431008` |
| [BEPE](https://lda.data.parliament.uk/terms/432240) | Dutch | 0.61 | 1 | `432240` |
| [Briant Estates Tenants' Association](https://lda.data.parliament.uk/terms/4337) | French | 0.61 | 4 | `4337` |
| [CRSF](https://lda.data.parliament.uk/terms/433911) | Welsh | 0.61 | 1 | `433911` |
| [Alwadaei, Sayed](https://lda.data.parliament.uk/terms/434570) | Welsh | 0.61 | 2 | `434570` |
| [Sayed Alwadaei](https://lda.data.parliament.uk/terms/434572) | Welsh | 0.61 | 2 | `434572` |
| [Newquay](https://lda.data.parliament.uk/terms/443197) | Welsh | 0.61 | 1 | `443197` |
| [Prosopagnosia](https://lda.data.parliament.uk/terms/443654) | Latin | 0.61 | 1 | `443654` |
| [Portuguese Timor](https://lda.data.parliament.uk/terms/446181) | Portuguese | 0.61 | 2 | `446181` |
| [Gareth Davies](https://lda.data.parliament.uk/terms/452573) | Welsh | 0.61 | 2 | `452573` |
| [Bolshaw, Henry](https://lda.data.parliament.uk/terms/454227) | Welsh | 0.61 | 2 | `454227` |
| [Henry Bolshaw](https://lda.data.parliament.uk/terms/454232) | Welsh | 0.61 | 2 | `454232` |
| [Lendy](https://lda.data.parliament.uk/terms/456607) | Welsh | 0.61 | 1 | `456607` |
| [Irvine Laidlaw](https://lda.data.parliament.uk/terms/463427) | Welsh | 0.61 | 2 | `463427` |
| [Laidlaw, Irvine](https://lda.data.parliament.uk/terms/463429) | Welsh | 0.61 | 2 | `463429` |
| [Guthrie, Charles Ronald Llewelyn](https://lda.data.parliament.uk/terms/464116) | Welsh | 0.61 | 4 | `464116` |
| [Charles Ronald Llewelyn Guthrie](https://lda.data.parliament.uk/terms/464118) | Welsh | 0.61 | 4 | `464118` |
| [Davies, Gareth](https://lda.data.parliament.uk/terms/465150) | Welsh | 0.61 | 2 | `465150` |
| [Levomepromazine](https://lda.data.parliament.uk/terms/466847) | Latin | 0.61 | 1 | `466847` |
| [Kidsgrove](https://lda.data.parliament.uk/terms/468924) | Dutch | 0.61 | 1 | `468924` |
| [Geoghegan Hart, Tao](https://lda.data.parliament.uk/terms/473641) | Irish | 0.61 | 3 | `473641` |
| [Tao Geoghegan Hart](https://lda.data.parliament.uk/terms/473643) | Irish | 0.61 | 3 | `473643` |
| [Grogan, Lily-Mae](https://lda.data.parliament.uk/terms/479471) | Welsh | 0.61 | 2 | `479471` |
| [Lily-Mae Grogan](https://lda.data.parliament.uk/terms/479489) | Welsh | 0.61 | 2 | `479489` |
| [KRW Law](https://lda.data.parliament.uk/terms/482815) | Welsh | 0.61 | 2 | `482815` |
| [Immune thrombocytopenic purpura](https://lda.data.parliament.uk/terms/483633) | Latin | 0.61 | 3 | `483633` |
| [Paddy Hill](https://lda.data.parliament.uk/terms/484226) | Welsh | 0.61 | 2 | `484226` |
| [International Labour Organisation](https://lda.data.parliament.uk/terms/489182) | French | 0.61 | 3 | `489182` |
| [Manidae](https://lda.data.parliament.uk/terms/490646) | Welsh | 0.61 | 1 | `490646` |
| [JFSA](https://lda.data.parliament.uk/terms/491335) | Dutch | 0.61 | 1 | `491335` |
| [Arthur Mountifort Longfield Ponsonby](https://lda.data.parliament.uk/terms/498431) | Welsh | 0.61 | 4 | `498431` |
| [Ponsonby, Arthur Mountifort Longfield](https://lda.data.parliament.uk/terms/498433) | Welsh | 0.61 | 4 | `498433` |
| [Elliptic](https://lda.data.parliament.uk/terms/501919) | Latin | 0.61 | 1 | `501919` |
| [Guglielmo Verdirame](https://lda.data.parliament.uk/terms/507781) | Italian | 0.61 | 2 | `507781` |
| [Wang, Shunping](https://lda.data.parliament.uk/terms/508465) | Dutch | 0.61 | 2 | `508465` |
| [Kalesnikava, Maria](https://lda.data.parliament.uk/terms/509634) | Latin | 0.61 | 2 | `509634` |
| [Maria Kalesnikava](https://lda.data.parliament.uk/terms/509642) | Latin | 0.61 | 2 | `509642` |
| [Knauf](https://lda.data.parliament.uk/terms/513427) | German | 0.61 | 1 | `513427` |
| [HMS Agamemnon](https://lda.data.parliament.uk/terms/513899) | Latin | 0.61 | 2 | `513899` |
| [Helmut Kohl](https://lda.data.parliament.uk/terms/514403) | German | 0.61 | 2 | `514403` |
| [Mulheirn, Ian](https://lda.data.parliament.uk/terms/517542) | Portuguese | 0.61 | 2 | `517542` |
| [Ian Mulheirn](https://lda.data.parliament.uk/terms/517544) | Portuguese | 0.61 | 2 | `517544` |
| [Chicken](https://lda.data.parliament.uk/terms/51936) | German | 0.61 | 1 | `51936` |
| [Mario's Giffnock](https://lda.data.parliament.uk/terms/519610) | Welsh | 0.61 | 2 | `519610` |
| [Age assurance](https://lda.data.parliament.uk/terms/519649) | French | 0.61 | 2 | `519649` |
| [Darnley, Earl](https://lda.data.parliament.uk/terms/522820) | Welsh | 0.61 | 2 | `522820` |
| [AWG plc](https://lda.data.parliament.uk/terms/53937) | Welsh | 0.61 | 2 | `53937` |
| [IBBIS](https://lda.data.parliament.uk/terms/540726) | Italian | 0.61 | 1 | `540726` |
| [Airtours International](https://lda.data.parliament.uk/terms/54469) | French | 0.61 | 2 | `54469` |
| [Schmale, Matthias](https://lda.data.parliament.uk/terms/545656) | German | 0.61 | 2 | `545656` |
| [Matthias Schmale](https://lda.data.parliament.uk/terms/545658) | German | 0.61 | 2 | `545658` |
| [MacNae, Andy](https://lda.data.parliament.uk/terms/546957) | Welsh | 0.61 | 2 | `546957` |
| [Mallaghan, Cathal](https://lda.data.parliament.uk/terms/546976) | Irish | 0.61 | 2 | `546976` |
| [Hatton, Lloyd](https://lda.data.parliament.uk/terms/547039) | Welsh | 0.61 | 2 | `547039` |
| [Andy MacNae](https://lda.data.parliament.uk/terms/547271) | Welsh | 0.61 | 2 | `547271` |
| [Cathal Mallaghan](https://lda.data.parliament.uk/terms/547289) | Irish | 0.61 | 2 | `547289` |
| [Lloyd Hatton](https://lda.data.parliament.uk/terms/547350) | Welsh | 0.61 | 2 | `547350` |
| [Gelderd, Anna](https://lda.data.parliament.uk/terms/548470) | Dutch | 0.61 | 2 | `548470` |
| [Anna Gelderd](https://lda.data.parliament.uk/terms/548473) | Dutch | 0.61 | 2 | `548473` |
| [Horizon convictions redress scheme](https://lda.data.parliament.uk/terms/549036) | French | 0.61 | 4 | `549036` |
| [Chronic lymphocytic leukaemia](https://lda.data.parliament.uk/terms/554886) | Latin | 0.61 | 3 | `554886` |
| [Ancre Somme Association](https://lda.data.parliament.uk/terms/559029) | French | 0.61 | 3 | `559029` |
| [Orla Ni Eadhra](https://lda.data.parliament.uk/terms/567857) | Irish | 0.61 | 3 | `567857` |
| [Ni Eadhra, Orla](https://lda.data.parliament.uk/terms/567859) | Irish | 0.61 | 3 | `567859` |
| [Sara Kathryn Hyde](https://lda.data.parliament.uk/terms/573655) | Welsh | 0.61 | 3 | `573655` |
| [Hyde, Sara Kathryn](https://lda.data.parliament.uk/terms/573659) | Welsh | 0.61 | 3 | `573659` |
| [TimeTwisters](https://lda.data.parliament.uk/terms/576097) | Dutch | 0.61 | 1 | `576097` |
| [Cygnet Texkimp](https://lda.data.parliament.uk/terms/577408) | French | 0.61 | 2 | `577408` |
| [Nederlansche Bank](https://lda.data.parliament.uk/terms/58052) | Dutch | 0.61 | 2 | `58052` |
| [Newchurch](https://lda.data.parliament.uk/terms/58618) | Welsh | 0.61 | 1 | `58618` |
| [Occidental Petroleum](https://lda.data.parliament.uk/terms/60159) | Latin | 0.61 | 2 | `60159` |
| [Perretts Amusements](https://lda.data.parliament.uk/terms/61465) | French | 0.61 | 2 | `61465` |
| [ProVention Consortium](https://lda.data.parliament.uk/terms/62243) | Latin | 0.61 | 2 | `62243` |
| [Royal Air Forces Association](https://lda.data.parliament.uk/terms/66907) | French | 0.61 | 4 | `66907` |
| [Royal Archaeological Institute](https://lda.data.parliament.uk/terms/66914) | Latin | 0.61 | 3 | `66914` |
| [Age Concern Gwynedd a Mon](https://lda.data.parliament.uk/terms/702) | Welsh | 0.61 | 5 | `702` |
| [Snowdonia Gateway](https://lda.data.parliament.uk/terms/70444) | Welsh | 0.61 | 2 | `70444` |
| [CEMACH](https://lda.data.parliament.uk/terms/74109) | German | 0.61 | 1 | `74109` |
| [DHFETE](https://lda.data.parliament.uk/terms/75374) | Irish | 0.61 | 1 | `75374` |
| [GMPTA](https://lda.data.parliament.uk/terms/76209) | Latin | 0.61 | 1 | `76209` |
| [HLPR](https://lda.data.parliament.uk/terms/76636) | German | 0.61 | 1 | `76636` |
| [HMT](https://lda.data.parliament.uk/terms/76683) | German | 0.61 | 1 | `76683` |
| [EDPS](https://lda.data.parliament.uk/terms/77206) | Latin | 0.61 | 1 | `77206` |
| [EIGT](https://lda.data.parliament.uk/terms/77281) | German | 0.61 | 1 | `77281` |
| [Employers Organisation](https://lda.data.parliament.uk/terms/77345) | French | 0.61 | 2 | `77345` |
| [IntellectUK](https://lda.data.parliament.uk/terms/77847) | Latin | 0.61 | 1 | `77847` |
| [IPSET](https://lda.data.parliament.uk/terms/78011) | Latin | 0.61 | 1 | `78011` |
| [SWOV](https://lda.data.parliament.uk/terms/82412) | Italian | 0.61 | 1 | `82412` |
| [Beryllium](https://lda.data.parliament.uk/terms/8639) | Latin | 0.61 | 1 | `8639` |
| [Caddia](https://lda.data.parliament.uk/terms/8911) | Welsh | 0.61 | 1 | `8911` |
| [Buddhism](https://lda.data.parliament.uk/terms/90387) | Latin | 0.61 | 1 | `90387` |
| [Ceredigion and Pembroke North](https://lda.data.parliament.uk/terms/9053) | Welsh | 0.61 | 4 | `9053` |
| [Personnel management](https://lda.data.parliament.uk/terms/92429) | French | 0.61 | 2 | `92429` |
| [Telecommunications cables](https://lda.data.parliament.uk/terms/93224) | French | 0.61 | 2 | `93224` |
| [Connexions Card](https://lda.data.parliament.uk/terms/9340) | French | 0.61 | 2 | `9340` |
| [MRG](https://lda.data.parliament.uk/terms/96096) | Welsh | 0.61 | 1 | `96096` |
| [NAHT](https://lda.data.parliament.uk/terms/96209) | German | 0.61 | 1 | `96209` |
| [National CJD Surveillance Unit](https://lda.data.parliament.uk/terms/96375) | French | 0.61 | 4 | `96375` |
| [NAWRAM](https://lda.data.parliament.uk/terms/96575) | Welsh | 0.61 | 1 | `96575` |
| [Jobfinder programme](https://lda.data.parliament.uk/terms/11108) | German | 0.6 | 2 | `11108` |
| [Matthaeus programme](https://lda.data.parliament.uk/terms/11570) | Latin | 0.6 | 2 | `11570` |
| [Pigmeat](https://lda.data.parliament.uk/terms/12144) | Latin | 0.6 | 1 | `12144` |
| [Romania](https://lda.data.parliament.uk/terms/12554) | Latin | 0.6 | 1 | `12554` |
| [Ecclesiastical Committee](https://lda.data.parliament.uk/terms/17055) | Latin | 0.6 | 2 | `17055` |
| [Calortex](https://lda.data.parliament.uk/terms/18484) | Latin | 0.6 | 1 | `18484` |
| [CaritasData](https://lda.data.parliament.uk/terms/19047) | Latin | 0.6 | 1 | `19047` |
| [Conservatoires UK](https://lda.data.parliament.uk/terms/21161) | French | 0.6 | 2 | `21161` |
| [Imerys](https://lda.data.parliament.uk/terms/26425) | Welsh | 0.6 | 1 | `26425` |
| [Danmarks Statistik](https://lda.data.parliament.uk/terms/28268) | German | 0.6 | 2 | `28268` |
| [Bitumens](https://lda.data.parliament.uk/terms/286801) | Latin | 0.6 | 1 | `286801` |
| [Kurier](https://lda.data.parliament.uk/terms/28855) | German | 0.6 | 1 | `28855` |
| [Hariri, Rafiq](https://lda.data.parliament.uk/terms/291571) | French | 0.6 | 2 | `291571` |
| [Arlacchi, Pino](https://lda.data.parliament.uk/terms/298905) | Italian | 0.6 | 2 | `298905` |
| [Brinkhorst, Laurens Jan](https://lda.data.parliament.uk/terms/299366) | Dutch | 0.6 | 3 | `299366` |
| [Castricum, Frits](https://lda.data.parliament.uk/terms/299631) | Latin | 0.6 | 2 | `299631` |
| [Del Turco, Ottaviano](https://lda.data.parliament.uk/terms/300127) | Italian | 0.6 | 3 | `300127` |
| [Della Briotta, L](https://lda.data.parliament.uk/terms/300133) | Italian | 0.6 | 3 | `300133` |
| [Fiori, Francesco](https://lda.data.parliament.uk/terms/300512) | Italian | 0.6 | 2 | `300512` |
| [Hasse Ferreira, Joel](https://lda.data.parliament.uk/terms/301104) | Portuguese | 0.6 | 3 | `301104` |
| [Heddle, John](https://lda.data.parliament.uk/terms/301146) | Welsh | 0.6 | 2 | `301146` |
| [Lloyd, Stephen](https://lda.data.parliament.uk/terms/301944) | Welsh | 0.6 | 2 | `301944` |
| [Morgan, Eluned](https://lda.data.parliament.uk/terms/302490) | Welsh | 0.6 | 2 | `302490` |
| [Papapietro, Giovanni](https://lda.data.parliament.uk/terms/302844) | Italian | 0.6 | 2 | `302844` |
| [Queiro, Luis](https://lda.data.parliament.uk/terms/303091) | Portuguese | 0.6 | 2 | `303091` |
| [Ross, Alastair](https://lda.data.parliament.uk/terms/303318) | Irish | 0.6 | 2 | `303318` |
| [Thomas, Rhodri Glyn](https://lda.data.parliament.uk/terms/303979) | Welsh | 0.6 | 3 | `303979` |
| [Verbeek, Herman](https://lda.data.parliament.uk/terms/304191) | Dutch | 0.6 | 2 | `304191` |
| [Verwaerde, Yves](https://lda.data.parliament.uk/terms/304204) | Dutch | 0.6 | 2 | `304204` |
| [Wood, Timothy](https://lda.data.parliament.uk/terms/304476) | Welsh | 0.6 | 2 | `304476` |
| [Brinkhorst,Laurens Jan](https://lda.data.parliament.uk/terms/307520) | Dutch | 0.6 | 2 | `307520` |
| [Castricum,Frits](https://lda.data.parliament.uk/terms/308740) | Latin | 0.6 | 1 | `308740` |
| [Chair of NIGC](https://lda.data.parliament.uk/terms/308816) | Irish | 0.6 | 3 | `308816` |
| [Della Briotta,L](https://lda.data.parliament.uk/terms/310812) | Italian | 0.6 | 2 | `310812` |
| [Fiori,Francesco](https://lda.data.parliament.uk/terms/312314) | Italian | 0.6 | 1 | `312314` |
| [Stephen Lloyd](https://lda.data.parliament.uk/terms/318735) | Welsh | 0.6 | 2 | `318735` |
| [Morgan,Eluned](https://lda.data.parliament.uk/terms/321354) | Welsh | 0.6 | 1 | `321354` |
| [Alastair Ross](https://lda.data.parliament.uk/terms/324696) | Irish | 0.6 | 2 | `324696` |
| [Earthfall](https://lda.data.parliament.uk/terms/32832) | Welsh | 0.6 | 1 | `32832` |
| [Fosg](https://lda.data.parliament.uk/terms/346067) | Welsh | 0.6 | 1 | `346067` |
| [Enciu, Ioan](https://lda.data.parliament.uk/terms/347469) | Latin | 0.6 | 2 | `347469` |
| [Coalition Information Centre](https://lda.data.parliament.uk/terms/352044) | French | 0.6 | 3 | `352044` |
| [Help the Aged Cymru](https://lda.data.parliament.uk/terms/35967) | Welsh | 0.6 | 4 | `35967` |
| [Hagamos Democracia](https://lda.data.parliament.uk/terms/36221) | Spanish | 0.6 | 2 | `36221` |
| [Congo Brazzaville](https://lda.data.parliament.uk/terms/363342) | French | 0.6 | 2 | `363342` |
| [Graham Brabyn](https://lda.data.parliament.uk/terms/36882) | Welsh | 0.6 | 2 | `36882` |
| [Ansaru](https://lda.data.parliament.uk/terms/369970) | Latin | 0.6 | 1 | `369970` |
| [Institut fur Europaische Politik](https://lda.data.parliament.uk/terms/395094) | German | 0.6 | 4 | `395094` |
| [National Private Tenants Organisation](https://lda.data.parliament.uk/terms/397444) | French | 0.6 | 4 | `397444` |
| [Bostinaru, Victor](https://lda.data.parliament.uk/terms/397688) | Latin | 0.6 | 2 | `397688` |
| [Parlament de Catalunya](https://lda.data.parliament.uk/terms/397730) | Spanish | 0.6 | 3 | `397730` |
| [DairyCo](https://lda.data.parliament.uk/terms/401378) | Welsh | 0.6 | 1 | `401378` |
| [Terumo BCT](https://lda.data.parliament.uk/terms/402494) | Latin | 0.6 | 2 | `402494` |
| [John Heddle](https://lda.data.parliament.uk/terms/412604) | Welsh | 0.6 | 2 | `412604` |
| [Mosca, Alessia Maria](https://lda.data.parliament.uk/terms/417493) | Italian | 0.6 | 3 | `417493` |
| [Neonicotinoids](https://lda.data.parliament.uk/terms/417873) | Latin | 0.6 | 1 | `417873` |
| [Hypothyreosis](https://lda.data.parliament.uk/terms/420949) | Latin | 0.6 | 1 | `420949` |
| [Taxotere](https://lda.data.parliament.uk/terms/422030) | Latin | 0.6 | 1 | `422030` |
| [CAGE (organisation)](https://lda.data.parliament.uk/terms/423150) | French | 0.6 | 2 | `423150` |
| [Navami, Shravan Krishna](https://lda.data.parliament.uk/terms/427215) | Welsh | 0.6 | 3 | `427215` |
| [L'Espresso](https://lda.data.parliament.uk/terms/42775) | Italian | 0.6 | 1 | `42775` |
| [Myalgic encephalopathy](https://lda.data.parliament.uk/terms/435259) | Latin | 0.6 | 2 | `435259` |
| [Ecole nationale des ponts et chaussees](https://lda.data.parliament.uk/terms/436788) | French | 0.6 | 6 | `436788` |
| [DAERA](https://lda.data.parliament.uk/terms/440072) | Latin | 0.6 | 1 | `440072` |
| [Mannesmann](https://lda.data.parliament.uk/terms/44147) | Latin | 0.6 | 1 | `44147` |
| [ISSB](https://lda.data.parliament.uk/terms/443605) | German | 0.6 | 1 | `443605` |
| [PFP](https://lda.data.parliament.uk/terms/445588) | German | 0.6 | 1 | `445588` |
| [Glendyne, Lord](https://lda.data.parliament.uk/terms/447058) | Welsh | 0.6 | 2 | `447058` |
| [Lord Glendyne](https://lda.data.parliament.uk/terms/447060) | Welsh | 0.6 | 2 | `447060` |
| [Xanax](https://lda.data.parliament.uk/terms/449625) | Latin | 0.6 | 1 | `449625` |
| [Imagile Infrastructure Management](https://lda.data.parliament.uk/terms/456298) | French | 0.6 | 3 | `456298` |
| [Law, Rupert Edward Henry](https://lda.data.parliament.uk/terms/460667) | Welsh | 0.6 | 4 | `460667` |
| [Rupert Edward Henry Law](https://lda.data.parliament.uk/terms/460669) | Welsh | 0.6 | 4 | `460669` |
| [Conservation covenants](https://lda.data.parliament.uk/terms/466875) | French | 0.6 | 2 | `466875` |
| [Mycoplasma genitalium](https://lda.data.parliament.uk/terms/466914) | Latin | 0.6 | 2 | `466914` |
| [Ratana, Matiu](https://lda.data.parliament.uk/terms/472202) | Latin | 0.6 | 2 | `472202` |
| [Matiu Ratana](https://lda.data.parliament.uk/terms/472206) | Latin | 0.6 | 2 | `472206` |
| [FHI](https://lda.data.parliament.uk/terms/473041) | Irish | 0.6 | 1 | `473041` |
| [Kenneth Wlliam Wedderburn](https://lda.data.parliament.uk/terms/475898) | Welsh | 0.6 | 3 | `475898` |
| [Refuweegee](https://lda.data.parliament.uk/terms/476559) | Latin | 0.6 | 1 | `476559` |
| [OmniGOV @ MG OMD](https://lda.data.parliament.uk/terms/477891) | Welsh | 0.6 | 4 | `477891` |
| [Garda Siochana](https://lda.data.parliament.uk/terms/485780) | Irish | 0.6 | 2 | `485780` |
| [Appellate Jurisdiction Act 1876](https://lda.data.parliament.uk/terms/487619) | Latin | 0.6 | 4 | `487619` |
| [DLUHC](https://lda.data.parliament.uk/terms/488567) | German | 0.6 | 1 | `488567` |
| [McNamara, Caitlin](https://lda.data.parliament.uk/terms/491086) | Irish | 0.6 | 2 | `491086` |
| [Caitlin McNamara](https://lda.data.parliament.uk/terms/491092) | Irish | 0.6 | 2 | `491092` |
| [RAF St Mawgan](https://lda.data.parliament.uk/terms/494725) | Welsh | 0.6 | 3 | `494725` |
| [VEB](https://lda.data.parliament.uk/terms/495828) | Latin | 0.6 | 1 | `495828` |
| [William Michael Anthony Cecil](https://lda.data.parliament.uk/terms/500260) | Welsh | 0.6 | 4 | `500260` |
| [Globalisation](https://lda.data.parliament.uk/terms/50030) | French | 0.6 | 1 | `50030` |
| [Penderyn Distillery](https://lda.data.parliament.uk/terms/501290) | Welsh | 0.6 | 2 | `501290` |
| [Lloyd-George, Owen](https://lda.data.parliament.uk/terms/503993) | Welsh | 0.6 | 2 | `503993` |
| [Lloyd George, Owen](https://lda.data.parliament.uk/terms/503995) | Welsh | 0.6 | 3 | `503995` |
| [Owen Lloyd George](https://lda.data.parliament.uk/terms/503997) | Welsh | 0.6 | 3 | `503997` |
| [Owen Lloyd-George](https://lda.data.parliament.uk/terms/503999) | Welsh | 0.6 | 2 | `503999` |
| [National curriculum](https://lda.data.parliament.uk/terms/50498) | Latin | 0.6 | 2 | `50498` |
| [Bathgate](https://lda.data.parliament.uk/terms/509022) | Welsh | 0.6 | 1 | `509022` |
| [Premier Textiles](https://lda.data.parliament.uk/terms/510924) | French | 0.6 | 2 | `510924` |
| [FGS](https://lda.data.parliament.uk/terms/514361) | German | 0.6 | 1 | `514361` |
| [HTQ](https://lda.data.parliament.uk/terms/517713) | Latin | 0.6 | 1 | `517713` |
| [Congo (Brazzaville)](https://lda.data.parliament.uk/terms/52013) | French | 0.6 | 2 | `52013` |
| [Villavicencio, Fernando](https://lda.data.parliament.uk/terms/520432) | Spanish | 0.6 | 2 | `520432` |
| [Fernando Villavicencio](https://lda.data.parliament.uk/terms/520434) | Spanish | 0.6 | 2 | `520434` |
| [Peterson, Eric Laurentius](https://lda.data.parliament.uk/terms/520597) | Latin | 0.6 | 3 | `520597` |
| [Eric Laurentius Peterson](https://lda.data.parliament.uk/terms/520599) | Latin | 0.6 | 3 | `520599` |
| [Laurentius Peterson, Eric](https://lda.data.parliament.uk/terms/520601) | Latin | 0.6 | 3 | `520601` |
| [Ibadoghlu, Gubad](https://lda.data.parliament.uk/terms/523161) | Welsh | 0.6 | 2 | `523161` |
| [Gubad Ibadoghlu](https://lda.data.parliament.uk/terms/523163) | Welsh | 0.6 | 2 | `523163` |
| [Axial spondyloarthritis](https://lda.data.parliament.uk/terms/523515) | Latin | 0.6 | 2 | `523515` |
| [Woodsure](https://lda.data.parliament.uk/terms/524337) | Dutch | 0.6 | 1 | `524337` |
| [AERALIS](https://lda.data.parliament.uk/terms/525785) | Latin | 0.6 | 1 | `525785` |
| [Lewin Gregory](https://lda.data.parliament.uk/terms/526491) | Welsh | 0.6 | 2 | `526491` |
| [Ezetimibe](https://lda.data.parliament.uk/terms/529338) | Latin | 0.6 | 1 | `529338` |
| [BHS](https://lda.data.parliament.uk/terms/54244) | Irish | 0.6 | 1 | `54244` |
| [ALBSU](https://lda.data.parliament.uk/terms/54493) | German | 0.6 | 1 | `54493` |
| [Dolutegravir](https://lda.data.parliament.uk/terms/550666) | Latin | 0.6 | 1 | `550666` |
| [Borgo Egnazia](https://lda.data.parliament.uk/terms/550999) | Italian | 0.6 | 2 | `550999` |
| [Prescoed Prison](https://lda.data.parliament.uk/terms/554876) | Welsh | 0.6 | 2 | `554876` |
| [HMYOI Low Newton](https://lda.data.parliament.uk/terms/555377) | Welsh | 0.6 | 3 | `555377` |
| [La Caisse](https://lda.data.parliament.uk/terms/564411) | French | 0.6 | 2 | `564411` |
| [Williams, Anthony](https://lda.data.parliament.uk/terms/568427) | Welsh | 0.6 | 2 | `568427` |
| [Anthony Williams](https://lda.data.parliament.uk/terms/568429) | Welsh | 0.6 | 2 | `568429` |
| [Nama, Radhi](https://lda.data.parliament.uk/terms/569812) | Irish | 0.6 | 2 | `569812` |
| [Radhi Nama](https://lda.data.parliament.uk/terms/569814) | Irish | 0.6 | 2 | `569814` |
| [Bathgate Academy](https://lda.data.parliament.uk/terms/572908) | Welsh | 0.6 | 2 | `572908` |
| [Maximus UK](https://lda.data.parliament.uk/terms/573013) | Latin | 0.6 | 2 | `573013` |
| [Montupet](https://lda.data.parliament.uk/terms/57372) | Latin | 0.6 | 1 | `57372` |
| [Ocular toxoplasmosis](https://lda.data.parliament.uk/terms/578245) | Latin | 0.6 | 2 | `578245` |
| [PHRAA](https://lda.data.parliament.uk/terms/581878) | Dutch | 0.6 | 1 | `581878` |
| [Nonsuch Watch](https://lda.data.parliament.uk/terms/58933) | German | 0.6 | 2 | `58933` |
| [Parthian](https://lda.data.parliament.uk/terms/61132) | Welsh | 0.6 | 1 | `61132` |
| [Powys Dance](https://lda.data.parliament.uk/terms/61782) | Welsh | 0.6 | 2 | `61782` |
| [Quantum Care](https://lda.data.parliament.uk/terms/65617) | Latin | 0.6 | 2 | `65617` |
| [Routiers](https://lda.data.parliament.uk/terms/66875) | French | 0.6 | 1 | `66875` |
| [CEMD](https://lda.data.parliament.uk/terms/74110) | Dutch | 0.6 | 1 | `74110` |
| [Centre on International Race Relations](https://lda.data.parliament.uk/terms/74180) | French | 0.6 | 5 | `74180` |
| [DPRRC](https://lda.data.parliament.uk/terms/76930) | German | 0.6 | 1 | `76930` |
| [DVLNI](https://lda.data.parliament.uk/terms/77007) | Dutch | 0.6 | 1 | `77007` |
| [e Envoy](https://lda.data.parliament.uk/terms/77023) | French | 0.6 | 2 | `77023` |
| [e-Envoy](https://lda.data.parliament.uk/terms/77233) | French | 0.6 | 1 | `77233` |
| [ICTP](https://lda.data.parliament.uk/terms/77529) | Latin | 0.6 | 1 | `77529` |
| [KCMHR](https://lda.data.parliament.uk/terms/78282) | Welsh | 0.6 | 1 | `78282` |
| [LAWGASB](https://lda.data.parliament.uk/terms/78432) | Welsh | 0.6 | 1 | `78432` |
| [LBS](https://lda.data.parliament.uk/terms/78441) | German | 0.6 | 1 | `78441` |
| [LCCSPG](https://lda.data.parliament.uk/terms/78446) | Portuguese | 0.6 | 1 | `78446` |
| [MACC](https://lda.data.parliament.uk/terms/79015) | Italian | 0.6 | 1 | `79015` |
| [Sunuser](https://lda.data.parliament.uk/terms/82128) | German | 0.6 | 1 | `82128` |
| [Ammonium nitrate](https://lda.data.parliament.uk/terms/8337) | Latin | 0.6 | 2 | `8337` |
| [Antarctic](https://lda.data.parliament.uk/terms/8361) | Latin | 0.6 | 1 | `8361` |
| [Travant](https://lda.data.parliament.uk/terms/84084) | French | 0.6 | 1 | `84084` |
| [TrustUK](https://lda.data.parliament.uk/terms/84227) | Dutch | 0.6 | 1 | `84227` |
| [Bassetlaw](https://lda.data.parliament.uk/terms/8567) | Welsh | 0.6 | 1 | `8567` |
| [Beer](https://lda.data.parliament.uk/terms/8601) | Dutch | 0.6 | 1 | `8601` |
| [Zacchaeus Trust](https://lda.data.parliament.uk/terms/86921) | Latin | 0.6 | 2 | `86921` |
| [Bosworth](https://lda.data.parliament.uk/terms/8748) | Welsh | 0.6 | 1 | `8748` |
| [Bundestag](https://lda.data.parliament.uk/terms/8881) | German | 0.6 | 1 | `8881` |
| [Archaeological sites](https://lda.data.parliament.uk/terms/90241) | Latin | 0.6 | 2 | `90241` |
| [Constitutions](https://lda.data.parliament.uk/terms/90692) | French | 0.6 | 1 | `90692` |
| [Gazetteers](https://lda.data.parliament.uk/terms/91400) | Dutch | 0.6 | 1 | `91400` |
| [Wendelin](https://lda.data.parliament.uk/terms/94333) | Dutch | 0.6 | 1 | `94333` |
| [West German Bundesrat](https://lda.data.parliament.uk/terms/94399) | German | 0.6 | 3 | `94399` |
| [Deanery synods](https://lda.data.parliament.uk/terms/9579) | Welsh | 0.6 | 2 | `9579` |
| [NACEDP](https://lda.data.parliament.uk/terms/96176) | Latin | 0.6 | 1 | `96176` |
| [NAHTW](https://lda.data.parliament.uk/terms/96211) | German | 0.6 | 1 | `96211` |
| [Guam](https://lda.data.parliament.uk/terms/10555) | Latin | 0.59 | 1 | `10555` |
| [Haemophilia](https://lda.data.parliament.uk/terms/10588) | Latin | 0.59 | 1 | `10588` |
| [ISAF](https://lda.data.parliament.uk/terms/11057) | Welsh | 0.59 | 1 | `11057` |
| [Epoq Group](https://lda.data.parliament.uk/terms/18046) | French | 0.59 | 2 | `18046` |
| [CACI](https://lda.data.parliament.uk/terms/18392) | Spanish | 0.59 | 1 | `18392` |
| [Ceredigion County Council](https://lda.data.parliament.uk/terms/19934) | Welsh | 0.59 | 3 | `19934` |
| [Construction Clients' Group](https://lda.data.parliament.uk/terms/21223) | French | 0.59 | 3 | `21223` |
| [Association Jean Monnet](https://lda.data.parliament.uk/terms/2251) | French | 0.59 | 3 | `2251` |
| [Association of Professional Ambulance Personnel](https://lda.data.parliament.uk/terms/2565) | French | 0.59 | 5 | `2565` |
| [Iwth Pen](https://lda.data.parliament.uk/terms/285856) | Welsh | 0.59 | 2 | `285856` |
| [Deutsche Borse](https://lda.data.parliament.uk/terms/28942) | German | 0.59 | 2 | `28942` |
| [Helsey, Melvyn](https://lda.data.parliament.uk/terms/294041) | Welsh | 0.59 | 2 | `294041` |
| [Roberts, Nerys](https://lda.data.parliament.uk/terms/294227) | Welsh | 0.59 | 2 | `294227` |
| [Melvyn Helsey](https://lda.data.parliament.uk/terms/294679) | Welsh | 0.59 | 2 | `294679` |
| [Nerys Roberts](https://lda.data.parliament.uk/terms/294740) | Welsh | 0.59 | 2 | `294740` |
| [Antinoro, Antonello](https://lda.data.parliament.uk/terms/298886) | Italian | 0.59 | 2 | `298886` |
| [Baget Bozzo, Gianni](https://lda.data.parliament.uk/terms/298979) | Italian | 0.59 | 3 | `298979` |
| [Cercas, Alejandro](https://lda.data.parliament.uk/terms/299650) | Spanish | 0.59 | 2 | `299650` |
| [Cozzolino, Andrea](https://lda.data.parliament.uk/terms/299909) | Italian | 0.59 | 2 | `299909` |
| [Dahrendorf, Lord](https://lda.data.parliament.uk/terms/299996) | German | 0.59 | 2 | `299996` |
| [Dell'Alba, Gianfranco](https://lda.data.parliament.uk/terms/300135) | Italian | 0.59 | 2 | `300135` |
| [Fantuzzi, Giulio](https://lda.data.parliament.uk/terms/300443) | Italian | 0.59 | 2 | `300443` |
| [Formigoni, Roberto](https://lda.data.parliament.uk/terms/300558) | Italian | 0.59 | 2 | `300558` |
| [Fyfe, Maria](https://lda.data.parliament.uk/terms/300637) | Welsh | 0.59 | 2 | `300637` |
| [Geurtsen, A](https://lda.data.parliament.uk/terms/300718) | Dutch | 0.59 | 2 | `300718` |
| [Gklavakis, Ioannis](https://lda.data.parliament.uk/terms/300761) | Latin | 0.59 | 2 | `300761` |
| [Griffiths, Nigel](https://lda.data.parliament.uk/terms/300933) | Welsh | 0.59 | 2 | `300933` |
| [Griffiths, Winston](https://lda.data.parliament.uk/terms/300937) | Welsh | 0.59 | 2 | `300937` |
| [Henry, Hugh](https://lda.data.parliament.uk/terms/301172) | Welsh | 0.59 | 2 | `301172` |
| [Kindermann, Heinz](https://lda.data.parliament.uk/terms/301628) | German | 0.59 | 2 | `301628` |
| [Kolokotronis, Spiridon](https://lda.data.parliament.uk/terms/301690) | Latin | 0.59 | 2 | `301690` |
| [Letta, Enrico](https://lda.data.parliament.uk/terms/301873) | Italian | 0.59 | 2 | `301873` |
| [McCarthy, Kerry](https://lda.data.parliament.uk/terms/302237) | Welsh | 0.59 | 2 | `302237` |
| [Merlyn-Rees, Lord](https://lda.data.parliament.uk/terms/302371) | Welsh | 0.59 | 2 | `302371` |
| [Moffatt, Laura](https://lda.data.parliament.uk/terms/302436) | Italian | 0.59 | 2 | `302436` |
| [Snelgrove, Anne](https://lda.data.parliament.uk/terms/303669) | Dutch | 0.59 | 2 | `303669` |
| [Souchet, Dominique](https://lda.data.parliament.uk/terms/303691) | French | 0.59 | 2 | `303691` |
| [Boogerd-Quaak, Johanna](https://lda.data.parliament.uk/terms/306977) | Dutch | 0.59 | 2 | `306977` |
| [Boogerd-Quaak,Johanna](https://lda.data.parliament.uk/terms/306980) | Dutch | 0.59 | 1 | `306980` |
| [Cercas,Alejandro](https://lda.data.parliament.uk/terms/308796) | Spanish | 0.59 | 1 | `308796` |
| [Dell'Alba,Gianfranco](https://lda.data.parliament.uk/terms/310820) | Italian | 0.59 | 1 | `310820` |
| [Fantuzzi,Giulio](https://lda.data.parliament.uk/terms/312110) | Italian | 0.59 | 1 | `312110` |
| [Formigoni,Roberto](https://lda.data.parliament.uk/terms/312544) | Italian | 0.59 | 1 | `312544` |
| [Geurtsen,A](https://lda.data.parliament.uk/terms/313256) | Dutch | 0.59 | 1 | `313256` |
| [Nigel Griffiths](https://lda.data.parliament.uk/terms/313998) | Welsh | 0.59 | 2 | `313998` |
| [Hugh Henry](https://lda.data.parliament.uk/terms/315096) | Welsh | 0.59 | 2 | `315096` |
| [Kindermann,Heinz](https://lda.data.parliament.uk/terms/317450) | German | 0.59 | 1 | `317450` |
| [Kolokotronis,Spiridon](https://lda.data.parliament.uk/terms/317748) | Latin | 0.59 | 1 | `317748` |
| [Laura Moffatt](https://lda.data.parliament.uk/terms/321140) | Italian | 0.59 | 2 | `321140` |
| [Fabian Globalisation Group](https://lda.data.parliament.uk/terms/33781) | French | 0.59 | 3 | `33781` |
| [Blencathra, Lord](https://lda.data.parliament.uk/terms/347569) | Welsh | 0.59 | 2 | `347569` |
| [NatCen](https://lda.data.parliament.uk/terms/350930) | Italian | 0.59 | 1 | `350930` |
| [Hakluyt](https://lda.data.parliament.uk/terms/35400) | Latin | 0.59 | 1 | `35400` |
| [Angola Action Group](https://lda.data.parliament.uk/terms/361621) | French | 0.59 | 3 | `361621` |
| [Becker, Heinz K](https://lda.data.parliament.uk/terms/366779) | German | 0.59 | 3 | `366779` |
| [Jaakonsaari, Liisa](https://lda.data.parliament.uk/terms/367027) | Latin | 0.59 | 2 | `367027` |
| [International Air Transport Association](https://lda.data.parliament.uk/terms/37369) | French | 0.59 | 4 | `37369` |
| [Ecclesiastical Courts Jurisdiction Act 1860](https://lda.data.parliament.uk/terms/378423) | Latin | 0.59 | 5 | `378423` |
| [Employers' Organisations Bill 1994/95](https://lda.data.parliament.uk/terms/378562) | French | 0.59 | 4 | `378562` |
| [Invensys](https://lda.data.parliament.uk/terms/37899) | Latin | 0.59 | 1 | `37899` |
| [Incitement to Disaffection Act 1934](https://lda.data.parliament.uk/terms/383070) | French | 0.59 | 5 | `383070` |
| [Tudur Owen Roberts Glynne](https://lda.data.parliament.uk/terms/395272) | Welsh | 0.59 | 4 | `395272` |
| [Meszaros, Alajos](https://lda.data.parliament.uk/terms/396547) | Spanish | 0.59 | 2 | `396547` |
| [Duisenberg, Willem Frederik](https://lda.data.parliament.uk/terms/396720) | Dutch | 0.59 | 3 | `396720` |
| [Pannella, Marco](https://lda.data.parliament.uk/terms/396840) | Italian | 0.59 | 2 | `396840` |
| [QuickQuid](https://lda.data.parliament.uk/terms/397839) | German | 0.59 | 1 | `397839` |
| [Lord Blencathra](https://lda.data.parliament.uk/terms/398762) | Welsh | 0.59 | 2 | `398762` |
| [Kerry McCarthy](https://lda.data.parliament.uk/terms/401970) | Welsh | 0.59 | 2 | `401970` |
| [Nuance Communications](https://lda.data.parliament.uk/terms/402884) | French | 0.59 | 2 | `402884` |
| [Weidenholzer, Josef](https://lda.data.parliament.uk/terms/403309) | German | 0.59 | 2 | `403309` |
| [Lord Dahrendorf](https://lda.data.parliament.uk/terms/407233) | German | 0.59 | 2 | `407233` |
| [Lord Merlyn-Rees](https://lda.data.parliament.uk/terms/407511) | Welsh | 0.59 | 2 | `407511` |
| [Anne Snelgrove](https://lda.data.parliament.uk/terms/408498) | Dutch | 0.59 | 2 | `408498` |
| [Winston Griffiths](https://lda.data.parliament.uk/terms/408704) | Welsh | 0.59 | 2 | `408704` |
| [Maria Fyfe](https://lda.data.parliament.uk/terms/409170) | Welsh | 0.59 | 2 | `409170` |
| [Iosis](https://lda.data.parliament.uk/terms/41000) | Latin | 0.59 | 1 | `41000` |
| [Islam in Africa Organisation](https://lda.data.parliament.uk/terms/41161) | French | 0.59 | 4 | `41161` |
| [Der Kurier](https://lda.data.parliament.uk/terms/414257) | German | 0.59 | 2 | `414257` |
| [JIPDEC](https://lda.data.parliament.uk/terms/41430) | Latin | 0.59 | 1 | `41430` |
| [Pedicini, Piernicola](https://lda.data.parliament.uk/terms/417475) | Latin | 0.59 | 2 | `417475` |
| [Penicillin](https://lda.data.parliament.uk/terms/429806) | Latin | 0.59 | 1 | `429806` |
| [Thorium](https://lda.data.parliament.uk/terms/430967) | Latin | 0.59 | 1 | `430967` |
| [Grapini, Maria](https://lda.data.parliament.uk/terms/434016) | Latin | 0.59 | 2 | `434016` |
| [London Consultants Association](https://lda.data.parliament.uk/terms/43442) | French | 0.59 | 3 | `43442` |
| [Jones, Kirsty](https://lda.data.parliament.uk/terms/435006) | Welsh | 0.59 | 2 | `435006` |
| [Kirsty Jones](https://lda.data.parliament.uk/terms/435008) | Welsh | 0.59 | 2 | `435008` |
| [Fair Finance](https://lda.data.parliament.uk/terms/437112) | French | 0.59 | 2 | `437112` |
| [CREID](https://lda.data.parliament.uk/terms/439593) | Irish | 0.59 | 1 | `439593` |
| [IUAPPA](https://lda.data.parliament.uk/terms/443057) | Italian | 0.59 | 1 | `443057` |
| [Intertek](https://lda.data.parliament.uk/terms/446393) | Dutch | 0.59 | 1 | `446393` |
| [National Association of Arts Centres](https://lda.data.parliament.uk/terms/44643) | French | 0.59 | 5 | `44643` |
| [Endoscopic thoracic sympathectomy](https://lda.data.parliament.uk/terms/447727) | Latin | 0.59 | 3 | `447727` |
| [Liu, Xia](https://lda.data.parliament.uk/terms/448242) | Latin | 0.59 | 2 | `448242` |
| [Liu Xia](https://lda.data.parliament.uk/terms/448268) | Latin | 0.59 | 2 | `448268` |
| [KIPF](https://lda.data.parliament.uk/terms/449480) | German | 0.59 | 1 | `449480` |
| [Cadwalladr, Carole](https://lda.data.parliament.uk/terms/450993) | Welsh | 0.59 | 2 | `450993` |
| [Carole Cadwalladr](https://lda.data.parliament.uk/terms/450995) | Welsh | 0.59 | 2 | `450995` |
| [NNPCF](https://lda.data.parliament.uk/terms/451129) | French | 0.59 | 1 | `451129` |
| [Dahbour, Ibrahim](https://lda.data.parliament.uk/terms/453425) | French | 0.59 | 2 | `453425` |
| [Ibrahim Dahbour](https://lda.data.parliament.uk/terms/453427) | French | 0.59 | 2 | `453427` |
| [Myopia](https://lda.data.parliament.uk/terms/454745) | Latin | 0.59 | 1 | `454745` |
| [Hippopotamus](https://lda.data.parliament.uk/terms/454961) | Latin | 0.59 | 1 | `454961` |
| [Flynn, Stephen](https://lda.data.parliament.uk/terms/464935) | Welsh | 0.59 | 2 | `464935` |
| [Stephen Flynn](https://lda.data.parliament.uk/terms/465270) | Welsh | 0.59 | 2 | `465270` |
| [Griffith, Andrew](https://lda.data.parliament.uk/terms/465568) | Welsh | 0.59 | 2 | `465568` |
| [Andrew Griffith](https://lda.data.parliament.uk/terms/465570) | Welsh | 0.59 | 2 | `465570` |
| [Dawson, Katelyn](https://lda.data.parliament.uk/terms/466122) | Welsh | 0.59 | 2 | `466122` |
| [Katelyn Dawson](https://lda.data.parliament.uk/terms/466124) | Welsh | 0.59 | 2 | `466124` |
| [Fellata](https://lda.data.parliament.uk/terms/466572) | Latin | 0.59 | 1 | `466572` |
| [Azithromycin](https://lda.data.parliament.uk/terms/468858) | Latin | 0.59 | 1 | `468858` |
| [Vaillant Group](https://lda.data.parliament.uk/terms/479574) | French | 0.59 | 2 | `479574` |
| [EFEE](https://lda.data.parliament.uk/terms/485177) | Dutch | 0.59 | 1 | `485177` |
| [Bochasanwasi Shri Akshar Purushottam Swaminarayan Sanstha](https://lda.data.parliament.uk/terms/485755) | Latin | 0.59 | 6 | `485755` |
| [Cadet Vocational Qualification Organisation](https://lda.data.parliament.uk/terms/487534) | French | 0.59 | 4 | `487534` |
| [CTCRM Lympstone](https://lda.data.parliament.uk/terms/490686) | Latin | 0.59 | 2 | `490686` |
| [RAF Fairford](https://lda.data.parliament.uk/terms/494707) | Welsh | 0.59 | 2 | `494707` |
| [Henry Jocelyn Seymour](https://lda.data.parliament.uk/terms/500267) | Welsh | 0.59 | 3 | `500267` |
| [Patalano, Alessio](https://lda.data.parliament.uk/terms/500952) | Italian | 0.59 | 2 | `500952` |
| [Alessio Patalano](https://lda.data.parliament.uk/terms/500954) | Italian | 0.59 | 2 | `500954` |
| [In vitro fertilisation](https://lda.data.parliament.uk/terms/50245) | French | 0.59 | 3 | `50245` |
| [Norsk Rikskringkasting](https://lda.data.parliament.uk/terms/503298) | Dutch | 0.59 | 2 | `503298` |
| [Scrymgeour, Alexander Henry](https://lda.data.parliament.uk/terms/503404) | Welsh | 0.59 | 3 | `503404` |
| [Alexander Henry Scrymgeour](https://lda.data.parliament.uk/terms/503410) | Welsh | 0.59 | 3 | `503410` |
| [Eliot, Peregrine](https://lda.data.parliament.uk/terms/504491) | Latin | 0.59 | 2 | `504491` |
| [Dawnay, John](https://lda.data.parliament.uk/terms/505011) | Welsh | 0.59 | 2 | `505011` |
| [John Dawnay](https://lda.data.parliament.uk/terms/505015) | Welsh | 0.59 | 2 | `505015` |
| [Paul Pellew](https://lda.data.parliament.uk/terms/505026) | Welsh | 0.59 | 2 | `505026` |
| [Pellew, Paul](https://lda.data.parliament.uk/terms/505028) | Welsh | 0.59 | 2 | `505028` |
| [Lloyd-George, William](https://lda.data.parliament.uk/terms/505510) | Welsh | 0.59 | 2 | `505510` |
| [Ghanaatkar, Ali](https://lda.data.parliament.uk/terms/507048) | Dutch | 0.59 | 2 | `507048` |
| [Ali Ghanaatkar](https://lda.data.parliament.uk/terms/507050) | Dutch | 0.59 | 2 | `507050` |
| [Viggo Oerbak](https://lda.data.parliament.uk/terms/507419) | Dutch | 0.59 | 2 | `507419` |
| [Oerbak, Viggo](https://lda.data.parliament.uk/terms/507421) | Dutch | 0.59 | 2 | `507421` |
| [Psychoses](https://lda.data.parliament.uk/terms/50816) | French | 0.59 | 1 | `50816` |
| [Revenues](https://lda.data.parliament.uk/terms/50913) | French | 0.59 | 1 | `50913` |
| [Hyoscine hydrobromide](https://lda.data.parliament.uk/terms/514566) | Latin | 0.59 | 2 | `514566` |
| [Korotkikh, Sergei](https://lda.data.parliament.uk/terms/516589) | Welsh | 0.59 | 2 | `516589` |
| [Sergei Korotkikh](https://lda.data.parliament.uk/terms/516591) | Welsh | 0.59 | 2 | `516591` |
| [HIECs](https://lda.data.parliament.uk/terms/52488) | Welsh | 0.59 | 1 | `52488` |
| [HRT](https://lda.data.parliament.uk/terms/52519) | German | 0.59 | 1 | `52519` |
| [Voneus](https://lda.data.parliament.uk/terms/525856) | Latin | 0.59 | 1 | `525856` |
| [ITTA](https://lda.data.parliament.uk/terms/52615) | Italian | 0.59 | 1 | `52615` |
| [Agilysis](https://lda.data.parliament.uk/terms/526160) | Welsh | 0.59 | 1 | `526160` |
| [Cwm Taf Morgannwg University Health Board](https://lda.data.parliament.uk/terms/528166) | Welsh | 0.59 | 6 | `528166` |
| [BBH](https://lda.data.parliament.uk/terms/528456) | Irish | 0.59 | 1 | `528456` |
| [Etoricoxib](https://lda.data.parliament.uk/terms/529340) | Latin | 0.59 | 1 | `529340` |
| [NSIPs](https://lda.data.parliament.uk/terms/52941) | Welsh | 0.59 | 1 | `52941` |
| [Weardale Railway](https://lda.data.parliament.uk/terms/529421) | Welsh | 0.59 | 2 | `529421` |
| [AHRB](https://lda.data.parliament.uk/terms/54428) | German | 0.59 | 1 | `54428` |
| [International Mobile Satellite Organisation](https://lda.data.parliament.uk/terms/54486) | French | 0.59 | 4 | `54486` |
| [Vaughan, Tony](https://lda.data.parliament.uk/terms/546892) | Welsh | 0.59 | 2 | `546892` |
| [BRCD](https://lda.data.parliament.uk/terms/54998) | Welsh | 0.59 | 1 | `54998` |
| [Forum on China-Africa Cooperation](https://lda.data.parliament.uk/terms/551719) | Latin | 0.59 | 4 | `551719` |
| [Lytgobi](https://lda.data.parliament.uk/terms/551987) | Welsh | 0.59 | 1 | `551987` |
| [Holy Loch](https://lda.data.parliament.uk/terms/552309) | Welsh | 0.59 | 2 | `552309` |
| [Terrorism (Protection of Premises) Act 2025](https://lda.data.parliament.uk/terms/557530) | French | 0.59 | 6 | `557530` |
| [Pyridoxine/doxylamine](https://lda.data.parliament.uk/terms/564852) | Latin | 0.59 | 1 | `564852` |
| [Friedrich Loeffler Institute](https://lda.data.parliament.uk/terms/564894) | German | 0.59 | 3 | `564894` |
| [Caddy, Elizabeth](https://lda.data.parliament.uk/terms/572928) | Welsh | 0.59 | 2 | `572928` |
| [Elizabeth Caddy](https://lda.data.parliament.uk/terms/572930) | Welsh | 0.59 | 2 | `572930` |
| [Mehler Systems](https://lda.data.parliament.uk/terms/576093) | German | 0.59 | 2 | `576093` |
| [Immigration Enforcement](https://lda.data.parliament.uk/terms/579701) | French | 0.59 | 2 | `579701` |
| [NCVPP](https://lda.data.parliament.uk/terms/582804) | Latin | 0.59 | 1 | `582804` |
| [Oriental Translation Fund](https://lda.data.parliament.uk/terms/60639) | Latin | 0.59 | 3 | `60639` |
| [Penzer Allen](https://lda.data.parliament.uk/terms/61403) | German | 0.59 | 2 | `61403` |
| [Simat Helliesen and Eichner](https://lda.data.parliament.uk/terms/70209) | German | 0.59 | 4 | `70209` |
| [CATIAC](https://lda.data.parliament.uk/terms/73991) | Latin | 0.59 | 1 | `73991` |
| [CGPNI](https://lda.data.parliament.uk/terms/74232) | French | 0.59 | 1 | `74232` |
| [CHEAD](https://lda.data.parliament.uk/terms/74262) | Irish | 0.59 | 1 | `74262` |
| [Citu](https://lda.data.parliament.uk/terms/74443) | Latin | 0.59 | 1 | `74443` |
| [Forum nucleaire franco-britannique](https://lda.data.parliament.uk/terms/75933) | French | 0.59 | 3 | `75933` |
| [HMIPI](https://lda.data.parliament.uk/terms/76681) | Latin | 0.59 | 1 | `76681` |
| [Hydrographic Office](https://lda.data.parliament.uk/terms/77430) | Latin | 0.59 | 2 | `77430` |
| [IAPP](https://lda.data.parliament.uk/terms/77455) | Italian | 0.59 | 1 | `77455` |
| [ICC](https://lda.data.parliament.uk/terms/77483) | Italian | 0.59 | 1 | `77483` |
| [Jean Monnet Association](https://lda.data.parliament.uk/terms/78184) | French | 0.59 | 3 | `78184` |
| [Northumbria Constabulary](https://lda.data.parliament.uk/terms/78666) | Latin | 0.59 | 2 | `78666` |
| [MHA](https://lda.data.parliament.uk/terms/79231) | Irish | 0.59 | 1 | `79231` |
| [Tailhook Association](https://lda.data.parliament.uk/terms/82464) | French | 0.59 | 2 | `82464` |
| [Treuhand](https://lda.data.parliament.uk/terms/84140) | German | 0.59 | 1 | `84140` |
| [Uranium Institute](https://lda.data.parliament.uk/terms/85224) | Latin | 0.59 | 2 | `85224` |
| [Modernisation](https://lda.data.parliament.uk/terms/92061) | French | 0.59 | 1 | `92061` |
| [Orthopaedics](https://lda.data.parliament.uk/terms/92290) | Latin | 0.59 | 1 | `92290` |
| [MMD](https://lda.data.parliament.uk/terms/96018) | Welsh | 0.59 | 1 | `96018` |
| [NAIGT](https://lda.data.parliament.uk/terms/96213) | Irish | 0.59 | 1 | `96213` |
| [NAVB](https://lda.data.parliament.uk/terms/96516) | Latin | 0.59 | 1 | `96516` |
| [NCAAG](https://lda.data.parliament.uk/terms/96590) | Dutch | 0.59 | 1 | `96590` |
| [NHMF](https://lda.data.parliament.uk/terms/96765) | Welsh | 0.59 | 1 | `96765` |
| [NIGC](https://lda.data.parliament.uk/terms/96944) | Irish | 0.59 | 1 | `96944` |
| [Soil](https://lda.data.parliament.uk/terms/12871) | Irish | 0.58 | 1 | `12871` |
| [Amicus-MSF](https://lda.data.parliament.uk/terms/1359) | Latin | 0.58 | 1 | `1359` |
| [Anglican-Roman Catholic International Commission](https://lda.data.parliament.uk/terms/1452) | Latin | 0.58 | 4 | `1452` |
| [Emray](https://lda.data.parliament.uk/terms/17557) | Welsh | 0.58 | 1 | `17557` |
| [EnCore Oil](https://lda.data.parliament.uk/terms/17565) | French | 0.58 | 2 | `17565` |
| [Cambrensis](https://lda.data.parliament.uk/terms/18504) | Latin | 0.58 | 1 | `18504` |
| [CJD Surveillance Unit](https://lda.data.parliament.uk/terms/20673) | French | 0.58 | 3 | `20673` |
| [Cinematograph Exhibitors' Association](https://lda.data.parliament.uk/terms/24794) | Latin | 0.58 | 3 | `24794` |
| [Hoechst UK](https://lda.data.parliament.uk/terms/25001) | German | 0.58 | 2 | `25001` |
| [Assura Group](https://lda.data.parliament.uk/terms/2669) | French | 0.58 | 2 | `2669` |
| [INSEAD](https://lda.data.parliament.uk/terms/26956) | Irish | 0.58 | 1 | `26956` |
| [Byssinosis](https://lda.data.parliament.uk/terms/286807) | Latin | 0.58 | 1 | `286807` |
| [DHL](https://lda.data.parliament.uk/terms/29031) | Irish | 0.58 | 1 | `29031` |
| [Galbraith, John Kenneth](https://lda.data.parliament.uk/terms/291777) | Welsh | 0.58 | 3 | `291777` |
| [Morgan, Kirsty](https://lda.data.parliament.uk/terms/294159) | Welsh | 0.58 | 2 | `294159` |
| [Kirsty Morgan](https://lda.data.parliament.uk/terms/294550) | Welsh | 0.58 | 2 | `294550` |
| [CTBTO](https://lda.data.parliament.uk/terms/296723) | Spanish | 0.58 | 1 | `296723` |
| [Cunha, Arlindo](https://lda.data.parliament.uk/terms/299971) | Portuguese | 0.58 | 2 | `299971` |
| [Djanogly, Jonathan](https://lda.data.parliament.uk/terms/300192) | Welsh | 0.58 | 2 | `300192` |
| [Fava, Giovanni Claudio](https://lda.data.parliament.uk/terms/300460) | Italian | 0.58 | 3 | `300460` |
| [Gatti, Natalino](https://lda.data.parliament.uk/terms/300693) | Italian | 0.58 | 2 | `300693` |
| [Hackel, Wolfgang](https://lda.data.parliament.uk/terms/300986) | German | 0.58 | 2 | `300986` |
| [Hieronymi, Ruth](https://lda.data.parliament.uk/terms/301199) | Latin | 0.58 | 2 | `301199` |
| [Jeggle, Elisabeth](https://lda.data.parliament.uk/terms/301460) | Welsh | 0.58 | 2 | `301460` |
| [Louwes, Hendrik](https://lda.data.parliament.uk/terms/301977) | Dutch | 0.58 | 2 | `301977` |
| [Onyszkiewicz, Janusz](https://lda.data.parliament.uk/terms/302751) | Latin | 0.58 | 2 | `302751` |
| [Raeva, Bilyana](https://lda.data.parliament.uk/terms/303110) | Latin | 0.58 | 2 | `303110` |
| [Schaffner, Anne-Marie](https://lda.data.parliament.uk/terms/303462) | German | 0.58 | 2 | `303462` |
| [Schwabe, W](https://lda.data.parliament.uk/terms/303493) | German | 0.58 | 2 | `303493` |
| [Starkeviciute, Margarita](https://lda.data.parliament.uk/terms/303756) | Latin | 0.58 | 2 | `303756` |
| [Stenius-Kaukonen, Rouva Marjatta](https://lda.data.parliament.uk/terms/303770) | Latin | 0.58 | 3 | `303770` |
| [Tsimas, Konstantinos](https://lda.data.parliament.uk/terms/304085) | Latin | 0.58 | 2 | `304085` |
| [Ullmann, Wolfgang](https://lda.data.parliament.uk/terms/304121) | German | 0.58 | 2 | `304121` |
| [Wijkman, Anders](https://lda.data.parliament.uk/terms/304395) | Dutch | 0.58 | 2 | `304395` |
| [Zappala, Stefano](https://lda.data.parliament.uk/terms/304534) | Italian | 0.58 | 2 | `304534` |
| [Cunha,Arlindo](https://lda.data.parliament.uk/terms/310152) | Portuguese | 0.58 | 1 | `310152` |
| [Fava,Giovanni Claudio](https://lda.data.parliament.uk/terms/312167) | Italian | 0.58 | 2 | `312167` |
| [Gatti,Natalino](https://lda.data.parliament.uk/terms/313174) | Italian | 0.58 | 1 | `313174` |
| [Hackel,Wolfgang](https://lda.data.parliament.uk/terms/314190) | German | 0.58 | 1 | `314190` |
| [Hieronymi,Ruth](https://lda.data.parliament.uk/terms/315268) | Latin | 0.58 | 1 | `315268` |
| [Louwes,Hendrik](https://lda.data.parliament.uk/terms/318886) | Dutch | 0.58 | 1 | `318886` |
| [Fiskeridirektoratet Norway](https://lda.data.parliament.uk/terms/34487) | Latin | 0.58 | 2 | `34487` |
| [Fisons](https://lda.data.parliament.uk/terms/34488) | French | 0.58 | 1 | `34488` |
| [Heyhoe Flint, Rachael](https://lda.data.parliament.uk/terms/347677) | Welsh | 0.58 | 3 | `347677` |
| [Hoarau, Elie](https://lda.data.parliament.uk/terms/348125) | German | 0.58 | 2 | `348125` |
| [Serracchiani, Debora](https://lda.data.parliament.uk/terms/349743) | Italian | 0.58 | 2 | `349743` |
| [Organisation and Services Dept](https://lda.data.parliament.uk/terms/350702) | French | 0.58 | 4 | `350702` |
| [Gael-Linn](https://lda.data.parliament.uk/terms/35291) | Irish | 0.58 | 1 | `35291` |
| [Gallup](https://lda.data.parliament.uk/terms/35307) | Latin | 0.58 | 1 | `35307` |
| [Pertemps](https://lda.data.parliament.uk/terms/361393) | French | 0.58 | 1 | `361393` |
| [Borsellino, Rita](https://lda.data.parliament.uk/terms/362045) | Italian | 0.58 | 2 | `362045` |
| [Cassidy, George Henry](https://lda.data.parliament.uk/terms/362646) | Welsh | 0.58 | 3 | `362646` |
| [Elekta](https://lda.data.parliament.uk/terms/368782) | Dutch | 0.58 | 1 | `368782` |
| [Air Force (Constitution) Act 1917](https://lda.data.parliament.uk/terms/370952) | French | 0.58 | 5 | `370952` |
| [BICC](https://lda.data.parliament.uk/terms/3731) | Italian | 0.58 | 1 | `3731` |
| [International Air Carrier Association](https://lda.data.parliament.uk/terms/37368) | French | 0.58 | 4 | `37368` |
| [Federation internationale des vins et spiritueux](https://lda.data.parliament.uk/terms/395595) | French | 0.58 | 6 | `395595` |
| [Tiuta](https://lda.data.parliament.uk/terms/395610) | Italian | 0.58 | 1 | `395610` |
| [OHSS](https://lda.data.parliament.uk/terms/397364) | German | 0.58 | 1 | `397364` |
| [Hibu](https://lda.data.parliament.uk/terms/397456) | Latin | 0.58 | 1 | `397456` |
| [Elections Centre](https://lda.data.parliament.uk/terms/397754) | French | 0.58 | 2 | `397754` |
| [Rachael Heyhoe Flint](https://lda.data.parliament.uk/terms/399795) | Welsh | 0.58 | 3 | `399795` |
| [Jonathan Djanogly](https://lda.data.parliament.uk/terms/401517) | Welsh | 0.58 | 2 | `401517` |
| [George Henry Cassidy](https://lda.data.parliament.uk/terms/407217) | Welsh | 0.58 | 3 | `407217` |
| [CCF](https://lda.data.parliament.uk/terms/408329) | Latin | 0.58 | 1 | `408329` |
| [Vibixa](https://lda.data.parliament.uk/terms/415198) | Welsh | 0.58 | 1 | `415198` |
| [WaveLength](https://lda.data.parliament.uk/terms/415292) | Irish | 0.58 | 1 | `415292` |
| [Antiphospholipid syndrome](https://lda.data.parliament.uk/terms/417172) | Welsh | 0.58 | 2 | `417172` |
| [Dumfriesshire Clydesdale and Tweeddale](https://lda.data.parliament.uk/terms/418586) | Welsh | 0.58 | 4 | `418586` |
| [Colistimethate sodium](https://lda.data.parliament.uk/terms/420915) | Latin | 0.58 | 2 | `420915` |
| [Sativex](https://lda.data.parliament.uk/terms/420922) | Latin | 0.58 | 1 | `420922` |
| [Mussolini, Alessandra](https://lda.data.parliament.uk/terms/423012) | Italian | 0.58 | 2 | `423012` |
| [McNeilly, William](https://lda.data.parliament.uk/terms/424593) | Welsh | 0.58 | 2 | `424593` |
| [William McNeilly](https://lda.data.parliament.uk/terms/424915) | Welsh | 0.58 | 2 | `424915` |
| [Farsi](https://lda.data.parliament.uk/terms/425506) | Italian | 0.58 | 1 | `425506` |
| [APPT](https://lda.data.parliament.uk/terms/431632) | German | 0.58 | 1 | `431632` |
| [Kineret](https://lda.data.parliament.uk/terms/434864) | Latin | 0.58 | 1 | `434864` |
| [Trigeminal neuralgia](https://lda.data.parliament.uk/terms/435155) | Latin | 0.58 | 2 | `435155` |
| [German-Russian Forum](https://lda.data.parliament.uk/terms/437663) | Latin | 0.58 | 2 | `437663` |
| [Trimega](https://lda.data.parliament.uk/terms/441708) | Spanish | 0.58 | 1 | `441708` |
| [AMII](https://lda.data.parliament.uk/terms/445098) | Latin | 0.58 | 1 | `445098` |
| [National Association for Patient Participation](https://lda.data.parliament.uk/terms/44617) | French | 0.58 | 5 | `44617` |
| [National Association of Complaints Personnel](https://lda.data.parliament.uk/terms/44663) | French | 0.58 | 5 | `44663` |
| [Christopher Charles Lyttelton](https://lda.data.parliament.uk/terms/447127) | Welsh | 0.58 | 3 | `447127` |
| [Lyttelton, Christopher Charles](https://lda.data.parliament.uk/terms/447129) | Welsh | 0.58 | 3 | `447129` |
| [Andrew Ian Henry Russell](https://lda.data.parliament.uk/terms/447224) | Welsh | 0.58 | 4 | `447224` |
| [Russell, Andrew Ian Henry](https://lda.data.parliament.uk/terms/447226) | Welsh | 0.58 | 4 | `447226` |
| [Melius Homes](https://lda.data.parliament.uk/terms/454179) | Latin | 0.58 | 2 | `454179` |
| [Tharsus](https://lda.data.parliament.uk/terms/454927) | Latin | 0.58 | 1 | `454927` |
| [NNRAP](https://lda.data.parliament.uk/terms/455261) | Irish | 0.58 | 1 | `455261` |
| [Kingspan](https://lda.data.parliament.uk/terms/456057) | Dutch | 0.58 | 1 | `456057` |
| [Lucke, Bernd](https://lda.data.parliament.uk/terms/456091) | German | 0.58 | 2 | `456091` |
| [Ashton, Thomas Henry](https://lda.data.parliament.uk/terms/460106) | Welsh | 0.58 | 3 | `460106` |
| [Thomas Henry Ashton](https://lda.data.parliament.uk/terms/460108) | Welsh | 0.58 | 3 | `460108` |
| [Choudrey, Zameer](https://lda.data.parliament.uk/terms/460455) | Dutch | 0.58 | 2 | `460455` |
| [Zameer Choudrey](https://lda.data.parliament.uk/terms/460457) | Dutch | 0.58 | 2 | `460457` |
| [Hypertrophication](https://lda.data.parliament.uk/terms/461007) | Latin | 0.58 | 1 | `461007` |
| [Gummer, Peter Selwyn](https://lda.data.parliament.uk/terms/462827) | Welsh | 0.58 | 3 | `462827` |
| [Peter Selwyn Gummer](https://lda.data.parliament.uk/terms/462829) | Welsh | 0.58 | 3 | `462829` |
| [Timothy John Robert Kirkhope](https://lda.data.parliament.uk/terms/463364) | Welsh | 0.58 | 4 | `463364` |
| [Kirkhope, Timothy John Robert](https://lda.data.parliament.uk/terms/463376) | Welsh | 0.58 | 4 | `463376` |
| [CEPI](https://lda.data.parliament.uk/terms/466863) | Latin | 0.58 | 1 | `466863` |
| [AfD](https://lda.data.parliament.uk/terms/467777) | Dutch | 0.58 | 1 | `467777` |
| [Ringwald Wildman, Kathryn](https://lda.data.parliament.uk/terms/472603) | Welsh | 0.58 | 3 | `472603` |
| [Kathryn Ringwald Wildman](https://lda.data.parliament.uk/terms/472607) | Welsh | 0.58 | 3 | `472607` |
| [Kathryn Ringwald-Wildman](https://lda.data.parliament.uk/terms/472609) | Welsh | 0.58 | 2 | `472609` |
| [NNB](https://lda.data.parliament.uk/terms/474707) | German | 0.58 | 1 | `474707` |
| [Alec Broers](https://lda.data.parliament.uk/terms/476451) | Dutch | 0.58 | 2 | `476451` |
| [Broers, Alec](https://lda.data.parliament.uk/terms/476453) | Dutch | 0.58 | 2 | `476453` |
| [Tantalum](https://lda.data.parliament.uk/terms/478896) | Latin | 0.58 | 1 | `478896` |
| [Pozzoni](https://lda.data.parliament.uk/terms/489456) | Italian | 0.58 | 1 | `489456` |
| [Sotrovimab](https://lda.data.parliament.uk/terms/493044) | Latin | 0.58 | 1 | `493044` |
| [Myocarditis](https://lda.data.parliament.uk/terms/494451) | Latin | 0.58 | 1 | `494451` |
| [upReach](https://lda.data.parliament.uk/terms/497136) | Irish | 0.58 | 1 | `497136` |
| [Ann Mallalieu](https://lda.data.parliament.uk/terms/498115) | French | 0.58 | 2 | `498115` |
| [Mallalieu, Ann](https://lda.data.parliament.uk/terms/498117) | French | 0.58 | 2 | `498117` |
| [Penicuik Athletic FC](https://lda.data.parliament.uk/terms/500593) | Latin | 0.58 | 3 | `500593` |
| [Fane, Anthony](https://lda.data.parliament.uk/terms/504583) | Welsh | 0.58 | 2 | `504583` |
| [Anthony Fane](https://lda.data.parliament.uk/terms/504591) | Welsh | 0.58 | 2 | `504591` |
| [Bunge](https://lda.data.parliament.uk/terms/505898) | German | 0.58 | 1 | `505898` |
| [NTDS](https://lda.data.parliament.uk/terms/508752) | Dutch | 0.58 | 1 | `508752` |
| [Parler](https://lda.data.parliament.uk/terms/509472) | French | 0.58 | 1 | `509472` |
| [Opzelura](https://lda.data.parliament.uk/terms/513525) | French | 0.58 | 1 | `513525` |
| [Lord Oxenfoord](https://lda.data.parliament.uk/terms/515940) | Dutch | 0.58 | 2 | `515940` |
| [Oxenfoord, Lord](https://lda.data.parliament.uk/terms/515942) | Dutch | 0.58 | 2 | `515942` |
| [Menorrhagia](https://lda.data.parliament.uk/terms/520214) | Latin | 0.58 | 1 | `520214` |
| [al-Derazi, Abdullah](https://lda.data.parliament.uk/terms/523239) | Italian | 0.58 | 2 | `523239` |
| [Abdullah al-Derazi](https://lda.data.parliament.uk/terms/523241) | Italian | 0.58 | 2 | `523241` |
| [PCPA](https://lda.data.parliament.uk/terms/523324) | Portuguese | 0.58 | 1 | `523324` |
| [TuneIn](https://lda.data.parliament.uk/terms/525893) | German | 0.58 | 1 | `525893` |
| [MLSOs](https://lda.data.parliament.uk/terms/52805) | Spanish | 0.58 | 1 | `52805` |
| [ATIEP](https://lda.data.parliament.uk/terms/53853) | Dutch | 0.58 | 1 | `53853` |
| [ADASS](https://lda.data.parliament.uk/terms/54059) | German | 0.58 | 1 | `54059` |
| [BFBS](https://lda.data.parliament.uk/terms/54210) | Dutch | 0.58 | 1 | `54210` |
| [Paxlovid](https://lda.data.parliament.uk/terms/545476) | Latin | 0.58 | 1 | `545476` |
| [Amicus MSF](https://lda.data.parliament.uk/terms/54603) | Latin | 0.58 | 2 | `54603` |
| [Anglican Roman Catholic International Commission](https://lda.data.parliament.uk/terms/54637) | Latin | 0.58 | 5 | `54637` |
| [Arconic Architectural Products](https://lda.data.parliament.uk/terms/549163) | Latin | 0.58 | 3 | `549163` |
| [Noise pollution](https://lda.data.parliament.uk/terms/550655) | French | 0.58 | 2 | `550655` |
| [Hepatolenticular degeneration](https://lda.data.parliament.uk/terms/554331) | Latin | 0.58 | 2 | `554331` |
| [HMYOI Stoke Heath](https://lda.data.parliament.uk/terms/555401) | Welsh | 0.58 | 3 | `555401` |
| [Connexus](https://lda.data.parliament.uk/terms/562123) | Latin | 0.58 | 1 | `562123` |
| [citizenAID](https://lda.data.parliament.uk/terms/564510) | Irish | 0.58 | 1 | `564510` |
| [AUKUS Forum](https://lda.data.parliament.uk/terms/569374) | Latin | 0.58 | 2 | `569374` |
| [Morgannwg Health Authority](https://lda.data.parliament.uk/terms/57411) | Welsh | 0.58 | 3 | `57411` |
| [Cavaliere, Giulia](https://lda.data.parliament.uk/terms/575215) | Italian | 0.58 | 2 | `575215` |
| [Giulia Cavaliere](https://lda.data.parliament.uk/terms/575217) | Italian | 0.58 | 2 | `575217` |
| [JAEA](https://lda.data.parliament.uk/terms/577756) | Latin | 0.58 | 1 | `577756` |
| [Favipiravir](https://lda.data.parliament.uk/terms/582749) | Latin | 0.58 | 1 | `582749` |
| [Daraxonrasib](https://lda.data.parliament.uk/terms/583202) | Latin | 0.58 | 1 | `583202` |
| [Nominet](https://lda.data.parliament.uk/terms/58917) | Latin | 0.58 | 1 | `58917` |
| [Organisation of Private Tenants](https://lda.data.parliament.uk/terms/60621) | French | 0.58 | 4 | `60621` |
| [Patients' Association](https://lda.data.parliament.uk/terms/61206) | French | 0.58 | 2 | `61206` |
| [Sportspartner](https://lda.data.parliament.uk/terms/68841) | German | 0.58 | 1 | `68841` |
| [CATU](https://lda.data.parliament.uk/terms/73992) | Latin | 0.58 | 1 | `73992` |
| [CHIQ](https://lda.data.parliament.uk/terms/74366) | French | 0.58 | 1 | `74366` |
| [ESSS](https://lda.data.parliament.uk/terms/75535) | Welsh | 0.58 | 1 | `75535` |
| [FAWC](https://lda.data.parliament.uk/terms/75763) | Welsh | 0.58 | 1 | `75763` |
| [HHCL](https://lda.data.parliament.uk/terms/76581) | Dutch | 0.58 | 1 | `76581` |
| [HTA](https://lda.data.parliament.uk/terms/76796) | Irish | 0.58 | 1 | `76796` |
| [EFEC](https://lda.data.parliament.uk/terms/77246) | Latin | 0.58 | 1 | `77246` |
| [ICCAT](https://lda.data.parliament.uk/terms/77484) | Italian | 0.58 | 1 | `77484` |
| [ICFM](https://lda.data.parliament.uk/terms/77497) | Latin | 0.58 | 1 | `77497` |
| [ICTU](https://lda.data.parliament.uk/terms/77531) | Latin | 0.58 | 1 | `77531` |
| [Sysnovators](https://lda.data.parliament.uk/terms/82438) | Latin | 0.58 | 1 | `82438` |
| [Pioneer Concrete UK](https://lda.data.parliament.uk/terms/82767) | Dutch | 0.58 | 3 | `82767` |
| [VJ](https://lda.data.parliament.uk/terms/85771) | Dutch | 0.58 | 1 | `85771` |
| [Bexley](https://lda.data.parliament.uk/terms/8653) | Welsh | 0.58 | 1 | `8653` |
| [Yorkon](https://lda.data.parliament.uk/terms/86747) | Dutch | 0.58 | 1 | `86747` |
| [Census](https://lda.data.parliament.uk/terms/90471) | Latin | 0.58 | 1 | `90471` |
| [Podiatry](https://lda.data.parliament.uk/terms/90506) | Welsh | 0.58 | 1 | `90506` |
| [Occupations](https://lda.data.parliament.uk/terms/92220) | French | 0.58 | 1 | `92220` |
| [Prisons](https://lda.data.parliament.uk/terms/92582) | French | 0.58 | 1 | `92582` |
| [Whatlings](https://lda.data.parliament.uk/terms/94742) | German | 0.58 | 1 | `94742` |
| [Census](https://lda.data.parliament.uk/terms/95513) | Latin | 0.58 | 1 | `95513` |
| [Prisons](https://lda.data.parliament.uk/terms/95720) | French | 0.58 | 1 | `95720` |
| [NASEES](https://lda.data.parliament.uk/terms/96254) | Dutch | 0.58 | 1 | `96254` |
| [NIDHSS](https://lda.data.parliament.uk/terms/96909) | Irish | 0.58 | 1 | `96909` |
| [NOFCO](https://lda.data.parliament.uk/terms/97021) | Welsh | 0.58 | 1 | `97021` |
| [Dumfriesshire, Clydesdale and Tweeddale](https://lda.data.parliament.uk/terms/9745) | Welsh | 0.58 | 4 | `9745` |
| [PHRG](https://lda.data.parliament.uk/terms/98666) | Irish | 0.58 | 1 | `98666` |
| [Glan Clwyd Hospital](https://lda.data.parliament.uk/terms/10450) | Welsh | 0.57 | 3 | `10450` |
| [Influenza](https://lda.data.parliament.uk/terms/10906) | Italian | 0.57 | 1 | `10906` |
| [Lithuania](https://lda.data.parliament.uk/terms/11357) | Latin | 0.57 | 1 | `11357` |
| [Millennium Stadium](https://lda.data.parliament.uk/terms/11685) | Latin | 0.57 | 2 | `11685` |
| [Vilnius](https://lda.data.parliament.uk/terms/13620) | Latin | 0.57 | 1 | `13620` |
| [Amusement Arcade Action Group](https://lda.data.parliament.uk/terms/1373) | French | 0.57 | 4 | `1373` |
| [Anschutz Entertainment Group](https://lda.data.parliament.uk/terms/1555) | German | 0.57 | 3 | `1555` |
| [Brymbo Steelworks](https://lda.data.parliament.uk/terms/16642) | Welsh | 0.57 | 2 | `16642` |
| [Camair 95](https://lda.data.parliament.uk/terms/18491) | Irish | 0.57 | 2 | `18491` |
| [CCL Assurance](https://lda.data.parliament.uk/terms/19254) | French | 0.57 | 2 | `19254` |
| [Association for Spina Bifida and Hydrocephalus](https://lda.data.parliament.uk/terms/2224) | Latin | 0.57 | 6 | `2224` |
| [Howell Henry Chauldecott Lowry](https://lda.data.parliament.uk/terms/25369) | Welsh | 0.57 | 4 | `25369` |
| [Humphreys and Glasgow](https://lda.data.parliament.uk/terms/26239) | Welsh | 0.57 | 3 | `26239` |
| [Interbrew](https://lda.data.parliament.uk/terms/27460) | German | 0.57 | 1 | `27460` |
| [Cumbria Constabulary](https://lda.data.parliament.uk/terms/28068) | Latin | 0.57 | 2 | `28068` |
| [Marihuana](https://lda.data.parliament.uk/terms/285716) | Spanish | 0.57 | 1 | `285716` |
| [Bennie, Lynn](https://lda.data.parliament.uk/terms/290888) | Welsh | 0.57 | 2 | `290888` |
| [Flew, Antony](https://lda.data.parliament.uk/terms/291053) | Welsh | 0.57 | 2 | `291053` |
| [Lynn Bennie](https://lda.data.parliament.uk/terms/291467) | Welsh | 0.57 | 2 | `291467` |
| [Automobile Association](https://lda.data.parliament.uk/terms/2915) | French | 0.57 | 2 | `2915` |
| [Drucker, Peter](https://lda.data.parliament.uk/terms/291704) | German | 0.57 | 2 | `291704` |
| [Antony Flew](https://lda.data.parliament.uk/terms/291717) | Welsh | 0.57 | 2 | `291717` |
| [Danby, Grahame](https://lda.data.parliament.uk/terms/293956) | Welsh | 0.57 | 2 | `293956` |
| [Hughes, Dorothy](https://lda.data.parliament.uk/terms/294111) | Welsh | 0.57 | 2 | `294111` |
| [Grahame Danby](https://lda.data.parliament.uk/terms/294587) | Welsh | 0.57 | 2 | `294587` |
| [Sheppey](https://lda.data.parliament.uk/terms/296898) | Welsh | 0.57 | 1 | `296898` |
| [Corpus Christi College](https://lda.data.parliament.uk/terms/297451) | Latin | 0.57 | 3 | `297451` |
| [Escherichia coli](https://lda.data.parliament.uk/terms/297522) | Italian | 0.57 | 2 | `297522` |
| [Boege, Reimer](https://lda.data.parliament.uk/terms/299236) | Dutch | 0.57 | 2 | `299236` |
| [Di Lello Finuoli, Giuseppe](https://lda.data.parliament.uk/terms/300170) | Italian | 0.57 | 4 | `300170` |
| [Faith, Sheila](https://lda.data.parliament.uk/terms/300430) | Welsh | 0.57 | 2 | `300430` |
| [Feio, Diogo](https://lda.data.parliament.uk/terms/300468) | Portuguese | 0.57 | 2 | `300468` |
| [Girao Pereira, Jose](https://lda.data.parliament.uk/terms/300755) | Portuguese | 0.57 | 3 | `300755` |
| [Jonckheer, Pierre](https://lda.data.parliament.uk/terms/301497) | Dutch | 0.57 | 2 | `301497` |
| [Kirkwood of Kirkhope, Lord](https://lda.data.parliament.uk/terms/301658) | Welsh | 0.57 | 4 | `301658` |
| [Langen, Werner](https://lda.data.parliament.uk/terms/301765) | German | 0.57 | 2 | `301765` |
| [Lynne, Elizabeth](https://lda.data.parliament.uk/terms/302007) | Welsh | 0.57 | 2 | `302007` |
| [Moreira Da Silva, Jorge](https://lda.data.parliament.uk/terms/302482) | Portuguese | 0.57 | 4 | `302482` |
| [Oreja Aguirre, Marcelino](https://lda.data.parliament.uk/terms/302764) | Spanish | 0.57 | 3 | `302764` |
| [Reiger, Helmut](https://lda.data.parliament.uk/terms/303182) | German | 0.57 | 2 | `303182` |
| [Ribeiro e Castro, Jose](https://lda.data.parliament.uk/terms/303205) | Portuguese | 0.57 | 4 | `303205` |
| [Ronn, Joanna](https://lda.data.parliament.uk/terms/303303) | Irish | 0.57 | 2 | `303303` |
| [Sterckx, Dirk](https://lda.data.parliament.uk/terms/303776) | Dutch | 0.57 | 2 | `303776` |
| [Zingaretti, Nicola](https://lda.data.parliament.uk/terms/304547) | Italian | 0.57 | 2 | `304547` |
| [Boege,Reimer](https://lda.data.parliament.uk/terms/306924) | Dutch | 0.57 | 1 | `306924` |
| [Di Lello Finuoli,Giuseppe](https://lda.data.parliament.uk/terms/310950) | Italian | 0.57 | 3 | `310950` |
| [Girao Pereira,Jose](https://lda.data.parliament.uk/terms/313398) | Portuguese | 0.57 | 2 | `313398` |
| [Jonckheer,Pierre](https://lda.data.parliament.uk/terms/316806) | Dutch | 0.57 | 1 | `316806` |
| [Moreira Da Silva,Jorge](https://lda.data.parliament.uk/terms/321338) | Portuguese | 0.57 | 3 | `321338` |
| [Oreja Aguirre,Marcelino](https://lda.data.parliament.uk/terms/322576) | Spanish | 0.57 | 2 | `322576` |
| [Feilden Clegg](https://lda.data.parliament.uk/terms/34136) | Dutch | 0.57 | 2 | `34136` |
| [BDO Binder Hamlyn](https://lda.data.parliament.uk/terms/346518) | Welsh | 0.57 | 3 | `346518` |
| [St Paul's Cathedral](https://lda.data.parliament.uk/terms/349999) | Latin | 0.57 | 3 | `349999` |
| [Fusion Personnel](https://lda.data.parliament.uk/terms/35181) | French | 0.57 | 2 | `35181` |
| [Rhodesian Graphic](https://lda.data.parliament.uk/terms/361611) | Latin | 0.57 | 2 | `361611` |
| [GreenLINK](https://lda.data.parliament.uk/terms/364923) | Dutch | 0.57 | 1 | `364923` |
| [Laidlaw Inquiry](https://lda.data.parliament.uk/terms/366929) | Welsh | 0.57 | 2 | `366929` |
| [Pascu, Ioan Mircea](https://lda.data.parliament.uk/terms/367019) | Latin | 0.57 | 3 | `367019` |
| [ICFC](https://lda.data.parliament.uk/terms/368675) | Latin | 0.57 | 1 | `368675` |
| [Hafal](https://lda.data.parliament.uk/terms/37342) | Welsh | 0.57 | 1 | `37342` |
| [Telespazio VEGA UK](https://lda.data.parliament.uk/terms/395270) | Italian | 0.57 | 3 | `395270` |
| [Dorothy Hughes](https://lda.data.parliament.uk/terms/395707) | Welsh | 0.57 | 2 | `395707` |
| [Kock, Stephan Adolphus](https://lda.data.parliament.uk/terms/396771) | Latin | 0.57 | 3 | `396771` |
| [Lord Kirkwood of Kirkhope](https://lda.data.parliament.uk/terms/399939) | Welsh | 0.57 | 4 | `399939` |
| [Timothy Kirkhope](https://lda.data.parliament.uk/terms/410690) | Welsh | 0.57 | 2 | `410690` |
| [Elizabeth Lynne](https://lda.data.parliament.uk/terms/410816) | Welsh | 0.57 | 2 | `410816` |
| [Sheila Faith](https://lda.data.parliament.uk/terms/413257) | Welsh | 0.57 | 2 | `413257` |
| [Zorrinho, Carlos](https://lda.data.parliament.uk/terms/422074) | Portuguese | 0.57 | 2 | `422074` |
| [Kirkhope, Timothy](https://lda.data.parliament.uk/terms/430732) | Welsh | 0.57 | 2 | `430732` |
| [Llamau](https://lda.data.parliament.uk/terms/43138) | Spanish | 0.57 | 1 | `43138` |
| [Kadcyla](https://lda.data.parliament.uk/terms/433429) | French | 0.57 | 1 | `433429` |
| [HSCIC](https://lda.data.parliament.uk/terms/433760) | Latin | 0.57 | 1 | `433760` |
| [Camfed](https://lda.data.parliament.uk/terms/434430) | Welsh | 0.57 | 1 | `434430` |
| [Autorite de la concurrence](https://lda.data.parliament.uk/terms/439620) | French | 0.57 | 4 | `439620` |
| [Monopolkommission](https://lda.data.parliament.uk/terms/439622) | German | 0.57 | 1 | `439622` |
| [Stone, Kathryn](https://lda.data.parliament.uk/terms/439885) | Welsh | 0.57 | 2 | `439885` |
| [Kathryn Stone](https://lda.data.parliament.uk/terms/439889) | Welsh | 0.57 | 2 | `439889` |
| [Mancare](https://lda.data.parliament.uk/terms/44074) | Italian | 0.57 | 1 | `44074` |
| [MTRU](https://lda.data.parliament.uk/terms/44341) | Latin | 0.57 | 1 | `44341` |
| [MML](https://lda.data.parliament.uk/terms/443476) | German | 0.57 | 1 | `443476` |
| [Vieu, Marie-Pierre](https://lda.data.parliament.uk/terms/443763) | French | 0.57 | 2 | `443763` |
| [National Alliance of Women's Organisations](https://lda.data.parliament.uk/terms/44574) | French | 0.57 | 5 | `44574` |
| [Aliouat, Ahmed](https://lda.data.parliament.uk/terms/445801) | French | 0.57 | 2 | `445801` |
| [Ahmed Aliouat](https://lda.data.parliament.uk/terms/445821) | French | 0.57 | 2 | `445821` |
| [Quetiapine](https://lda.data.parliament.uk/terms/447920) | Latin | 0.57 | 1 | `447920` |
| [al-Ghomgham, Israa](https://lda.data.parliament.uk/terms/449556) | Latin | 0.57 | 2 | `449556` |
| [Israa al-Ghomgham](https://lda.data.parliament.uk/terms/449558) | Latin | 0.57 | 2 | `449558` |
| [Davies, Gareth Thomas](https://lda.data.parliament.uk/terms/452571) | Welsh | 0.57 | 3 | `452571` |
| [Landstingens Omsesidiga Forsakringsbolag](https://lda.data.parliament.uk/terms/473868) | Dutch | 0.57 | 3 | `473868` |
| [Randstad](https://lda.data.parliament.uk/terms/483555) | Dutch | 0.57 | 1 | `483555` |
| [AOAE](https://lda.data.parliament.uk/terms/488428) | Welsh | 0.57 | 1 | `488428` |
| [CRFCA](https://lda.data.parliament.uk/terms/488467) | Welsh | 0.57 | 1 | `488467` |
| [Raducanu, Emma](https://lda.data.parliament.uk/terms/488992) | Latin | 0.57 | 2 | `488992` |
| [Emma Raducanu](https://lda.data.parliament.uk/terms/488994) | Latin | 0.57 | 2 | `488994` |
| [Malcolm Offord](https://lda.data.parliament.uk/terms/489149) | Welsh | 0.57 | 2 | `489149` |
| [Offord, Malcolm](https://lda.data.parliament.uk/terms/489151) | Welsh | 0.57 | 2 | `489151` |
| [Food and Agriculture Organisation](https://lda.data.parliament.uk/terms/489766) | French | 0.57 | 4 | `489766` |
| [Innospec](https://lda.data.parliament.uk/terms/490910) | Latin | 0.57 | 1 | `490910` |
| [Rearo](https://lda.data.parliament.uk/terms/491306) | Spanish | 0.57 | 1 | `491306` |
| [Tafamidis](https://lda.data.parliament.uk/terms/491998) | Latin | 0.57 | 1 | `491998` |
| [Nirmatrelvir/ritonavir](https://lda.data.parliament.uk/terms/493215) | Latin | 0.57 | 1 | `493215` |
| [Prisons (Violence) Bill 2021-22](https://lda.data.parliament.uk/terms/493638) | French | 0.57 | 4 | `493638` |
| [Educational techniques](https://lda.data.parliament.uk/terms/49753) | French | 0.57 | 2 | `49753` |
| [Alexander Thynn](https://lda.data.parliament.uk/terms/500232) | Welsh | 0.57 | 2 | `500232` |
| [Thynn, Alexander](https://lda.data.parliament.uk/terms/500234) | Welsh | 0.57 | 2 | `500234` |
| [Bushby, Karl](https://lda.data.parliament.uk/terms/504907) | Welsh | 0.57 | 2 | `504907` |
| [Karl Bushby](https://lda.data.parliament.uk/terms/505005) | Welsh | 0.57 | 2 | `505005` |
| [Sodium hypochlorite](https://lda.data.parliament.uk/terms/506297) | Latin | 0.57 | 2 | `506297` |
| [Roman catholicism](https://lda.data.parliament.uk/terms/50930) | Latin | 0.57 | 2 | `50930` |
| [TBR Global Chauffeuring](https://lda.data.parliament.uk/terms/509656) | Dutch | 0.57 | 3 | `509656` |
| [Lee, Jennie](https://lda.data.parliament.uk/terms/510460) | Dutch | 0.57 | 2 | `510460` |
| [Jennie Lee](https://lda.data.parliament.uk/terms/510462) | Dutch | 0.57 | 2 | `510462` |
| [Pacific Forum](https://lda.data.parliament.uk/terms/510913) | Latin | 0.57 | 2 | `510913` |
| [Gareth Thomas Davies](https://lda.data.parliament.uk/terms/513469) | Welsh | 0.57 | 3 | `513469` |
| [LexisNexis Risk Solutions](https://lda.data.parliament.uk/terms/515686) | French | 0.57 | 3 | `515686` |
| [Senedd Cymru Business Committee](https://lda.data.parliament.uk/terms/518003) | Welsh | 0.57 | 4 | `518003` |
| [Port of Rotterdam](https://lda.data.parliament.uk/terms/518194) | Dutch | 0.57 | 3 | `518194` |
| [Decubitus ulcers](https://lda.data.parliament.uk/terms/52099) | Latin | 0.57 | 2 | `52099` |
| [IVC Evidensia](https://lda.data.parliament.uk/terms/521563) | Latin | 0.57 | 2 | `521563` |
| [Petetin, Ludivine](https://lda.data.parliament.uk/terms/523203) | Latin | 0.57 | 2 | `523203` |
| [Ludivine Petetin](https://lda.data.parliament.uk/terms/523205) | Latin | 0.57 | 2 | `523205` |
| [Ahmed, Yaqub](https://lda.data.parliament.uk/terms/523384) | Latin | 0.57 | 2 | `523384` |
| [Yaqub Ahmed](https://lda.data.parliament.uk/terms/523386) | Latin | 0.57 | 2 | `523386` |
| [McCarthy, John](https://lda.data.parliament.uk/terms/524632) | Welsh | 0.57 | 2 | `524632` |
| [John McCarthy](https://lda.data.parliament.uk/terms/524634) | Welsh | 0.57 | 2 | `524634` |
| [Kelly, Gerry](https://lda.data.parliament.uk/terms/525036) | Welsh | 0.57 | 2 | `525036` |
| [Gerry Kelly](https://lda.data.parliament.uk/terms/525038) | Welsh | 0.57 | 2 | `525038` |
| [Tantawy, Ahmed](https://lda.data.parliament.uk/terms/526330) | Welsh | 0.57 | 2 | `526330` |
| [Ahmed Tantawy](https://lda.data.parliament.uk/terms/526332) | Welsh | 0.57 | 2 | `526332` |
| [Kirghizia](https://lda.data.parliament.uk/terms/52658) | Italian | 0.57 | 1 | `52658` |
| [ACEVO](https://lda.data.parliament.uk/terms/53651) | Italian | 0.57 | 1 | `53651` |
| [Avanti](https://lda.data.parliament.uk/terms/53913) | Italian | 0.57 | 1 | `53913` |
| [ADHFRW](https://lda.data.parliament.uk/terms/54089) | Latin | 0.57 | 1 | `54089` |
| [BFFA](https://lda.data.parliament.uk/terms/54212) | Welsh | 0.57 | 1 | `54212` |
| [Airtours Group](https://lda.data.parliament.uk/terms/54467) | French | 0.57 | 2 | `54467` |
| [Ritlecitinib](https://lda.data.parliament.uk/terms/545567) | Italian | 0.57 | 1 | `545567` |
| [Aberafan Maesteg](https://lda.data.parliament.uk/terms/545749) | Welsh | 0.57 | 2 | `545749` |
| [Tronox](https://lda.data.parliament.uk/terms/550302) | Latin | 0.57 | 1 | `550302` |
| [HMS Blencathra](https://lda.data.parliament.uk/terms/550916) | Welsh | 0.57 | 2 | `550916` |
| [Fakana, Marcus](https://lda.data.parliament.uk/terms/553652) | Latin | 0.57 | 2 | `553652` |
| [Cobenfy](https://lda.data.parliament.uk/terms/554896) | Welsh | 0.57 | 1 | `554896` |
| [HMYOI Brinsford](https://lda.data.parliament.uk/terms/555516) | Welsh | 0.57 | 2 | `555516` |
| [Smeddle, Eva](https://lda.data.parliament.uk/terms/556479) | Welsh | 0.57 | 2 | `556479` |
| [Eva Smeddle](https://lda.data.parliament.uk/terms/556481) | Welsh | 0.57 | 2 | `556481` |
| [GHD](https://lda.data.parliament.uk/terms/562103) | Irish | 0.57 | 1 | `562103` |
| [Universal Quantum](https://lda.data.parliament.uk/terms/567153) | Latin | 0.57 | 2 | `567153` |
| [Khawla, Ziad](https://lda.data.parliament.uk/terms/567201) | Welsh | 0.57 | 2 | `567201` |
| [Ziad Khawla](https://lda.data.parliament.uk/terms/567203) | Welsh | 0.57 | 2 | `567203` |
| [PackUK](https://lda.data.parliament.uk/terms/568941) | German | 0.57 | 1 | `568941` |
| [Postpartum haemorrhage](https://lda.data.parliament.uk/terms/580561) | Latin | 0.57 | 2 | `580561` |
| [Borysiewicz, Leszek](https://lda.data.parliament.uk/terms/581581) | Welsh | 0.57 | 2 | `581581` |
| [Leszek Borysiewicz](https://lda.data.parliament.uk/terms/581583) | Welsh | 0.57 | 2 | `581583` |
| [Palatine Graphic Arts](https://lda.data.parliament.uk/terms/60910) | Latin | 0.57 | 3 | `60910` |
| [Quantum International](https://lda.data.parliament.uk/terms/65618) | Latin | 0.57 | 2 | `65618` |
| [RAF Maintenance Group](https://lda.data.parliament.uk/terms/65822) | French | 0.57 | 3 | `65822` |
| [CHAI](https://lda.data.parliament.uk/terms/74236) | Irish | 0.57 | 1 | `74236` |
| [CIKC](https://lda.data.parliament.uk/terms/74412) | Welsh | 0.57 | 1 | `74412` |
| [CLRL](https://lda.data.parliament.uk/terms/74503) | Welsh | 0.57 | 1 | `74503` |
| [COI Communications](https://lda.data.parliament.uk/terms/74564) | French | 0.57 | 2 | `74564` |
| [FSSC](https://lda.data.parliament.uk/terms/76016) | German | 0.57 | 1 | `76016` |
| [HIDB](https://lda.data.parliament.uk/terms/76584) | Portuguese | 0.57 | 1 | `76584` |
| [DTLGR](https://lda.data.parliament.uk/terms/76973) | German | 0.57 | 1 | `76973` |
| [EASBBEA](https://lda.data.parliament.uk/terms/77059) | Irish | 0.57 | 1 | `77059` |
| [ECGD](https://lda.data.parliament.uk/terms/77149) | Dutch | 0.57 | 1 | `77149` |
| [Institut d'amenagement et d'urbanisme de la region Ile-de-France](https://lda.data.parliament.uk/terms/77461) | French | 0.57 | 8 | `77461` |
| [Institute for Orthodox Christian Studies](https://lda.data.parliament.uk/terms/77817) | Latin | 0.57 | 5 | `77817` |
| [International Criminal Police Organisation](https://lda.data.parliament.uk/terms/77901) | French | 0.57 | 4 | `77901` |
| [JNCC](https://lda.data.parliament.uk/terms/78215) | Latin | 0.57 | 1 | `78215` |
| [Sustrans Cymru](https://lda.data.parliament.uk/terms/82279) | Welsh | 0.57 | 2 | `82279` |
| [Technique LLC](https://lda.data.parliament.uk/terms/82654) | French | 0.57 | 2 | `82654` |
| [PKK](https://lda.data.parliament.uk/terms/82784) | Dutch | 0.57 | 1 | `82784` |
| [Topman](https://lda.data.parliament.uk/terms/83769) | Dutch | 0.57 | 1 | `83769` |
| [Avian influenza](https://lda.data.parliament.uk/terms/8483) | Italian | 0.57 | 2 | `8483` |
| [VisitBritain](https://lda.data.parliament.uk/terms/85751) | French | 0.57 | 1 | `85751` |
| [Airguns](https://lda.data.parliament.uk/terms/90179) | Portuguese | 0.57 | 1 | `90179` |
| [Antiques](https://lda.data.parliament.uk/terms/90226) | French | 0.57 | 1 | `90226` |
| [Concessions](https://lda.data.parliament.uk/terms/90666) | French | 0.57 | 1 | `90666` |
| [Enforcement](https://lda.data.parliament.uk/terms/91126) | French | 0.57 | 1 | `91126` |
| [Chlorpromazine hydrochloride](https://lda.data.parliament.uk/terms/9154) | Latin | 0.57 | 2 | `9154` |
| [Humour](https://lda.data.parliament.uk/terms/91590) | French | 0.57 | 1 | `91590` |
| [Criminal justice interventions programme](https://lda.data.parliament.uk/terms/9495) | French | 0.57 | 4 | `9495` |
| [NAFD](https://lda.data.parliament.uk/terms/96197) | Dutch | 0.57 | 1 | `96197` |
| [Equador](https://lda.data.parliament.uk/terms/9974) | Portuguese | 0.57 | 1 | `9974` |
| [Hunt saboteurs](https://lda.data.parliament.uk/terms/10815) | French | 0.56 | 2 | `10815` |
| [Intensive supervision and surveillance programme](https://lda.data.parliament.uk/terms/10937) | French | 0.56 | 5 | `10937` |
| [Liqueur wines](https://lda.data.parliament.uk/terms/11350) | French | 0.56 | 2 | `11350` |
| [Luxembourg](https://lda.data.parliament.uk/terms/11447) | French | 0.56 | 1 | `11447` |
| [Potassium permanganate](https://lda.data.parliament.uk/terms/12237) | Latin | 0.56 | 2 | `12237` |
| [Robert Jones and Agnes Hunt Orthopaedic Hospital](https://lda.data.parliament.uk/terms/12436) | Latin | 0.56 | 7 | `12436` |
| [HMY Britannia](https://lda.data.parliament.uk/terms/12582) | Latin | 0.56 | 2 | `12582` |
| [Surimi](https://lda.data.parliament.uk/terms/13138) | Latin | 0.56 | 1 | `13138` |
| [Analytica](https://lda.data.parliament.uk/terms/1382) | Latin | 0.56 | 1 | `1382` |
| [Operation Veritas](https://lda.data.parliament.uk/terms/13959) | Latin | 0.56 | 2 | `13959` |
| [Bectu](https://lda.data.parliament.uk/terms/16528) | Latin | 0.56 | 1 | `16528` |
| [Blaenau Gwent County Borough Council](https://lda.data.parliament.uk/terms/2018) | Welsh | 0.56 | 5 | `2018` |
| [CLAIRE](https://lda.data.parliament.uk/terms/20682) | French | 0.56 | 1 | `20682` |
| [Clingendael](https://lda.data.parliament.uk/terms/20797) | Dutch | 0.56 | 1 | `20797` |
| [AccomoData](https://lda.data.parliament.uk/terms/208) | Italian | 0.56 | 1 | `208` |
| [Constitution Group](https://lda.data.parliament.uk/terms/21196) | French | 0.56 | 2 | `21196` |
| [Cordiant Communications Group](https://lda.data.parliament.uk/terms/21508) | French | 0.56 | 3 | `21508` |
| [Citex](https://lda.data.parliament.uk/terms/24812) | Latin | 0.56 | 1 | `24812` |
| [HTV](https://lda.data.parliament.uk/terms/26123) | Dutch | 0.56 | 1 | `26123` |
| [Institute of Orthopaedics](https://lda.data.parliament.uk/terms/27263) | Latin | 0.56 | 3 | `27263` |
| [MV Cap Afrique](https://lda.data.parliament.uk/terms/28643) | French | 0.56 | 3 | `28643` |
| [Derbyloans](https://lda.data.parliament.uk/terms/28869) | Welsh | 0.56 | 1 | `28869` |
| [Richard Lloyd-George](https://lda.data.parliament.uk/terms/291141) | Welsh | 0.56 | 2 | `291141` |
| [Lloyd George, Richard](https://lda.data.parliament.uk/terms/291370) | Welsh | 0.56 | 3 | `291370` |
| [Muammar Gadafy](https://lda.data.parliament.uk/terms/291378) | Welsh | 0.56 | 2 | `291378` |
| [Richard Lloyd George](https://lda.data.parliament.uk/terms/291388) | Welsh | 0.56 | 3 | `291388` |
| [Lloyd-George, Richard](https://lda.data.parliament.uk/terms/291607) | Welsh | 0.56 | 2 | `291607` |
| [Lula da Silva, Luiz Inacio](https://lda.data.parliament.uk/terms/291672) | Portuguese | 0.56 | 5 | `291672` |
| [Luiz Inacio Lula da Silva](https://lda.data.parliament.uk/terms/291808) | Portuguese | 0.56 | 5 | `291808` |
| [Erudine](https://lda.data.parliament.uk/terms/297871) | Latin | 0.56 | 1 | `297871` |
| [Gadafy, Muammar](https://lda.data.parliament.uk/terms/298056) | Welsh | 0.56 | 2 | `298056` |
| [GEOAmey](https://lda.data.parliament.uk/terms/298248) | Welsh | 0.56 | 1 | `298248` |
| [Aparicio Sanchez, Pedro](https://lda.data.parliament.uk/terms/298890) | Spanish | 0.56 | 3 | `298890` |
| [Ashworth, Richard](https://lda.data.parliament.uk/terms/298933) | Welsh | 0.56 | 2 | `298933` |
| [Aviles Perea, Maria Antonia](https://lda.data.parliament.uk/terms/298964) | Latin | 0.56 | 4 | `298964` |
| [Compasso, Francesco](https://lda.data.parliament.uk/terms/299839) | Italian | 0.56 | 2 | `299839` |
| [Craigmyle, Lord](https://lda.data.parliament.uk/terms/299916) | Welsh | 0.56 | 2 | `299916` |
| [Davies, Dai](https://lda.data.parliament.uk/terms/300052) | Welsh | 0.56 | 2 | `300052` |
| [Derby, Earl of](https://lda.data.parliament.uk/terms/300149) | Welsh | 0.56 | 3 | `300149` |
| [Drumalbyn, Lord](https://lda.data.parliament.uk/terms/300253) | Welsh | 0.56 | 2 | `300253` |
| [Hayhoe, Lord](https://lda.data.parliament.uk/terms/301127) | Welsh | 0.56 | 2 | `301127` |
| [Linzer, Milan](https://lda.data.parliament.uk/terms/301920) | German | 0.56 | 2 | `301920` |
| [Lloyd, Ian](https://lda.data.parliament.uk/terms/301942) | Welsh | 0.56 | 2 | `301942` |
| [Madeira, Luis Philipe](https://lda.data.parliament.uk/terms/302064) | Portuguese | 0.56 | 3 | `302064` |
| [Moreau, Jacques](https://lda.data.parliament.uk/terms/302480) | French | 0.56 | 2 | `302480` |
| [Onwurah, Chi](https://lda.data.parliament.uk/terms/302750) | German | 0.56 | 2 | `302750` |
| [Peijs, KMH](https://lda.data.parliament.uk/terms/302897) | Dutch | 0.56 | 2 | `302897` |
| [Prys-Davies, Lord](https://lda.data.parliament.uk/terms/303078) | Welsh | 0.56 | 2 | `303078` |
| [Raffan, Keith](https://lda.data.parliament.uk/terms/303111) | Welsh | 0.56 | 2 | `303111` |
| [Rehder, Klaus](https://lda.data.parliament.uk/terms/303175) | German | 0.56 | 2 | `303175` |
| [Ruffolo, Giorgio](https://lda.data.parliament.uk/terms/303359) | Italian | 0.56 | 2 | `303359` |
| [Sainsbury, Timothy](https://lda.data.parliament.uk/terms/303398) | Welsh | 0.56 | 2 | `303398` |
| [Saridakis, Georgios](https://lda.data.parliament.uk/terms/303437) | Latin | 0.56 | 2 | `303437` |
| [Secchi, Carlo](https://lda.data.parliament.uk/terms/303516) | Italian | 0.56 | 2 | `303516` |
| [Seefeld, Horst](https://lda.data.parliament.uk/terms/303522) | German | 0.56 | 2 | `303522` |
| [Slynn of Hadley, Lord](https://lda.data.parliament.uk/terms/303635) | Welsh | 0.56 | 4 | `303635` |
| [Van Velzen, Willem J](https://lda.data.parliament.uk/terms/304163) | Dutch | 0.56 | 4 | `304163` |
| [Vayssade, Marie-Claude](https://lda.data.parliament.uk/terms/304180) | French | 0.56 | 2 | `304180` |
| [Viola, Vincenzo](https://lda.data.parliament.uk/terms/304220) | Italian | 0.56 | 2 | `304220` |
| [Wolf, Friedrich](https://lda.data.parliament.uk/terms/304464) | German | 0.56 | 2 | `304464` |
| [Zouche of Haryngworth, Lord](https://lda.data.parliament.uk/terms/304550) | Welsh | 0.56 | 4 | `304550` |
| [Aparicio Sanchez,Pedro](https://lda.data.parliament.uk/terms/305408) | Spanish | 0.56 | 2 | `305408` |
| [Aviles Perea,Maria Antonia](https://lda.data.parliament.uk/terms/305732) | Latin | 0.56 | 3 | `305732` |
| [Compasso,Francesco](https://lda.data.parliament.uk/terms/309620) | Italian | 0.56 | 1 | `309620` |
| [Linzer,Milan](https://lda.data.parliament.uk/terms/318632) | German | 0.56 | 1 | `318632` |
| [Madeira,Luis Philipe](https://lda.data.parliament.uk/terms/319302) | Portuguese | 0.56 | 2 | `319302` |
| [Moreau,Jacques](https://lda.data.parliament.uk/terms/321334) | French | 0.56 | 1 | `321334` |
| [Chi Onwurah](https://lda.data.parliament.uk/terms/322514) | German | 0.56 | 2 | `322514` |
| [Newton, Tony](https://lda.data.parliament.uk/terms/349611) | Welsh | 0.56 | 2 | `349611` |
| [Hakluyt Society](https://lda.data.parliament.uk/terms/35401) | Latin | 0.56 | 2 | `35401` |
| [HMCTS](https://lda.data.parliament.uk/terms/363250) | German | 0.56 | 1 | `363250` |
| [Girlguiding UK](https://lda.data.parliament.uk/terms/36517) | German | 0.56 | 2 | `36517` |
| [Grameen Bank](https://lda.data.parliament.uk/terms/36889) | Dutch | 0.56 | 2 | `36889` |
| [Grokster](https://lda.data.parliament.uk/terms/37182) | Dutch | 0.56 | 1 | `37182` |
| [Mauritius Republic Act 1992](https://lda.data.parliament.uk/terms/384200) | Latin | 0.56 | 4 | `384200` |
| [Vergnaud, Bernadette](https://lda.data.parliament.uk/terms/395546) | French | 0.56 | 2 | `395546` |
| [Lord Hayhoe](https://lda.data.parliament.uk/terms/399672) | Welsh | 0.56 | 2 | `399672` |
| [Lord Prys-Davies](https://lda.data.parliament.uk/terms/400480) | Welsh | 0.56 | 2 | `400480` |
| [Fraunhofer UK Research](https://lda.data.parliament.uk/terms/401392) | German | 0.56 | 3 | `401392` |
| [Oropharyngeal cancer](https://lda.data.parliament.uk/terms/405778) | Latin | 0.56 | 2 | `405778` |
| [Handelsbanken](https://lda.data.parliament.uk/terms/405946) | German | 0.56 | 1 | `405946` |
| [Tony Newton](https://lda.data.parliament.uk/terms/406892) | Welsh | 0.56 | 2 | `406892` |
| [Dai Davies](https://lda.data.parliament.uk/terms/406898) | Welsh | 0.56 | 2 | `406898` |
| [Lord Slynn of Hadley](https://lda.data.parliament.uk/terms/407247) | Welsh | 0.56 | 4 | `407247` |
| [Austrevicius, Petras](https://lda.data.parliament.uk/terms/408921) | Latin | 0.56 | 2 | `408921` |
| [Lord Craigmyle](https://lda.data.parliament.uk/terms/409434) | Welsh | 0.56 | 2 | `409434` |
| [Earl of Derby](https://lda.data.parliament.uk/terms/410132) | Welsh | 0.56 | 3 | `410132` |
| [Lord Zouche of Haryngworth](https://lda.data.parliament.uk/terms/411875) | Welsh | 0.56 | 4 | `411875` |
| [Ian Lloyd](https://lda.data.parliament.uk/terms/412313) | Welsh | 0.56 | 2 | `412313` |
| [Keith Raffan](https://lda.data.parliament.uk/terms/412377) | Welsh | 0.56 | 2 | `412377` |
| [Lord Drumalbyn](https://lda.data.parliament.uk/terms/413945) | Welsh | 0.56 | 2 | `413945` |
| [JW Lees](https://lda.data.parliament.uk/terms/41776) | Dutch | 0.56 | 2 | `41776` |
| [PCP](https://lda.data.parliament.uk/terms/422317) | Portuguese | 0.56 | 1 | `422317` |
| [AOD](https://lda.data.parliament.uk/terms/423412) | Welsh | 0.56 | 1 | `423412` |
| [Gonorrhoea](https://lda.data.parliament.uk/terms/425520) | Latin | 0.56 | 1 | `425520` |
| [Tonsils](https://lda.data.parliament.uk/terms/425549) | Latin | 0.56 | 1 | `425549` |
| [APPG](https://lda.data.parliament.uk/terms/428778) | Latin | 0.56 | 1 | `428778` |
| [Bremner](https://lda.data.parliament.uk/terms/4301) | Latin | 0.56 | 1 | `4301` |
| [Ramadhan, Mohammed](https://lda.data.parliament.uk/terms/430249) | French | 0.56 | 2 | `430249` |
| [HMP Perth](https://lda.data.parliament.uk/terms/434912) | Welsh | 0.56 | 2 | `434912` |
| [London Regeneration Consortium](https://lda.data.parliament.uk/terms/43593) | Latin | 0.56 | 3 | `43593` |
| [BIMH](https://lda.data.parliament.uk/terms/436670) | Irish | 0.56 | 1 | `436670` |
| [Williams and Glyn Fund](https://lda.data.parliament.uk/terms/440652) | Welsh | 0.56 | 4 | `440652` |
| [Alianza del Pacifico](https://lda.data.parliament.uk/terms/441174) | Italian | 0.56 | 3 | `441174` |
| [DHSC](https://lda.data.parliament.uk/terms/442439) | Irish | 0.56 | 1 | `442439` |
| [Hassan, Hajer Mansoor](https://lda.data.parliament.uk/terms/444693) | Dutch | 0.56 | 3 | `444693` |
| [Hajer Mansoor Hassan](https://lda.data.parliament.uk/terms/444695) | Dutch | 0.56 | 3 | `444695` |
| [ADCH](https://lda.data.parliament.uk/terms/446410) | Irish | 0.56 | 1 | `446410` |
| [Cripps, Michael Leonard Seddon](https://lda.data.parliament.uk/terms/447054) | Welsh | 0.56 | 4 | `447054` |
| [Michael Leonard Seddon Cripps](https://lda.data.parliament.uk/terms/447056) | Welsh | 0.56 | 4 | `447056` |
| [CRGV](https://lda.data.parliament.uk/terms/447351) | Dutch | 0.56 | 1 | `447351` |
| [Thun und Hohenstein, Roza Grafin von](https://lda.data.parliament.uk/terms/447417) | German | 0.56 | 6 | `447417` |
| [Bettws Hall](https://lda.data.parliament.uk/terms/450384) | Welsh | 0.56 | 2 | `450384` |
| [Gbagbo, Laurent](https://lda.data.parliament.uk/terms/452608) | French | 0.56 | 2 | `452608` |
| [Laurent Gbagbo](https://lda.data.parliament.uk/terms/452610) | French | 0.56 | 2 | `452610` |
| [Kausar, Shagufta](https://lda.data.parliament.uk/terms/456022) | Italian | 0.56 | 2 | `456022` |
| [Shagufta Kausar](https://lda.data.parliament.uk/terms/456024) | Italian | 0.56 | 2 | `456024` |
| [Jeffreys, Christopher Henry](https://lda.data.parliament.uk/terms/461531) | Welsh | 0.56 | 3 | `461531` |
| [Christopher Henry Jeffreys](https://lda.data.parliament.uk/terms/461533) | Welsh | 0.56 | 3 | `461533` |
| [Fyfe, George Lennox](https://lda.data.parliament.uk/terms/461952) | Welsh | 0.56 | 3 | `461952` |
| [George Lennox Fyfe](https://lda.data.parliament.uk/terms/461954) | Welsh | 0.56 | 3 | `461954` |
| [Cox, Roxbee](https://lda.data.parliament.uk/terms/463339) | Latin | 0.56 | 2 | `463339` |
| [Roxbee Cox](https://lda.data.parliament.uk/terms/463341) | Latin | 0.56 | 2 | `463341` |
| [Papur Sain Ceredigion Talking Newspaper](https://lda.data.parliament.uk/terms/466212) | Welsh | 0.56 | 5 | `466212` |
| [VAWG](https://lda.data.parliament.uk/terms/470107) | Welsh | 0.56 | 1 | `470107` |
| [Mohammed Ramadhan](https://lda.data.parliament.uk/terms/470461) | French | 0.56 | 2 | `470461` |
| [Davies, Brinley](https://lda.data.parliament.uk/terms/471936) | Welsh | 0.56 | 2 | `471936` |
| [Brinley Davies](https://lda.data.parliament.uk/terms/471938) | Welsh | 0.56 | 2 | `471938` |
| [Nemat Talaat Shafik](https://lda.data.parliament.uk/terms/472312) | Dutch | 0.56 | 3 | `472312` |
| [TAEG Energy](https://lda.data.parliament.uk/terms/473180) | Welsh | 0.56 | 2 | `473180` |
| [Cawdor Barracks](https://lda.data.parliament.uk/terms/474526) | Welsh | 0.56 | 2 | `474526` |
| [Panahghar](https://lda.data.parliament.uk/terms/477581) | French | 0.56 | 1 | `477581` |
| [Plums](https://lda.data.parliament.uk/terms/484151) | Latin | 0.56 | 1 | `484151` |
| [Phlebotomy](https://lda.data.parliament.uk/terms/488696) | Welsh | 0.56 | 1 | `488696` |
| [Matrix](https://lda.data.parliament.uk/terms/493846) | Latin | 0.56 | 1 | `493846` |
| [Constituents](https://lda.data.parliament.uk/terms/49489) | French | 0.56 | 1 | `49489` |
| [Covenants](https://lda.data.parliament.uk/terms/49530) | French | 0.56 | 1 | `49530` |
| [Cook, Liesl](https://lda.data.parliament.uk/terms/496104) | Dutch | 0.56 | 2 | `496104` |
| [Liesl Cook](https://lda.data.parliament.uk/terms/496106) | Dutch | 0.56 | 2 | `496106` |
| [Allwyn Entertainment](https://lda.data.parliament.uk/terms/496632) | Welsh | 0.56 | 2 | `496632` |
| [Old Saltleians RFC](https://lda.data.parliament.uk/terms/501972) | German | 0.56 | 3 | `501972` |
| [Stanley, Edward Richard William](https://lda.data.parliament.uk/terms/503274) | Welsh | 0.56 | 4 | `503274` |
| [Edward Richard William Stanley](https://lda.data.parliament.uk/terms/503278) | Welsh | 0.56 | 4 | `503278` |
| [John Tonge Anthony Pellew Addington](https://lda.data.parliament.uk/terms/505454) | Welsh | 0.56 | 5 | `505454` |
| [Addington, John Tonge Anthony Pellew](https://lda.data.parliament.uk/terms/505456) | Welsh | 0.56 | 5 | `505456` |
| [Benn, Stephen](https://lda.data.parliament.uk/terms/505496) | Welsh | 0.56 | 2 | `505496` |
| [Murray Chauffeur Services](https://lda.data.parliament.uk/terms/509306) | French | 0.56 | 3 | `509306` |
| [ESOS](https://lda.data.parliament.uk/terms/509819) | Spanish | 0.56 | 1 | `509819` |
| [Unorthodox medicine](https://lda.data.parliament.uk/terms/51287) | Latin | 0.56 | 2 | `51287` |
| [Nous Group](https://lda.data.parliament.uk/terms/513370) | French | 0.56 | 2 | `513370` |
| [National Centre for Accessible Transport](https://lda.data.parliament.uk/terms/513871) | French | 0.56 | 5 | `513871` |
| [Anjouan](https://lda.data.parliament.uk/terms/51731) | French | 0.56 | 1 | `51731` |
| [Ormskirk](https://lda.data.parliament.uk/terms/517622) | Welsh | 0.56 | 1 | `517622` |
| [Belorussia](https://lda.data.parliament.uk/terms/51791) | Latin | 0.56 | 1 | `51791` |
| [CERF](https://lda.data.parliament.uk/terms/51910) | Welsh | 0.56 | 1 | `51910` |
| [Cetacea](https://lda.data.parliament.uk/terms/51915) | Latin | 0.56 | 1 | `51915` |
| [Griffiths, Rachel](https://lda.data.parliament.uk/terms/520502) | Welsh | 0.56 | 2 | `520502` |
| [Rachel Griffiths](https://lda.data.parliament.uk/terms/520504) | Welsh | 0.56 | 2 | `520504` |
| [Peoples Ford Boghall and Bathgate Caledonia Pipe Band](https://lda.data.parliament.uk/terms/521942) | Welsh | 0.56 | 8 | `521942` |
| [Hughes, Vaughan](https://lda.data.parliament.uk/terms/525206) | Welsh | 0.56 | 2 | `525206` |
| [Vaughan Hughes](https://lda.data.parliament.uk/terms/525208) | Welsh | 0.56 | 2 | `525208` |
| [AEI](https://lda.data.parliament.uk/terms/54349) | Irish | 0.56 | 1 | `54349` |
| [AIIB](https://lda.data.parliament.uk/terms/54441) | Latin | 0.56 | 1 | `54441` |
| [ALCOA Aluminium](https://lda.data.parliament.uk/terms/54499) | Latin | 0.56 | 2 | `54499` |
| [Sipavibart](https://lda.data.parliament.uk/terms/545798) | Latin | 0.56 | 1 | `545798` |
| [Bayerische Moteren Werke](https://lda.data.parliament.uk/terms/54751) | German | 0.56 | 3 | `54751` |
| [Boord O Ulster Scots](https://lda.data.parliament.uk/terms/54929) | Dutch | 0.56 | 4 | `54929` |
| [HMYOI Hewell Grange](https://lda.data.parliament.uk/terms/555061) | Welsh | 0.56 | 3 | `555061` |
| [HMYOI Standford Hill](https://lda.data.parliament.uk/terms/555397) | Welsh | 0.56 | 3 | `555397` |
| [Uprichard, Penny](https://lda.data.parliament.uk/terms/556297) | Welsh | 0.56 | 2 | `556297` |
| [Engendering Change](https://lda.data.parliament.uk/terms/558679) | Dutch | 0.56 | 2 | `558679` |
| [OJAH](https://lda.data.parliament.uk/terms/564806) | German | 0.56 | 1 | `564806` |
| [National Situation Centre](https://lda.data.parliament.uk/terms/565157) | French | 0.56 | 3 | `565157` |
| [Sepiapterin](https://lda.data.parliament.uk/terms/566829) | Welsh | 0.56 | 1 | `566829` |
| [Tiberius Aerospace](https://lda.data.parliament.uk/terms/569376) | Latin | 0.56 | 2 | `569376` |
| [Shaheen, Hamza](https://lda.data.parliament.uk/terms/569589) | Dutch | 0.56 | 2 | `569589` |
| [Hamza Shaheen](https://lda.data.parliament.uk/terms/569591) | Dutch | 0.56 | 2 | `569591` |
| [National Organisation of Residents Associations](https://lda.data.parliament.uk/terms/57592) | French | 0.56 | 5 | `57592` |
| [Remus](https://lda.data.parliament.uk/terms/578295) | Latin | 0.56 | 1 | `578295` |
| [Labib, Ola](https://lda.data.parliament.uk/terms/582227) | Latin | 0.56 | 2 | `582227` |
| [Ola Labib](https://lda.data.parliament.uk/terms/582229) | Latin | 0.56 | 2 | `582229` |
| [Pereira, Vincent](https://lda.data.parliament.uk/terms/582453) | Portuguese | 0.56 | 2 | `582453` |
| [NHS Consultants Association](https://lda.data.parliament.uk/terms/58727) | French | 0.56 | 3 | `58727` |
| [Non-ferrous Alliance](https://lda.data.parliament.uk/terms/58924) | French | 0.56 | 2 | `58924` |
| [Peninsular Proteins](https://lda.data.parliament.uk/terms/61338) | Latin | 0.56 | 2 | `61338` |
| [Pontypool and Blaenavon Railway](https://lda.data.parliament.uk/terms/61599) | Welsh | 0.56 | 4 | `61599` |
| [Public Relations Consultants Association](https://lda.data.parliament.uk/terms/62376) | French | 0.56 | 4 | `62376` |
| [Schneider](https://lda.data.parliament.uk/terms/67595) | German | 0.56 | 1 | `67595` |
| [Social Science Association](https://lda.data.parliament.uk/terms/67834) | French | 0.56 | 3 | `67834` |
| [Steyr](https://lda.data.parliament.uk/terms/69294) | Welsh | 0.56 | 1 | `69294` |
| [CAAV](https://lda.data.parliament.uk/terms/73819) | Dutch | 0.56 | 1 | `73819` |
| [CCBI](https://lda.data.parliament.uk/terms/74023) | Latin | 0.56 | 1 | `74023` |
| [CRAE](https://lda.data.parliament.uk/terms/74945) | Latin | 0.56 | 1 | `74945` |
| [CSW](https://lda.data.parliament.uk/terms/75062) | Welsh | 0.56 | 1 | `75062` |
| [EPF](https://lda.data.parliament.uk/terms/75463) | German | 0.56 | 1 | `75463` |
| [Essex Constabulary](https://lda.data.parliament.uk/terms/75531) | Latin | 0.56 | 2 | `75531` |
| [GBIF](https://lda.data.parliament.uk/terms/76083) | Welsh | 0.56 | 1 | `76083` |
| [EKGB](https://lda.data.parliament.uk/terms/77294) | Dutch | 0.56 | 1 | `77294` |
| [ILG](https://lda.data.parliament.uk/terms/77626) | Irish | 0.56 | 1 | `77626` |
| [International Centre for Transitional Justice](https://lda.data.parliament.uk/terms/77891) | French | 0.56 | 5 | `77891` |
| [LAGTA](https://lda.data.parliament.uk/terms/78371) | Irish | 0.56 | 1 | `78371` |
| [NPFA](https://lda.data.parliament.uk/terms/78694) | German | 0.56 | 1 | `78694` |
| [Tattersalls](https://lda.data.parliament.uk/terms/82560) | German | 0.56 | 1 | `82560` |
| [Valuation Tribunal Service](https://lda.data.parliament.uk/terms/85519) | French | 0.56 | 3 | `85519` |
| [CJD](https://lda.data.parliament.uk/terms/9195) | Dutch | 0.56 | 1 | `9195` |
| [Transitional arrangements](https://lda.data.parliament.uk/terms/93322) | French | 0.56 | 2 | `93322` |
| [Croatia](https://lda.data.parliament.uk/terms/9498) | Latin | 0.56 | 1 | `9498` |
| [Diaphyseal aclasis](https://lda.data.parliament.uk/terms/9641) | Latin | 0.56 | 2 | `9641` |
| [NCPE](https://lda.data.parliament.uk/terms/96628) | Latin | 0.56 | 1 | `96628` |
| [NMTF](https://lda.data.parliament.uk/terms/97011) | German | 0.56 | 1 | `97011` |
| [PAFA](https://lda.data.parliament.uk/terms/98421) | Irish | 0.56 | 1 | `98421` |
| [PCFC](https://lda.data.parliament.uk/terms/98558) | French | 0.56 | 1 | `98558` |
| [Williams of Mostyn Commission](https://lda.data.parliament.uk/terms/100698) | Welsh | 0.55 | 4 | `100698` |
| [Trastuzumab](https://lda.data.parliament.uk/terms/10677) | Welsh | 0.55 | 1 | `10677` |
| [Leigh](https://lda.data.parliament.uk/terms/11301) | Irish | 0.55 | 1 | `11301` |
| [Millennium dome](https://lda.data.parliament.uk/terms/11682) | Latin | 0.55 | 2 | `11682` |
| [American Biographical Institute](https://lda.data.parliament.uk/terms/1291) | Latin | 0.55 | 3 | `1291` |
| [Bureau of Justice Assistance](https://lda.data.parliament.uk/terms/16763) | French | 0.55 | 4 | `16763` |
| [Architectural Press](https://lda.data.parliament.uk/terms/1714) | Latin | 0.55 | 2 | `1714` |
| [Clwyd Fire Service](https://lda.data.parliament.uk/terms/20843) | Welsh | 0.55 | 3 | `20843` |
| [ASW](https://lda.data.parliament.uk/terms/2695) | Welsh | 0.55 | 1 | `2695` |
| [Crescent International Petroleum](https://lda.data.parliament.uk/terms/27832) | Latin | 0.55 | 3 | `27832` |
| [Delitzsch UK](https://lda.data.parliament.uk/terms/28562) | German | 0.55 | 2 | `28562` |
| [Keohane, Daniel](https://lda.data.parliament.uk/terms/291124) | Welsh | 0.55 | 2 | `291124` |
| [Cryptosporidia](https://lda.data.parliament.uk/terms/298442) | Latin | 0.55 | 1 | `298442` |
| [Alyssandrakis, Konstantinos](https://lda.data.parliament.uk/terms/298843) | Latin | 0.55 | 2 | `298843` |
| [Burg, Ieke van den](https://lda.data.parliament.uk/terms/299449) | Dutch | 0.55 | 4 | `299449` |
| [Carnero Gonzalez, Carlos](https://lda.data.parliament.uk/terms/299587) | Spanish | 0.55 | 3 | `299587` |
| [Davies of Abersoch, Lord](https://lda.data.parliament.uk/terms/300041) | Welsh | 0.55 | 4 | `300041` |
| [Gwynne, Andrew](https://lda.data.parliament.uk/terms/300977) | Welsh | 0.55 | 2 | `300977` |
| [Hughes, Stephen](https://lda.data.parliament.uk/terms/301329) | Welsh | 0.55 | 2 | `301329` |
| [Mennea, Pietro-Paolo](https://lda.data.parliament.uk/terms/302365) | Italian | 0.55 | 2 | `302365` |
| [Van den Burg, Ieke](https://lda.data.parliament.uk/terms/304147) | Dutch | 0.55 | 4 | `304147` |
| [Alyssandrakis,Konstantinos](https://lda.data.parliament.uk/terms/305252) | Latin | 0.55 | 1 | `305252` |
| [Burg,Ieke van den](https://lda.data.parliament.uk/terms/307952) | Dutch | 0.55 | 3 | `307952` |
| [Carnero Gonzalez,Carlos](https://lda.data.parliament.uk/terms/308622) | Spanish | 0.55 | 2 | `308622` |
| [Andrew Gwynne](https://lda.data.parliament.uk/terms/314170) | Welsh | 0.55 | 2 | `314170` |
| [Mennea,Pietro-Paolo](https://lda.data.parliament.uk/terms/320756) | Italian | 0.55 | 1 | `320756` |
| [Dannatt, Lord](https://lda.data.parliament.uk/terms/347635) | Italian | 0.55 | 2 | `347635` |
| [AlixPartners](https://lda.data.parliament.uk/terms/349939) | German | 0.55 | 1 | `349939` |
| [HH Martyn](https://lda.data.parliament.uk/terms/36109) | Welsh | 0.55 | 2 | `36109` |
| [Analysys Mason](https://lda.data.parliament.uk/terms/368660) | German | 0.55 | 2 | `368660` |
| [Petrol Tax (Promulgation) Bill 1999/2000](https://lda.data.parliament.uk/terms/386432) | Latin | 0.55 | 5 | `386432` |
| [Bribery Bill (HL) 2009-10](https://lda.data.parliament.uk/terms/391687) | Welsh | 0.55 | 4 | `391687` |
| [Bureau Insurance Services](https://lda.data.parliament.uk/terms/397267) | French | 0.55 | 3 | `397267` |
| [Lord Dannatt](https://lda.data.parliament.uk/terms/399263) | Italian | 0.55 | 2 | `399263` |
| [Lord Davies of Abersoch](https://lda.data.parliament.uk/terms/399269) | Welsh | 0.55 | 4 | `399269` |
| [Invictus Games](https://lda.data.parliament.uk/terms/402790) | Latin | 0.55 | 2 | `402790` |
| [Bribery Bill [HL] 2009-10](https://lda.data.parliament.uk/terms/403581) | Welsh | 0.55 | 4 | `403581` |
| [Naranjo Escobar, Juan Andres](https://lda.data.parliament.uk/terms/405462) | Spanish | 0.55 | 4 | `405462` |
| [Altair](https://lda.data.parliament.uk/terms/409296) | Irish | 0.55 | 1 | `409296` |
| [James Seddon](https://lda.data.parliament.uk/terms/41325) | Welsh | 0.55 | 2 | `41325` |
| [Haigh, Louise](https://lda.data.parliament.uk/terms/416084) | Irish | 0.55 | 2 | `416084` |
| [Louise Haigh](https://lda.data.parliament.uk/terms/416321) | Irish | 0.55 | 2 | `416321` |
| [Familial hypercholesterolaemia](https://lda.data.parliament.uk/terms/427469) | Welsh | 0.55 | 2 | `427469` |
| [Libreria editrice vaticana](https://lda.data.parliament.uk/terms/42904) | Italian | 0.55 | 3 | `42904` |
| [DEEU](https://lda.data.parliament.uk/terms/432376) | Dutch | 0.55 | 1 | `432376` |
| [Trastuzumab emtansine](https://lda.data.parliament.uk/terms/433426) | Welsh | 0.55 | 2 | `433426` |
| [CPACC](https://lda.data.parliament.uk/terms/435793) | Italian | 0.55 | 1 | `435793` |
| [Ebony](https://lda.data.parliament.uk/terms/439162) | Welsh | 0.55 | 1 | `439162` |
| [IQVIA](https://lda.data.parliament.uk/terms/443133) | Italian | 0.55 | 1 | `443133` |
| [Britannia Health Care](https://lda.data.parliament.uk/terms/4451) | Latin | 0.55 | 3 | `4451` |
| [DFNHS](https://lda.data.parliament.uk/terms/445454) | German | 0.55 | 1 | `445454` |
| [Mark Hilliard](https://lda.data.parliament.uk/terms/44983) | German | 0.55 | 2 | `44983` |
| [Quantum Communications Hub](https://lda.data.parliament.uk/terms/451358) | Latin | 0.55 | 3 | `451358` |
| [Davies, Sally](https://lda.data.parliament.uk/terms/454703) | Welsh | 0.55 | 2 | `454703` |
| [Sally Davies](https://lda.data.parliament.uk/terms/454705) | Welsh | 0.55 | 2 | `454705` |
| [Hippopotami](https://lda.data.parliament.uk/terms/454957) | Latin | 0.55 | 1 | `454957` |
| [Maraviroc](https://lda.data.parliament.uk/terms/458875) | Latin | 0.55 | 1 | `458875` |
| [Adecco](https://lda.data.parliament.uk/terms/473199) | Italian | 0.55 | 1 | `473199` |
| [Pryde, Abigail](https://lda.data.parliament.uk/terms/479529) | Welsh | 0.55 | 2 | `479529` |
| [Abigail Pryde](https://lda.data.parliament.uk/terms/479551) | Welsh | 0.55 | 2 | `479551` |
| [Bacanora Lithium](https://lda.data.parliament.uk/terms/482823) | Latin | 0.55 | 2 | `482823` |
| [Enforcement agents](https://lda.data.parliament.uk/terms/483478) | French | 0.55 | 2 | `483478` |
| [Littoral warfare](https://lda.data.parliament.uk/terms/49209) | Italian | 0.55 | 2 | `49209` |
| [Glenys Thornton](https://lda.data.parliament.uk/terms/497458) | Welsh | 0.55 | 2 | `497458` |
| [William John Molloy](https://lda.data.parliament.uk/terms/500017) | Welsh | 0.55 | 3 | `500017` |
| [Intercontinental ballistic missiles](https://lda.data.parliament.uk/terms/50215) | Latin | 0.55 | 3 | `50215` |
| [Tabadlab](https://lda.data.parliament.uk/terms/510652) | Welsh | 0.55 | 1 | `510652` |
| [Edenderry Presbyterian Church](https://lda.data.parliament.uk/terms/512258) | Welsh | 0.55 | 3 | `512258` |
| [Kelly, Rory](https://lda.data.parliament.uk/terms/513627) | Welsh | 0.55 | 2 | `513627` |
| [Rory Kelly](https://lda.data.parliament.uk/terms/513629) | Welsh | 0.55 | 2 | `513629` |
| [Mirhashemi, Saleh](https://lda.data.parliament.uk/terms/516823) | Welsh | 0.55 | 2 | `516823` |
| [Saleh Mirhashemi](https://lda.data.parliament.uk/terms/516910) | Welsh | 0.55 | 2 | `516910` |
| [Holodomor](https://lda.data.parliament.uk/terms/516986) | Latin | 0.55 | 1 | `516986` |
| [IPTF](https://lda.data.parliament.uk/terms/52596) | Latin | 0.55 | 1 | `52596` |
| [BFTA](https://lda.data.parliament.uk/terms/54217) | Dutch | 0.55 | 1 | `54217` |
| [Kirby, Terry](https://lda.data.parliament.uk/terms/551848) | Welsh | 0.55 | 2 | `551848` |
| [Terry Kirby](https://lda.data.parliament.uk/terms/551850) | Welsh | 0.55 | 2 | `551850` |
| [HMYOI Styal](https://lda.data.parliament.uk/terms/555409) | Welsh | 0.55 | 2 | `555409` |
| [Spiorad na Mara](https://lda.data.parliament.uk/terms/557099) | Irish | 0.55 | 3 | `557099` |
| [SumUp](https://lda.data.parliament.uk/terms/557451) | Latin | 0.55 | 1 | `557451` |
| [Foulkes, Lucy](https://lda.data.parliament.uk/terms/560493) | Welsh | 0.55 | 2 | `560493` |
| [Lucy Foulkes](https://lda.data.parliament.uk/terms/560495) | Welsh | 0.55 | 2 | `560495` |
| [Satavia](https://lda.data.parliament.uk/terms/563275) | Latin | 0.55 | 1 | `563275` |
| [Friedrich-Loeffler-Institut](https://lda.data.parliament.uk/terms/564892) | German | 0.55 | 1 | `564892` |
| [NQTP](https://lda.data.parliament.uk/terms/565622) | French | 0.55 | 1 | `565622` |
| [Y Nuen, Ayun](https://lda.data.parliament.uk/terms/567963) | Spanish | 0.55 | 3 | `567963` |
| [Nexus Institute](https://lda.data.parliament.uk/terms/58697) | Latin | 0.55 | 2 | `58697` |
| [Noble Organisation](https://lda.data.parliament.uk/terms/58901) | French | 0.55 | 2 | `58901` |
| [Peter Boddy](https://lda.data.parliament.uk/terms/61522) | Welsh | 0.55 | 2 | `61522` |
| [SSAFA](https://lda.data.parliament.uk/terms/68064) | Welsh | 0.55 | 1 | `68064` |
| [Scout Association](https://lda.data.parliament.uk/terms/69607) | French | 0.55 | 2 | `69607` |
| [Therexsys](https://lda.data.parliament.uk/terms/83562) | Latin | 0.55 | 1 | `83562` |
| [TRM](https://lda.data.parliament.uk/terms/84190) | Latin | 0.55 | 1 | `84190` |
| [Air Transport Action Group](https://lda.data.parliament.uk/terms/863) | French | 0.55 | 4 | `863` |
| [Archaeology](https://lda.data.parliament.uk/terms/90242) | Welsh | 0.55 | 1 | `90242` |
| [Carcinogens](https://lda.data.parliament.uk/terms/90447) | Latin | 0.55 | 1 | `90447` |
| [NAEE](https://lda.data.parliament.uk/terms/96194) | Latin | 0.55 | 1 | `96194` |
| [NERIP](https://lda.data.parliament.uk/terms/96678) | Latin | 0.55 | 1 | `96678` |
| [NIAER](https://lda.data.parliament.uk/terms/96879) | Latin | 0.55 | 1 | `96879` |
| [NICEC](https://lda.data.parliament.uk/terms/96897) | Latin | 0.55 | 1 | `96897` |
