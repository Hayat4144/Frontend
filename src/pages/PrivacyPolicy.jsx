import React, { Fragment, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import NavbarSkeleton from '../Skeleton/NavbarSkeleton';
import Footer from '../layout/Footer';
const Navbar = lazy(() => import('../layout/Nav/Navbar'))


const PrivacyPolicy = () => {
    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <div className='privacy-policy-box my-10 shadow-lg rounded-md px-2 md:px-5 py-5 mx-2 border border-gray-300 sm:mx-10 md:mx-auto md:w-[80%]'>
                <h1 className="text-2xl font-bold mb-4 text-center">Privacy Policy</h1>
                <p className="mb-4">
                    At [Your Company], we value the privacy of our users and are committed to protecting their personal information. This Privacy Policy describes how we collect, use, store, and disclose your information when you use our B2B eCommerce platform. By accessing or using our platform, you agree to the collection and use of your information as described in this policy.
                </p>

                <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
                <p className="mb-4">
                    We collect various types of information from you when you interact with our platform, including:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Your name, email address, phone number, and other contact information.</li>
                    <li>Company details, such as company name, address, and industry.</li>
                    <li>Billing and shipping address for order processing.</li>
                    <li>Payment information, such as credit card details (which are securely processed and stored by our trusted payment service providers).</li>
                    <li>Information about your interactions with our platform, including browsing activity, order history, and customer support inquiries.</li>
                    <li>Any other information you voluntarily provide to us.</li>
                </ul>

                <h2 className="text-xl font-bold mb-2">How We Use Your Information</h2>
                <p className="mb-4">
                    We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Providing and improving our B2B eCommerce platform and services.</li>
                    <li>Processing and fulfilling your orders and requests.</li>
                    <li>Communicating with you, including sending transactional emails, updates, and promotional offers.</li>
                    <li>Customizing your experience on our platform and tailoring our product offerings to your needs.</li>
                    <li>Conducting research and analysis to enhance and optimize our platform.</li>
                    <li>Ensuring the security and integrity of our platform and preventing fraud or unauthorized access.</li>
                    <li>Complying with legal obligations and resolving disputes.</li>
                </ul>

                <h2 className="text-xl font-bold mb-2">Data Security</h2>
                <p className="mb-4">
                    We take data security seriously and employ industry-standard measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. We utilize encryption, firewalls, secure protocols, and access controls to safeguard your data. However, please note that no method of transmission or storage over the internet can be guaranteed as completely secure. We encourage you to use strong passwords, keep your login credentials confidential, and inform us immediately if you suspect any unauthorized activity.
                </p>

                <h2 className="text-xl font-bold mb-2">Data Retention</h2>
                <p className="mb-4">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. We will securely delete or anonymize your information when it is no longer needed.
                </p>

                <h2 className="text-xl font-bold mb-2">Third-Party Service Providers</h2>
                <p className="mb-4">
                    We may engage trusted third-party service providers to assist us in operating our platform and delivering our services. These service providers may have access to your personal information for the purpose of performing tasks on our behalf, such as hosting, data analysis, payment processing, order fulfillment, and customer support. We ensure that these providers are bound by strict confidentiality obligations and that they only use your information in accordance with our instructions and for the purposes specified in this Privacy Policy.
                </p>

                <h2 className="text-xl font-bold mb-2">Your Choices and Rights</h2>
                <p className="mb-4">
                    You have certain rights and choices regarding your personal information:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>You can access, update, or delete your personal information by logging into your account settings or contacting our customer support team.</li>
                    <li>You can manage your communication preferences by opting in or out of receiving promotional emails or other marketing communications.</li>
                    <li>You can choose not to provide certain information, but please note that it may impact your ability to use certain features of our platform.</li>
                    <li>You may have additional rights under applicable laws, such as the right to restrict or object to the processing of your personal information or the right to data portability. Please contact us for further information about exercising these rights.</li>
                </ul>

                <h2 className="text-xl font-bold mb-2">Transparency</h2>
                <p className="mb-4">
                    We are committed to being transparent about our data practices. This Privacy Policy provides detailed information about how we collect, use, store, and disclose your personal information. If you have any questions, concerns, or requests regarding your information or this policy, please contact us using the contact information provided at the end of this document.
                </p>

                <h2 className="text-xl font-bold mb-2">Children information</h2>
                <p className='mb-4'>
                    Use of our Platform is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. We do not knowingly solicit or collect personal information from children under the age of 18 years. If you have shared any personal information of children under the age of 18 years, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy.
                </p>
                <h2 className="text-xl font-bold mb-2">Cookies</h2>
                <p className="mb-4">
                    We use data collection devices such as "cookies" on certain pages of the Platform to help analyse our web page flow, measure promotional effectiveness, and promote trust and safety. "Cookies" are small files placed on your hard drive that assist us in providing our services. Cookies do not contain any of your personal information. We offer certain features that are only available through the use of a "cookie". We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests. Most cookies are "session cookies," meaning that they are automatically deleted from your hard drive at the end of a session. You are always free to decline/delete our cookies if your browser permits, although in that case you may not be able to use certain features on the Platform and you may be required to re-enter your password more frequently during a session. Additionally, you may encounter "cookies" or other similar devices on certain pages of the Platform that are placed by third parties. We do not control the use of cookies by third parties. We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics help us understand how our customers use the site. You can read more about how Google uses your personal information here: https://www.google.com/intl/en/policies/privacy/. You can opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout. You can also control the use of cookies at the individual browser level, but if you choose to disable cookies, it may limit your use of certain features or functions on the services.
                </p>



                <h2 className="text-xl font-bold mb-2">Updates to This Policy</h2>
                <p className="mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our platform or by sending you an email. Please review this policy periodically to stay informed about how we collect, use, and protect your information.
                </p>

                <p>
                    If you have any questions or concerns about our Privacy Policy, please <Link to="/contact" className="text-blue-500">contact us</Link>.
                </p>
            </div>
            <Footer />
        </Fragment>
    );
};

export default PrivacyPolicy;
