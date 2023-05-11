import React, { Fragment, lazy, Suspense } from 'react'
const Navbar = lazy(() => import('./Navbar'))
const Footer = lazy(() => import('../layout/Footer'))
import NavbarSkeleton from '../Skeleton/NavbarSkeleton'
export default function Term_Conditions() {
    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <main className='term_conditions my-10 mx-auto w-7/12'>
                <h3 className='text-2xl font-bold uppercase hover:text-indigo-800 px-2 my-5 text-center'>Our Terms and Conditions</h3>
                <ol className='space-y-5 list-decimal text-justify' typeof='number'>
                    <li>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at [{document.domain}].</li>
                    <li>By using our Website, you accepted these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use our Website.</li>
                    <li>Intellectual Property Rights: Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.</li>
                    <li>License to use website: You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.</li>
                    <li>Acceptable use: You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.</li>
                    <li>User-generated content: In these terms and conditions, “your user content” means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to our website, for whatever purpose.</li>
                    <li>Your user content must not be illegal or unlawful, must not infringe any third party's legal rights, and must not be capable of amounting to a criminal offence or give rise to a civil liability, or otherwise be contrary to the law of any country or territory where it is or may be published or received.</li>
                    <li>Indemnity: You agree to indemnify us, and our directors, officers, employees and agents, from and against any claims, actions or suits or proceedings, as well as any resulting damages, liabilities, settlements and expenses (including reasonable legal fees) brought against us or any of our directors, officers, employees, agents or assigns arising out of or in any way connected with your use of our website or your breach of these terms and conditions.</li>
                    <li>
                        Breaches of these terms and conditions: Without prejudice to our other rights under these terms and conditions, if you breach these terms and conditions in any way, or we reasonably suspect that you have breached these terms and conditions in any way, we may:
                    </li>
                    <li>Governing Law & Jurisdiction: These Website Standard Terms and Conditions will be governed by and construed in accordance with the laws of the country of [Country], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Country] for the resolution of any disputes.</li>
                </ol>
            </main>
            <Suspense fallback={<p>loading...</p>}>
                <Footer />
            </Suspense>
        </Fragment>
    )
}
