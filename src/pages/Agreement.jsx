import Header from "../components/Header";
import Footer from "../components/Footer";

const Agreement = () => {
  return (
    <div className="min-h-screen bg-[rgba(235,235,235,1)] text-black flex flex-col relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-20 pb-32">
        <div className="hidden lg:block absolute left-0 top-40">
          <img
            src="/legal-docs/left-scopium.png"
            alt="Info icon"
            className=" opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 top-[50rem]">
          <img
            src="/legal-docs/right-flame.png"
            alt="Security icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-2 bottom-[650rem]">
          <img
            src="/legal-docs/left-flame.png"
            alt="Check icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 bottom-[550rem]">
          <img
            src="/legal-docs/left-scopium.png"
            alt="Layout icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 bottom-[450rem]">
          <img
            src="/legal-docs/left-flame.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 bottom-[350rem]">
          <img
            src="/legal-docs/right-scopium.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 bottom-[250rem]">
          <img
            src="/legal-docs/right-flame.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 bottom-[150rem]">
          <img
            src="/legal-docs/left-scopium.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>
        <div className="hidden lg:block absolute left-0 bottom-[100rem]">
          <img
            src="/legal-docs/left-flame.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>
        <div className="hidden lg:block absolute left-0 bottom-[40rem]">
          <img
            src="/legal-docs/right-scopium.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        {/* Right Side Icons */}
        <div className="hidden lg:block absolute right-0 top-80">
          <img
            src="/legal-docs/scopium-f-right.png"
            alt="Info icon"
            className=" opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute right-2 top-[150rem]">
          <img
            src="/legal-docs/left-flame.png"
            alt="Check icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute right-0 top-[250rem]">
          <img
            src="/legal-docs/Scopium-o-right.png"
            alt="Layout icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute right-0 top-[350rem]">
          <img
            src="/legal-docs/left-flame.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute right-0 top-[450rem]">
          <img
            src="/legal-docs/flame-o-right.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>
        <div className="hidden lg:block absolute right-0 top-[550rem]">
          <img
            src="/legal-docs/Scopium-o-right.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Main Content Container */}
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="h-24"></div>

            {/* Page Title */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold  mb-4">
                CONTRACTOR NON-DISCLOSURE AGREEMENT
              </h2>
              <p className="text-lg 600">
                (This Contractor NDA is entered into as of DATE)
              </p>
            </div>

            {/* Disclaimer Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              <section className="mb-12">
                <div className=" mb-8">
                  <h3 className="text-2xl font-bold  mb-6 pb-2">
                    INTRODUCTION
                  </h3>
                  <p className=" mt-4">
                    This Contractor Non-Disclosure Agreement (“Agreement”) is
                    entered into by and between: <br />
                    Scopium, operating under the legal names{" "}
                    <span className="font-bold">Scopium</span> and{" "}
                    <span className="font-bold">Scopium Exchange </span>, a
                    company organized and existing under the laws of the United
                    Kingdom with its principal place of business at London, UK,
                    and with primary domains at scopium.com and scopium.io
                    (hereinafter, “Company”), <br />
                    <span className="font-bold">AND</span> <br />
                    __________________________ (Contractor’s Full Legal Name),
                    residing at or organized under the laws of
                    __________________________, with contact information at
                    __________________________ / and mailing address at:
                    __________________________ (hereinafter, “Contractor”). Each
                    may be referred to individually as a “Party” and
                    collectively as the “Parties.” <br />
                    WHEREAS, the Company is engaged in the operation of a
                    cryptocurrency platform for the creation and trading of
                    digital tokens, as well as a streaming and donation service
                    (the “Platform”); <br />
                    WHEREAS, the Contractor has been or will be engaged to
                    provide certain services to the Company, which may include
                    access to sensitive and confidential information related to
                    the Company’s business operations, user data, marketing
                    strategies, intellectual property, and/or technological
                    infrastructure; <br />
                    WHEREAS, the Company desires to protect the confidentiality
                    of its proprietary information, and the Contractor agrees to
                    maintain strict confidentiality in accordance with the terms
                    of this Agreement; <br />
                    NOW, THEREFORE, in consideration of the mutual covenants and
                    promises set forth herein, and for other good and valuable
                    consideration, the receipt and sufficiency of which are
                    hereby acknowledged, the Parties agree as follows:
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h3 className="text-2xl font-bold  mb-4 pb-2">
                  1. DEFINITIONS
                </h3>

                <p className=" mb-6">
                  For the purpose of this Agreement, the following terms shall
                  have the meanings set forth below:
                </p>

                <div className="pl-5">
                  <h4 className="text-[18px] font-bold text-black mb-4">
                    1.1 “Confidential Information”
                  </h4>
                  <p className=" mb-2">
                    means all non-public, proprietary, confidential, or trade
                    secret information, whether oral, written, electronic, or in
                    any other form, disclosed or made available by the Company
                    to the Contractor, whether before or after the Effective
                    Date, including without limitation:
                  </p>
                  <ul className="list-disc list-inside  mb-6 space-y-2">
                    <li>
                      Source code, software, algorithms, smart contracts,
                      blockchain architecture;
                    </li>
                    <li>
                      User data and analytics (excluding anonymized or publicly
                      available data);
                    </li>
                    <li>
                      Product specifications, prototypes, designs, and system
                      architecture;
                    </li>
                    <li>
                      Business plans, strategic documents, financial models,
                      investment or fundraising information;
                    </li>
                    <li>
                      Marketing plans, research, campaigns, and customer
                      acquisition data;
                    </li>
                    <li>
                      Internal communications, technical documentation, and
                      operational workflows;
                    </li>
                    <li>
                      Information disclosed by third parties to the Company
                      under obligations of confidentiality.
                    </li>
                  </ul>
                  <h4 className="text-[18px] font-bold text-black mb-4">
                    1.2 “Excluded Information”
                  </h4>
                  <p className=" mb-2">
                    shall not include any information that:
                  </p>
                  <p className=" mb-6">
                    ( a ) was already known to the Contractor without
                    restriction at the time of disclosure by theCompany; <br />
                    ( b ) becomes publicly available through no breach of this
                    Agreement by the Contractor; <br />( c ) is lawfully
                    obtained by the Contractor from a third party without any
                    breach of a confidentiality obligation; or <br />( d ) is
                    independently developed by the Contractor without reference
                    to or use of the Company’s Confidential Information.
                  </p>
                  <h4 className="text-[18px] font-bold text-black mb-2">
                    1.3 “Purpose”
                  </h4>
                  <p className=" mb-6">
                    means the Contractor’s performance of services for the
                    Company, including but not limited to{" "}
                    <span className="font-bold">
                      Website Design, Blockchain Coding
                    </span>
                    , or other specified services in connection with the
                    development, maintenance, marketing, or security of the
                    Scopium Platform.
                  </p>
                  <h4 className="text-[18px] font-bold text-black mb-2">
                    1.4 “Trade Secret”
                  </h4>
                  <p className=" mb-6">
                    means any Confidential Information that derives independent
                    economic value from not being generally known to the public
                    or readily ascertainable by others who can obtain economic
                    value from its disclosure or use, and which is the subject
                    of reasonable efforts to maintain its secrecy.
                  </p>
                  <h4 className="text-[18px] font-bold text-black mb-2">
                    1.5 “Effective Date”
                  </h4>
                  <p className=" mb-6">
                    means the date on which this Agreement is executed by the
                    last of the Parties to sign below.
                  </p>
                </div>
              </section>
              <section className="mb-12">
                <h3 className="text-2xl font-bold mb-6">
                  SECTION 1: CONFIDENTIALITY OBLIGATIONS
                </h3>
                <div className="pl-5">
                  <p className="mb-2 text-[18px] font-bold">
                    1.1 Duty of Non-Disclosure
                  </p>
                  <p className=" mb-6">
                    The Contractor agrees that, both during the term of their
                    engagement with the Company and for a period of{" "}
                    <span className="font-bold">three (3) years</span>{" "}
                    thereafter, they shall not, without the prior written
                    consent of the Company, disclose, communicate, or make
                    available to any third party, in any manner whatsoever, any
                    portion of the Confidential Information, except as expressly
                    permitted in this Agreement or required by applicable law.
                  </p>
                  <p className=" mb-2 text-[18px] font-bold">
                    1.2 Duty of Care
                  </p>
                  <p className=" mb-6">
                    The Contractor shall use the same degree of care, but in no
                    event less than a reasonable degree of care, to protect the
                    confidentiality of the Confidential Information as the
                    Contractor uses to protect their own confidential and
                    proprietary information of like kind.
                  </p>
                  <p className=" mb-2 text-[18px] font-bold">
                    1.3 Purpose-Only Use
                  </p>
                  <p className=" mb-6">
                    The Contractor shall use the Confidential Information solely
                    for the Purpose as defined in Section 1.3 above and for no
                    other purpose whatsoever, including, without limitation,
                    reverse engineering, decompiling, developing competing
                    platforms, or creating derivative works.
                  </p>
                  <p className=" mb-2 text-[18px] font-bold">
                    1.4 Employees, Agents, and Subcontractors
                  </p>
                  <p className=" mb-6">
                    The Contractor may disclose Confidential Information only to
                    those of its employees, agents, or permitted subcontractors
                    (“Authorized Recipients”) who have a legitimate need to know
                    such information in order to carry out the Purpose. The
                    Contractor shall ensure that all such Authorized Recipients
                    are bound by confidentiality obligations at least as
                    protective as those contained in this Agreement. The
                    Contractor shall remain fully responsible for any breach of
                    this Agreement by any such Authorized Recipient.
                  </p>
                  <p className=" mb-2 text-[18px] font-bold">
                    1.5 Disclosure by Legal Requirement
                  </p>
                  <p className=" mb-6">
                    If the Contractor is compelled by law, regulation, or court
                    order to disclose any Confidential Information, they shall
                    provide the Company with prompt written notice (to the
                    extent legally permitted) so that the Company may seek a
                    protective order or other appropriate remedy. If disclosure
                    is ultimately required, the Contractor shall only disclose
                    the portion of the Confidential Information legally required
                    and shall cooperate in the Company’s efforts to obtain
                    confidential treatment for such disclosure.
                  </p>
                  <p className=" mb-2 text-[18px] font-bold">
                    1.6 Equitable Relief
                  </p>
                  <p className=" mb-6">
                    The Contractor acknowledges and agrees that any unauthorized
                    disclosure or use of Confidential Information may cause
                    irreparable harm to the Company for which monetary damages
                    may be inadequate. Accordingly, the Company shall be
                    entitled to seek equitable relief, including injunction and
                    specific performance, without the necessity of posting bond
                    or proving actual damages, in addition to all other remedies
                    available at law or in equity.
                  </p>
                </div>
              </section>
              <section className="mb-12">
                <h3 className="text-2xl font-bold mb-6">
                  SECTION 1: CONFIDENTIALITY OBLIGATIONS
                </h3>
                <div className="pl-5">
                  <p className="mb-2 text-[18px] font-bold">
                    1.1 Duty of Non-Disclosure
                  </p>
                  <p className=" mb-6">
                    The Contractor agrees that, both during the term of their
                    engagement with the Company and for a period of{" "}
                    <span className="font-bold">three (3) years</span>{" "}
                    thereafter, they shall not, without the prior written
                    consent of the Company, disclose, communicate, or make
                    available to any third party, in any manner whatsoever, any
                    portion of the Confidential Information, except as expressly
                    permitted in this Agreement or required by applicable law.
                  </p>
                  <p className=" mb-2 text-[18px] font-bold">
                    1.2 Duty of Care
                  </p>
                  <p className=" mb-6">
                    The Contractor shall use the same degree of care, but in no
                    event less than a reasonable degree of care, to protect the
                    confidentiality of the Confidential Information as the
                    Contractor uses to protect their own confidential and
                    proprietary information of like kind.
                  </p>
                  <p className=" mb-2 text-[18px] font-bold">
                    1.3 Purpose-Only Use
                  </p>
                  <p className=" mb-6">
                    The Contractor shall use the Confidential Information solely
                    for the Purpose as defined in Section 1.3 above and for no
                    other purpose whatsoever, including, without limitation,
                    reverse engineering, decompiling, developing competing
                    platforms, or creating derivative works.
                  </p>
                  <p className=" mb-2 text-[18px] font-bold">
                    1.4 Employees, Agents, and Subcontractors
                  </p>
                  <p className=" mb-6">
                    The Contractor may disclose Confidential Information only to
                    those of its employees, agents, or permitted subcontractors
                    (“Authorized Recipients”) who have a legitimate need to know
                    such information in order to carry out the Purpose. The
                    Contractor shall ensure that all such Authorized Recipients
                    are bound by confidentiality obligations at least as
                    protective as those contained in this Agreement. The
                    Contractor shall remain fully responsible for any breach of
                    this Agreement by any such Authorized Recipient.
                  </p>
                  <p className=" mb-2 text-[18px] font-bold">
                    1.5 Disclosure by Legal Requirement
                  </p>
                  <p className=" mb-6">
                    If the Contractor is compelled by law, regulation, or court
                    order to disclose any Confidential Information, they shall
                    provide the Company with prompt written notice (to the
                    extent legally permitted) so that the Company may seek a
                    protective order or other appropriate remedy. If disclosure
                    is ultimately required, the Contractor shall only disclose
                    the portion of the Confidential Information legally required
                    and shall cooperate in the Company’s efforts to obtain
                    confidential treatment for such disclosure.
                  </p>
                  <p className=" mb-2 text-[18px] font-bold">
                    1.6 Equitable Relief
                  </p>
                  <p className=" mb-6">
                    The Contractor acknowledges and agrees that any unauthorized
                    disclosure or use of Confidential Information may cause
                    irreparable harm to the Company for which monetary damages
                    may be inadequate. Accordingly, the Company shall be
                    entitled to seek equitable relief, including injunction and
                    specific performance, without the necessity of posting bond
                    or proving actual damages, in addition to all other remedies
                    available at law or in equity.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Agreement;
