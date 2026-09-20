# ADA Ceramics 全站 SEO 关键词布局报告

> B 端外贸陶瓷工厂 · 四大 Silo 结构 · 谷歌高转化采购搜索逻辑
> 覆盖品类：Dinnerware（含 Serveware/Serve Dishes）、Bakeware、Table Decor & Drinkware（含 Drinkware）、OEM Custom Ceramics
> 品类映射：四大品类（Dinnerware / Serveware / Bakeware / Drinkware）已对齐到现有四大 Silo——Serveware 作为 serveware/serving platters 语义词并入 Dinnerware，Drinkware 归入 Table Decor & Drinkware；OEM/ODM 作为统一附加属性词（`OEM/ODM custom [品类]` + `custom logo private label [品类]`）成对埋入三个产品 Silo，OEM Custom Ceramics 本身即定制 Silo 故不叠加。
> 最后更新：四大品类关键词对齐 + OEM/ODM 附加属性词布局后同步

---

## 1. 关键词分层策略

按谷歌 B 端采购意图，将关键词分为四层，逐页交叉布局：

| 层级 | 定义 | 代表词 | 主要埋入页面 |
| --- | --- | --- | --- |
| **大流量采购词（Head）** | 高搜索量品类根词 + 采购意图修饰 | `wholesale ceramic tableware`、`bulk dinner plates`、`ceramic mug manufacturer` | 首页、L1、L2 |
| **高转化定制词（Commercial）** | 直接对应下单意图的定制服务词 | `OEM/ODM ceramics`、`custom logo printing`、`private label ceramics`、`new mold development` | 首页、OEM Silo、各级 |
| **长尾词（Long-tail）** | 具体品类 + 规格/用途组合 | `oven-safe ceramic baking dish bulk`、`cappuccino cups saucers supplier`、`soufflé ramekins wholesale` | L2、L3 |
| **场景词（Scenario）** | 采购方身份 / 使用场景 | `restaurant hotel tableware supplier`、`Horeca ceramic tableware`、`café branded mugs`、`bakery supply bakeware` | 首页、L1、L2、采购标签 |
| **信任词（Trust）** | 合规与交易保障，提升转化 | `FDA LFGB certified`、`low MOQ`、`lead-free glaze`、`factory direct` | 全层级 |

### 埋入位置（字段 → 渲染出口）

| 配置字段 | 渲染为 | SEO 作用 |
| --- | --- | --- |
| `metaTitle` | `<title>`（layout 自动追加品牌名） | 主排名信号 |
| `metaDescription` | `<meta name="description">` | 点击率（CTR） |
| `metaKeywords` | `<meta name="keywords">` | 词库归档 |
| `h1` | 页面唯一 `<H1>` | 页面主题信号 |
| `keyword` | 图片 `alt`（经 `buildAlt()`）+ L3 关键词模板插值 | 图片搜索 + 模板词根 |
| `seo.*`（长文） | 页面正文 H2/段落 | 语义相关性、长尾覆盖 |
| `procurement.tags` | 采购场景内链标签 | 场景词 + 内链权重 |
| `faqs` | FAQPage 结构化数据 | 富摘要、问答长尾 |

---

## 2. 首页（`/[locale]`）

**文件**：`app/[locale]/page.tsx` → `export const metadata`

| 位置 | 关键词布局 |
| --- | --- |
| **Title** | Wholesale Custom Ceramic Tableware Manufacturer \| Dinnerware, Bakeware, Decor Drinkware & OEM/ODM \| ADA Ceramics |
| **Description** | factory-direct wholesale custom ceramic tableware manufacturer、OEM/ODM supplier、bulk ceramic dinnerware、oven-safe bakeware、table decor drinkware、custom logo printing、private-label、FDA & LFGB、low MOQ |
| **Keywords** | wholesale ceramic tableware manufacturer / custom ceramic tableware supplier / bulk ceramic dinnerware / wholesale ceramic bakeware manufacturer / custom ceramic mugs wholesale / OEM ceramics manufacturer / ODM ceramics factory / private label ceramics / custom logo ceramics / FDA LFGB ceramic factory / restaurant hotel tableware supplier / Horeca ceramic tableware / ceramic tableware factory China |
| **OpenGraph** | 同步覆盖四大 Silo + OEM/ODM + 信任词 |
| **策略** | 四大词根权重均分，Head + Commercial + Scenario + Trust 全层交叉 |

---

## 3. 一级分类页 L1（`lib/silo/config.ts`）

### 3.1 Dinnerware（`/[locale]/dinnerware`）

| 字段 | 关键词 |
| --- | --- |
| **H1** | Wholesale Ceramic Dinnerware Manufacturer for Restaurants, Hotels & Catering |
| **metaTitle** | Wholesale Ceramic Dinnerware Supplier \| Bulk Plates, Bowls & Sets \| OEM |
| **metaKeywords** | wholesale ceramic dinnerware / bulk dinner plates / ceramic dinnerware supplier / restaurant dinnerware wholesale / hotel tableware supplier / porcelain dinnerware manufacturer / **wholesale ceramic serveware** / **serving platters supplier** / custom porcelain dinnerware / **OEM/ODM custom dinnerware** / **custom logo private label dinnerware** / chip-resistant restaurant plates / commercial grade stoneware dinnerware / catering dinnerware bulk / FDA LFGB certified dinnerware |
| **keyword（alt 词根）** | dinnerware |

### 3.2 Bakeware（`/[locale]/bakeware`）

| 字段 | 关键词 |
| --- | --- |
| **H1** | Wholesale Ceramic Bakeware Manufacturer \| Oven-Safe Baking Dishes for Bulk Buyers |
| **metaTitle** | Wholesale Ceramic Bakeware Manufacturer \| Oven-Safe Baking Dishes & Ramekins |
| **metaKeywords** | wholesale ceramic bakeware / ceramic bakeware manufacturer / bulk baking dish supplier / stoneware bakeware wholesale / **OEM/ODM custom bakeware** / **custom logo private label bakeware** / factory direct ceramic kitchenware / oven-safe ceramic baking dish bulk / thermal shock resistant bakeware / wholesale ramekins casseroles / lead-free glaze bakeware / FDA LFGB bakeware supplier |
| **keyword（alt 词根）** | bakeware |

### 3.3 Table Decor & Drinkware（`/[locale]/table-decor-drinkware`）

| 字段 | 关键词 |
| --- | --- |
| **H1** | Wholesale Ceramic Drinkware & Table Decor Manufacturer for Cafés & Retail |
| **metaTitle** | Wholesale Ceramic Drinkware & Table Decor \| Custom Mugs, Vases & Jars |
| **metaKeywords** | custom ceramic mugs wholesale / wholesale drinkware supplier / ceramic mug manufacturer / bulk coffee mugs / custom logo mugs bulk / **OEM/ODM custom drinkware** / **custom logo private label drinkware** / custom printed mugs wholesale / sublimation mugs wholesale / ceramic vases bulk / café branded mugs / table decor supplier / ceramic storage jars wholesale / candle holders bulk |
| **keyword（alt 词根）** | table decor and drinkware |

### 3.4 OEM Custom Ceramics（`/[locale]/oem-custom-ceramics`）

| 字段 | 关键词 |
| --- | --- |
| **H1** | OEM/ODM Custom Ceramics Manufacturer \| Private-Label Tableware Service |
| **metaTitle** | OEM Custom Ceramics Manufacturer \| Private-Label Tableware ODM Factory |
| **metaKeywords** | ceramic OEM manufacturer / ODM ceramics factory / custom ceramic manufacturer China / private label ceramics / custom logo printing ceramics / custom glaze color development / new mold development ceramics / private label packaging ceramics / contract ceramic manufacturing / ceramic tableware OEM low MOQ / ceramic ODM lead time / FDA LFGB ceramic factory / branded tableware manufacturer |
| **keyword（alt 词根）** | custom OEM ceramics |

---

## 4. 二级子分类页 L2（`lib/silo/l2-config.ts`）

> 字段：`metaTitle` / `metaDescription` / `metaKeywords` / `h1` / `keyword`（alt 词根）+ `seo` 长文 + `procurement` 场景标签 + `faqs`

### Dinnerware 下属 L2

| 子分类 | 路径 | metaKeywords 核心词 |
| --- | --- | --- |
| Plates | `/dinnerware/plates` | wholesale ceramic plates / bulk dinner plates / dessert side plates wholesale / charger plates bulk / coupe plates supplier / chip-resistant restaurant plates / custom logo dinner plates / OEM private label plates / hotel catering plates bulk |
| Bowls | `/dinnerware/bowls` | wholesale ceramic bowls / bulk soup bowls / ramen noodle bowl manufacturer / cereal/pasta/rice/snack bowls / custom logo bowls / OEM ODM ceramic bowls / restaurant catering bowls bulk / low MOQ ceramic bowls |
| Dinnerware Sets | `/dinnerware/dinnerware-sets` | wholesale ceramic dinnerware sets / hotel dinnerware supplier / porcelain dinner set manufacturer / coupe & stackable sets / retail gift sets / private label OEM dinner sets / custom branded dinnerware collection / low MOQ custom tableware factory |
| Serve Dishes（Serveware） | `/dinnerware/serve-dishes` | wholesale serve dishes / bulk ceramic serving platters / ceramic serveware supplier / oval platters / buffet serving bowls / banquet platters / family-style dishes / custom branded serveware / OEM ODM serving platters |

### Bakeware 下属 L2

| 子分类 | 路径 | metaKeywords 核心词 |
| --- | --- | --- |
| Ramekin Bowls | `/bakeware/ramekin-bowls` | wholesale ramekins / bulk ceramic ramekins / ceramic ramekin bowls supplier / oven-safe ramekins / soufflé ramekins wholesale / crème brûlée dishes bulk / dipping sauce pots / OEM custom branded ramekins / FDA LFGB ramekins |
| Baking Dishes & Casseroles | `/bakeware/baking-dishes-casseroles` | wholesale baking dishes / bulk ceramic casseroles / ceramic casserole dish manufacturer / oven-to-table bakeware / lasagne gratin dishes / lidded casserole / thermal shock resistant baking dish / OEM custom casseroles |
| Loaf, Pie & Pizza Pans | `/bakeware/loaf-pie-pizza-pans` | wholesale loaf pans / bulk ceramic pizza pans / ceramic pie dish supplier / loaf bread pan manufacturer / quiche dish wholesale / bakery supply bakeware / OEM custom baking pans / FDA LFGB pizza pans |

### Table Decor & Drinkware 下属 L2

| 子分类 | 路径 | metaKeywords 核心词 |
| --- | --- | --- |
| Cups & Mugs（Drinkware） | `/table-decor-drinkware/cups-mugs` | custom ceramic mugs wholesale / bulk coffee mugs / ceramic mug manufacturer / cappuccino cups saucers / espresso cups / custom logo mugs bulk / branded gift mugs / sublimation mugs wholesale / OEM ceramic mugs / café branded mugs bulk |
| Vases | `/table-decor-drinkware/vases` | wholesale ceramic vases / bulk decorative vases / ceramic vase manufacturer / bud vases / table centerpiece vases / floor statement vases / hospitality decor vases / custom branded vases / OEM ODM vase development |
| Storage & Condiment Jars | `/table-decor-drinkware/storage-condiment-jars` | wholesale ceramic storage jars / bulk airtight canisters / ceramic condiment jars supplier / spice jars / sauce condiment pots / sealed storage jar manufacturer / deli pantry storage / custom branded jars |
| Serving Trays | `/table-decor-drinkware/serving-trays` | wholesale ceramic serving trays / bulk display trays / ceramic tray manufacturer / tasting snack trays / rectangular presentation trays / round display trays / café hotel service trays / custom branded trays |
| Candle Holders | `/table-decor-drinkware/candle-holders` | wholesale ceramic candle holders / bulk tealight votive holders / ceramic candle holder manufacturer / pillar & taper holders / hospitality ambiance decor / home accent candle holders / custom branded holders |

### OEM Custom Ceramics 下属 L2

| 子分类 | 路径 | metaKeywords 核心词 |
| --- | --- | --- |
| Custom Logo Printing | `/oem-custom-ceramics/custom-logo-printing` | custom logo printing ceramics / decal logo printing / pad print mugs / silk screen ceramic printing / branded ceramics OEM / private label logo printing / custom logo mugs bulk / low MOQ custom logo ceramics |
| Custom Glaze & Color | `/oem-custom-ceramics/custom-glaze-color` | custom glaze development / ceramic color matching / bespoke glaze factory / reactive & matte glaze / custom color ceramics manufacturer / Pantone glaze matching / lead-free glaze development / OEM ODM glaze service |
| New Mold Development | `/oem-custom-ceramics/new-mold-development` | new mold development / custom ceramic tooling / ceramic mold factory / bespoke ceramic shapes / proprietary design OEM / custom shape ceramics manufacturer / made-to-order ceramic mold / low MOQ custom mold |
| OEM & ODM Case Studies | `/oem-custom-ceramics/oem-odm-case-studies` | OEM ceramic case studies / ODM project examples / private label tableware projects / custom ceramics portfolio / branded ceramic projects / hotel restaurant OEM projects / contract ceramic manufacturing examples |

---

## 5. 产品详情页 L3（动态模板）

**文件**：`app/[locale]/dinnerware/[l2]/[l3]/page.tsx`、`.../bakeware/...`、`.../table-decor-drinkware/...`
**机制**：`generateMetadata` 用产品名 `name` + 所属 L2 的 `keyword` / `parentLabel` 动态插值。

| 字段 | 模板 |
| --- | --- |
| **Title** | `{产品名} | Wholesale {L2 label} | ADA Ceramics` |
| **Description** | 优先用产品库描述，缺省回退到含 FDA/LFGB + low MOQ + OEM/ODM + 场景词的模板（Drinkware 用 café/hospitality/retail + 食品安全；Dinnerware/Bakeware 用 oven-safe + restaurant/hotel/bakery） |
| **Keywords** | `wholesale {name}, bulk {kw}, {kw} supplier, custom {kw}, OEM ODM {kw}, private label {kw}, wholesale {parentLabel} manufacturer, FDA LFGB {kw}, low MOQ {kw}`（Drinkware 额外加 `custom logo {kw}`） |
| **Canonical** | `https://www.adaceramics.com/{locale}/{silo}/{l2}/{l3}` |

> 说明：OEM Custom Ceramics Silo 为服务型，仅有 L1 + L2 服务页，无 L3 产品详情路由。

---

## 6. 闭环与一致性校验

- **层级闭环**：首页 → L1（4 大 Silo）→ L2（15 子分类）→ L3（产品）关键词逐级收窄，词根一脉相承（如 dinnerware → plates → 具体产品名）。
- **slug 一致**：本次仅重写关键词承载字段，未改动任何 slug / 路由 / 面包屑，沿用既有四大 Silo 闭环，零死链风险。
- **四品类对齐**：四大品类语义已映射进现有 Silo——Serveware（serveware / serving platters）补入 Dinnerware L1 的 metaKeywords，Drinkware 归 Table Decor & Drinkware；未新增或调整任何 Silo 架构。
- **OEM/ODM 附加属性词**：三个产品 Silo 的 metaKeywords 统一成对埋入 `OEM/ODM custom [品类]` + `custom logo private label [品类]`（替换原先分散的单 `OEM ...` 写法），OEM Custom Ceramics Silo 因本身即定制 Silo 未叠加。
- **alt 修复**：修正了 `ramekin-bowls` 的 `keyword` 字段（原误填长串逗号词导致图片 alt 关键词堆砌），改为干净短语 `ramekin bowls`。
- **场景文案修复**：修正 Table Decor & Drinkware L3 描述回退文案（原错误沿用 "oven-safe... bakeries"，已改为 café/hospitality/retail + food-safe）。
- **类型校验**：`tsc --noEmit` 通过（仅余 1 个与本次无关的既有 `tailwind.config.ts` darkMode 报错）。
