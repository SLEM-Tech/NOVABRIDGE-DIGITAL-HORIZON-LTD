import AppLayout from "@src/components/AppLayout";
import AllCategorySection from "@src/components/PageFragments/AllCategorySection";
import SortedProducts from "./(Home)/_components/SortedProducts";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
import AppMenu from "@src/components/Navbars/AppMenu";
import FaqAccordion from "@src/components/Reusables/Accordion/FaqAccordion";
import { query } from "@src/lib/db";
import { T } from "@src/lib/tables";
import { hydrateProducts } from "@src/lib/productHelpers";

const { description, title, ogImage, keywords } = SEODATA.home;
export const metadata: Metadata = {
	title: title,
	description: description,
	keywords: keywords,
	icons: ogImage,
	openGraph: {
		images: [{ url: ogImage ?? "" }],
	},
};

async function fetchHomeData() {
	const categoryRows = await query(
		`SELECT id, name, slug, description, parent_id, image_url, count
     FROM ${T.categories}
     WHERE count > 0
     ORDER BY name ASC
     LIMIT 6`,
	);

	const categories: CategoryType[] = categoryRows.map((c: any) => ({
		id: c.id,
		name: c.name,
		slug: c.slug,
		description: c.description ?? "",
		parent: c.parent_id ?? 0,
		count: c.count,
		image: c.image_url
			? { id: 0, src: c.image_url, name: "", alt: "", date_created: "", date_created_gmt: "", date_modified: "", date_modified_gmt: "" }
			: null,
		display: "default",
		menu_order: 0,
		_links: { self: [], collection: [] },
	}));

	if (!categories.length) return { categories, categoryProductsMap: {}, allProducts: [] };

	const catIds = categories.map((c) => c.id);
	const placeholders = catIds.map((_, i) => `$${i + 1}`).join(", ");
	const productRows = await query(
		`SELECT DISTINCT p.*, pc.category_id
     FROM ${T.products} p
     JOIN ${T.productCategories} pc ON pc.product_id = p.id
     WHERE pc.category_id IN (${placeholders}) AND p.status = 'publish'
     ORDER BY p.created_at DESC`,
		catIds,
	);

	const rowsByCat: { [key: string]: any[] } = {};
	for (const row of productRows) {
		const key = row.category_id.toString();
		if (!rowsByCat[key]) rowsByCat[key] = [];
		if (rowsByCat[key].length < 10) rowsByCat[key].push(row);
	}

	const uniqueRows = Object.values(
		productRows.reduce((acc: any, row: any) => { if (!acc[row.id]) acc[row.id] = row; return acc; }, {}),
	);
	const hydrated = await hydrateProducts(uniqueRows as any[]);
	const hydratedMap = hydrated.reduce((acc: any, p: any) => { acc[p.id] = p; return acc; }, {});

	const categoryProductsMap: { [key: string]: ProductType[] } = {};
	for (const [catId, rows] of Object.entries(rowsByCat)) {
		categoryProductsMap[catId] = rows.map((r: any) => hydratedMap[r.id]).filter(Boolean);
	}

	return { categories, categoryProductsMap, allProducts: hydrated };
}

const page = async () => {
	const { categories, categoryProductsMap, allProducts } = await fetchHomeData();
	return (
		<AppLayout>
			<AllCategorySection
				initialProducts={allProducts}
				initialCategories={categories}
			/>
	
			<div className='pt-4 px-2 sm:px-0 mx-auto max-w-[1256px] mt-6 sm:mt-12'>
				<div className='mt-4 sm:mt-3'>
					<section className='flex w-full flex-col items-center pt-16 text-center'>
						<h3 className='font-semibold text-xl sm:text-2xl slg:text-4xl tracking-tighter'>
							Frequently Asked Question
						</h3>
						<FaqAccordion />
					</section>
				</div>
			</div>
			<AppMenu />
		</AppLayout>
	);
};

export default page;
