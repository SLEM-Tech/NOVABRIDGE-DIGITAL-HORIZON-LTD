import AppLayout from "@src/components/AppLayout";
import AppMenu from "@src/components/Navbars/AppMenu";
import MainCategorySection from "@src/components/PageFragments/MainCategorySection";
import { query } from "@src/lib/db";
import { T } from "@src/lib/tables";

export async function generateStaticParams() {
	try {
		const rows = await query<{ id: number; slug: string }>(
			`SELECT id, slug FROM ${T.categories}`,
		);
		return rows.map((c) => ({ id: `${c.slug}-${c.id}` }));
	} catch {
		return [];
	}
}

const page = async () => {
	return (
		<AppLayout>
			<main className='w-full mt-36 slg:mt-44 px-3 sm:px-6 lg:px-10 mx-auto max-w-screen-xl pb-16'>
				<MainCategorySection />
			</main>
			<AppMenu />
		</AppLayout>
	);
};

export default page;
