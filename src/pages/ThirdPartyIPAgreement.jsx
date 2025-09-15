import Header from "../components/Header";
import Footer from "../components/Footer";

const ThirdPartyIPAgreement = () => {
  return (
    <div className="min-h-screen bg-[rgba(235,235,235,1)] flex flex-col relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-24 pb-32">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-black">
          {/* Main Content Container */}
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h2 className="text-[clamp(32px,6vw,36px)] font-bold mb-4 leading-[1.2] text-start lg:text-center">
                TERMS AND CONDITIONS OF USETHIRD-PARTY CONTRACTOR IP ASSIGNMENT
                AND OWNERSHIP AGREEMENT
              </h2>
              <p className="text-start lg:text-center">(This Agreement is made effective as of DATE)</p>
            </div>

            {/* Terms Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              <section className="mb-12">
                <h3 className="text-2xl font-bold  mb-4 border-b border-gray-300 pb-2">
                  INTRODUCTION
                </h3>

                <p className=" mb-6">
                  This Third-Party Contractor IP Assignment and Ownership
                  Agreement (the “Agreement”) is entered into by and between:{" "}
                  <br />
                  <span className="font-bold">Scopium</span>, operating under
                  the legal names <span className="font-bold">Scopium</span> and{" "}
                  <span className="font-bold">Scopium Exchange</span>, a company
                  duly organized and existing under the laws Exchange, a company
                  duly organized and existing under the laws of the United
                  Kingdom with its principal place of business in London, UK,
                  and with primary domain names scopium.com and scopium.io (the
                  “Company”), <br /> <span className="font-bold">AND</span>
                  ______________________________________________ <br />{" "}
                  <span className="font-bold">
                    Contractor’s Full Legal Name
                  </span>
                  , an independent contractor, freelancer, or third-party vendor
                  with a principal address at <br />
                  ______________________________________________, email: <br />
                  ______________________________________________, and operating
                  in the capacity of a technology or creative service provider
                  (the “Contractor”). <br /> Each may be referred to
                  individually as a “Party” and collectively as the “Parties.”
                </p>

                <h3 className="text-2xl font-bold  mb-4 border-b border-gray-300 pb-2">
                  RECITALS
                </h3>

                <p className=" mb-4">
                  WHEREAS, the Company is engaged in the operation of a digital
                  platform that enables the creation and trading of
                  cryptocurrency tokens, as well as a streaming-based content
                  and donation service (the “Platform”); <br />
                  WHEREAS, the Company desires to retain the Contractor to
                  provide certain work product and services, which may include
                  the development of code, smart contracts, graphics, user
                  interfaces, documentation, or other intellectual property
                  (“Deliverables”) that are critical to the growth and
                  functioning of the Platform; <br /> WHEREAS, the Company
                  requires that all Deliverables created by the Contractor in
                  the course of such engagement be assigned in full to the
                  Company to ensure clear ownership of intellectual property and
                  related rights; <br /> WHEREAS, the Contractor agrees to
                  assign all rights, title, and interest in such Deliverables to
                  the Company and to warrant the originality and
                  non-infringement of the work product provided; <br /> NOW,
                  THEREFORE, in consideration of the mutual promises and
                  covenants herein, and for other valuable consideration, the
                  receipt and adequacy of which are hereby acknowledged, the
                  Parties agree as follows:
                </p>
              </section>

              <section className="mb-12">
                <h3 className="text-2xl font-bold  mb-2 border-b border-gray-300 pb-2">
                  1. DEFINITIONS
                </h3>

                <p className=" mb-6">
                  For the purposes of this Agreement, the following terms shall
                  have the meanings set forth below:
                </p>

                <div className="pl-5">
                  <h3 className="text-[18px] font-bold mb-2">
                    1.1 “Deliverables”
                  </h3>
                  <p className="mb-2">
                    Means all tangible and intangible materials created,
                    authored, developed, conceived, or reduced to practice by
                    the Contractor in the course of performing services for the
                    Company, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>
                      Source code, smart contracts, algorithms, APIs, scripts,
                      and backend components;
                    </li>
                    <li>
                      UI/UX designs, wireframes, layouts, and interactive
                      features;
                    </li>
                    <li>
                      Graphics, animations, icons, branding materials, and
                      digital assets;
                    </li>
                    <li>
                      Technical documentation, specifications, flowcharts,
                      manuals, and presentation decks;
                    </li>
                    <li>
                      Any derivative works, enhancements, modifications, or
                      improvements to Company IP.
                    </li>
                  </ul>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.2 “Background Technology”
                  </h3>
                  <p className="mb-6">
                    Means any pre-existing intellectual property, software
                    tools, libraries, frameworks, data models, methodologies, or
                    other technology owned, developed, or licensed by the
                    Contractor prior to or independently of the services
                    performed under this Agreement, including open-source
                    components that may be incorporated into the Deliverables.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.3 “Company IP”
                  </h3>
                  <p className="mb-6">
                    Means any intellectual property owned, licensed, or
                    controlled by the Company at any time, including any
                    copyrights, trademarks, patents, trade secrets, know-how,
                    and proprietary processes used in or relating to the Scopium
                    Platform.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.4 “Moral Rights”
                  </h3>
                  <p className="mb-6">
                    Refers to any rights of attribution, integrity, disclosure,
                    withdrawal, or any similar rights recognized in any
                    jurisdiction that pertain to an author’s relationship to a
                    work, even after assignment of copyright.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.5 “Assignment Trigger”
                  </h3>
                  <p className="mb-6">
                    Means the event or milestone upon which the ownership of
                    Deliverables is transferred from Contractor to Company,
                    which may be defined as automatic upon creation, delivery,
                    or completion of payment under agreed terms.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.6 “Acceptance Criteria”
                  </h3>
                  <p className="mb-6">
                    Means the objective technical, functional, aesthetic, and
                    performance standards or project milestones mutually agreed
                    upon by the Parties, which must be met in order for
                    Deliverables to be deemed complete and acceptable.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.7 “Open-Source Component”
                  </h3>
                  <p className="mb-6">
                    Means any third-party software or code provided under a
                    license such as MIT, GPL, Apache, or similar, which is
                    incorporated by the Contractor into the Deliverables, and
                    whose use may carry distribution, attribution, or disclosure
                    obligations.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.8 “Effective Date”
                  </h3>
                  <p className="mb-6">
                    Means the date on which this Agreement is executed by the
                    last of the Parties to sign below.
                  </p>
                </div>
              </section>
              <section className="mb-12">
                <h3 className="text-2xl font-bold  mb-2 border-b border-gray-300 pb-2">
                  SECTION 1: OWNERSHIP AND ASSIGNMENT OF RIGHTS
                </h3>

                <div className="pl-5">
                  <h3 className="text-[18px] font-bold mb-2">
                    1.1 Assignment of Deliverables
                  </h3>
                  <p className="mb-6">
                    The Contractor hereby irrevocably assigns, transfers, and
                    conveys to the Company, its successors and assigns, all
                    worldwide right, title, and interest in and to all
                    Deliverables (as defined above), including all intellectual
                    property rights therein, whether such rights arise under
                    copyright, patent, trade secret, design right, or any other
                    legal or equitable theory. This assignment shall be
                    effective automatically upon creation of each Deliverable,
                    regardless of the timing of payment or delivery.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.2 Work Made for Hire
                  </h3>
                  <p className="mb-6">
                    To the extent permitted under applicable law, all
                    Deliverables created under this Agreement shall be
                    considered “work made for hire” as defined under U.S. and
                    U.K. copyright law. Where any Deliverable does not qualify
                    as a “work made for hire,” the Contractor agrees that the
                    rights therein shall be assigned to the Company as provided
                    in Section 1.1.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.3 No Retained Rights or Licenses
                  </h3>
                  <p className="mb-6">
                    Except as expressly provided in this Agreement, the
                    Contractor shall retain no rights or licenses in or to any
                    Deliverables. The Contractor shall not use, reproduce,
                    modify, or disclose any Deliverable for any purpose outside
                    of this engagement without the prior written consent of the
                    Company.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.4 Moral Rights Waiver
                  </h3>
                  <p className="mb-6">
                    To the fullest extent permitted by applicable law, the
                    Contractor hereby irrevocably waives, and agrees not to
                    assert or enforce, any and all Moral Rights in or with
                    respect to the Deliverables, including the right to be
                    identified as the author and the right to object to
                    derogatory treatment.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.5 Background Technology
                  </h3>
                  <p className="mb-6">
                    If the Contractor intends to incorporate any Background
                    Technology into the Deliverables, it must: <br /> ( a )
                    Clearly identify such Background Technology in writing
                    before incorporating it; <br /> ( b ) Demonstrate that it
                    was developed independently and owned prior to engagement;
                    and <br /> ( c ) Grant to the Company a{" "}
                    <span className="font-bold">
                      perpetual, irrevocable, worldwide, royalty-free,
                      sublicensable license
                    </span>{" "}
                    to use, modify, distribute, and commercialize such
                    Background Technology as part of or in connection with the
                    Deliverables.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.6 Open-Source Components
                  </h3>
                  <p className="mb-6">
                    If any open-source software is incorporated into the
                    Deliverables, the Contractor shall provide a written list of
                    such components, including their respective licenses (e.g.,
                    MIT, GPL, Apache). The Contractor shall ensure that use of
                    such components complies with their respective license
                    obligations and does not conflict with the Company’s
                    commercial use or ownership of the overall Deliverables.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.7 Future Assistance and Filings
                  </h3>
                  <p className="mb-6">
                    The Contractor agrees to provide reasonable assistance, at
                    the Company’s expense, in the preparation, prosecution,
                    maintenance, or enforcement of any intellectual property
                    rights related to the Deliverables, including execution of
                    documents and cooperation in filing applications for
                    patents, copyrights, trademarks, or similar rights.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h3 className="text-2xl font-bold  mb-6 border-b border-gray-300 pb-2">
                  SECTION 2: PAYMENT TERMS AND MILESTONES
                </h3>

                <div className="pl-5">
                  <h3 className="text-[18px] font-bold mb-2">
                    2.1 Compensation Structure
                  </h3>
                  <p className="mb-2">
                    The Contractor shall be compensated as follows:
                  </p>
                  <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>
                      <span className="font-bold">Payment Type:</span>{" "}
                      Insert"fixedfee,""hourlyrate,""milestone−based,"or"tokenallocation"Insert
                      "fixed fee," "hourly rate," "milestone-based," or "token
                      allocation"Insert"fixedfee,""hourlyrate,""milestone−based,"or"tokenallocation",
                      as agreed in a separate written scope or work order.
                    </li>
                    <li>
                      <span className="font-bold">Currency/Method:</span>{" "}
                      Payments shall be made in fiat currency (USD/GBP/EUR) or
                      in cryptocurrency/token as mutually agreed, via bank
                      transfer, digital wallet, or other approved method.
                    </li>
                    <li>
                      <span className="font-bold">Invoicing Schedule:</span>{" "}
                      Contractor shall submit invoices upon completion of each
                      milestone or monthly (if hourly), subject to Company
                      review and acceptance.
                    </li>
                  </ul>
                  <h3 className="text-[18px] font-bold mb-2">
                    2.2 Acceptance Criteria
                  </h3>
                  <p className="mb-6">
                    Each Deliverable submitted by the Contractor shall be
                    subject to the Company’s review to ensure compliance with
                    agreed technical, functional, and aesthetic requirements.
                    The Company shall have{" "}
                    <span className="font-bold">seven (7) business days</span>{" "}
                    from delivery to accept or reject a Deliverable. If
                    rejected, the Contractor shall remedy any deficiencies
                    within a reasonable time at no additional cost.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    2.3 Assignment Trigger
                  </h3>
                  <p className="mb-6">
                    The full assignment of rights under Section 1 shall occur
                    automatically upon the{" "}
                    <span className="font-bold">creation</span> of the
                    Deliverable, but may be conditioned upon the Company’s{" "}
                    <span className="font-bold">full payment</span> for such
                    Deliverable or{" "}
                    <span className="font-bold">
                      successful completion of a specified milestone
                    </span>
                    , as indicated in writing or in the applicable statement of
                    work.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    2.4 No Lien or Retention
                  </h3>
                  <p className="mb-6">
                    The Contractor shall not retain any lien, license, or
                    security interest in the Deliverables, code, or work product
                    pending payment. The Contractor waives any right to withhold
                    access, disable functionality, or revoke use of the
                    Deliverables for any reason once delivered.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    2.5 Taxes and Withholding
                  </h3>
                  <p className="mb-6">
                    Unless expressly agreed otherwise, all fees and payments are
                    inclusive of any applicable taxes, levies, or VAT/GST. The
                    Contractor shall be responsible for reporting and paying any
                    taxes due in their own jurisdiction. The Company may
                    withhold taxes as required by applicable law and shall
                    provide documentation of such withholdings.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    2.6 Token Allocations (If Applicable)
                  </h3>
                  <p className="mb-6">
                    If the Contractor is compensated in whole or in part through
                    cryptocurrency or token allocations: <br /> ( a ) Such
                    tokens shall be subject to vesting, lock-up, or delivery
                    schedules as set forth in writing; <br /> ( b ) The Company
                    does not warrant or guarantee any particular token
                    valuation, utility, or listing; <br /> ( c ) The Contractor
                    represents and warrants that they understand the speculative
                    and volatile nature of digital assets and assumes full risk
                    related to token-based compensation.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.7 “Open-Source Component”
                  </h3>
                  <p className="mb-6">
                    Means any third-party software or code provided under a
                    license such as MIT, GPL, Apache, or similar, which is
                    incorporated by the Contractor into the Deliverables, and
                    whose use may carry distribution, attribution, or disclosure
                    obligations.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    1.8 “Effective Date”
                  </h3>
                  <p className="mb-6">
                    Means the date on which this Agreement is executed by the
                    last of the Parties to sign below.
                  </p>
                </div>
              </section>
              <section className="mb-12">
                <h3 className="text-2xl font-bold  mb-2 border-b border-gray-300 pb-2">
                  SECTION 3: WARRANTIES, INDEMNITIES & COMPLIANCE
                </h3>

                <div className="pl-5">
                  <h3 className="text-[18px] font-bold mb-2">
                    3.1 Warranty of Original Work
                  </h3>
                  <p className="mb-6">
                    The Contractor represents and warrants that: <br /> ( a )
                    All Deliverables provided under this Agreement shall be the
                    Contractor’s original work, and shall not infringe,
                    misappropriate, or violate any intellectual property rights,
                    privacy rights, moral rights, or contractual obligations of
                    any third party; <br /> ( b ) No part of the Deliverables
                    has been copied or adapted from any other work unless
                    disclosed and licensed as set forth in Sections 1.5 and 1.6
                    above; <br /> ( c ) The Contractor has full right and
                    authority to enter into this Agreement and assign the rights
                    granted herein, without violating the terms of any agreement
                    with a third party.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    3.2 Warranty Period
                  </h3>
                  <p className="mb-6">
                    The Contractor warrants that the Deliverables will conform
                    to the applicable specifications and will be free from
                    material defects in design, functionality, and workmanship
                    for a period of{" "}
                    <span className="font-bold">thirty (30) days</span>{" "}
                    following final acceptance by the Company. During this
                    period, the Contractor shall, at no additional cost, correct
                    or replace any Deliverables that fail to meet this standard.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    3.3 Indemnification
                  </h3>
                  <p className="mb-6">
                    The Contractor agrees to indemnify, defend, and hold
                    harmless the Company, its affiliates, officers, directors,
                    employees, contractors, investors, and end users from and
                    against any and all claims, losses, damages, liabilities,
                    costs, and expenses (including reasonable attorney’s fees)
                    arising from: <br /> ( a ) Any allegation that the
                    Deliverables or any portion thereof infringes or
                    misappropriates the intellectual property rights of any
                    third party; <br /> ( b ) Any breach of the representations,
                    warranties, or obligations under this Agreement; <br /> ( c
                    ) Any negligent or wrongful act or omission by the
                    Contractor in connection with the performance of services
                    under this Agreement.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    3.4 Limitation of Liability
                  </h3>
                  <p className="mb-6">
                    Except for liability arising from breaches of
                    confidentiality, willful misconduct, or indemnified claims:{" "}
                    <br />
                    (a){" "}
                    <span className="font-bold">
                      Neither Party shall be liable for indirect, incidental,
                      special, consequential, or punitive damages
                    </span>{" "}
                    arising out of or relating to this Agreement; <br /> (b){" "}
                    <span className="font-bold">
                      The Contractor’s aggregate liability
                    </span>{" "}
                    for all claims under this Agreement shall not exceed the
                    total compensation paid to the Contractor under this
                    Agreement.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    3.5 Export Control Compliance
                  </h3>
                  <p className="mb-6">
                    The Contractor agrees to comply with all applicable export
                    laws and regulations, including but not limited to the U.S.
                    Export Administration Regulations (EAR), the International
                    Traffic in Arms Regulations (ITAR), and any equivalent laws
                    in the UK or EU. The Contractor represents that the
                    Deliverables shall not be subject to export restrictions
                    without prior disclosure to the Company.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    3.6 Legal Compliance
                  </h3>
                  <p className="mb-6">
                    The Contractor shall at all times comply with all applicable
                    laws, rules, and regulations of the jurisdictions in which
                    it operates, including data protection, consumer protection,
                    anti-corruption, and labor laws.
                  </p>
                </div>
              </section>
              <section className="mb-12">
                <h3 className="text-2xl font-bold  mb-2 border-b border-gray-300 pb-2">
                  SECTION 4: TERMINATION & SURVIVAL
                </h3>

                <div className="pl-5">
                  <h3 className="text-[18px] font-bold mb-2">
                    4.1 Term and Termination
                  </h3>
                  <p className="mb-6">
                    This Agreement shall commence on the Effective Date and
                    remain in effect until the earlier of: <br /> ( a )
                    Completion and acceptance of all Deliverables; <br /> ( b )
                    Termination by either Party pursuant to the terms below.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    4.2 Termination for Convenience
                  </h3>
                  <p className="mb-6">
                    Either Party may terminate this Agreement for any reason
                    with{" "}
                    <span className="font-bold">
                      ten (10) days’ written notice
                    </span>{" "}
                    to the other Party. Upon termination, the Contractor shall
                    cease all work and deliver to the Company any work in
                    progress, along with all Confidential Information and
                    materials provided.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    4.3 Termination for Cause
                  </h3>
                  <p className="mb-6">
                    The Company may terminate this Agreement immediately upon
                    written notice if the Contractor: <br />( a ) Fails to meet
                    a critical milestone or delivery deadline; <br />( b )
                    Breaches any material provision of this Agreement (including
                    IP ownership or confidentiality); <br />( c ) Becomes
                    insolvent, bankrupt, or otherwise unable to perform
                    obligations hereunder. <br /> In such cases, the Company
                    shall pay only for the portion of Deliverables accepted as
                    of the date of termination and shall retain full ownership
                    of all work completed or partially completed.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                    4.4 Consequences of Termination
                  </h3>
                  <p className="mb-2">
                    Upon termination for any reason, the Contractor shall:
                  </p>
                  <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>
                      Immediately return or destroy all Company Confidential
                      Information in their possession;
                    </li>
                    <li>
                      Cease all further use of Company IP or Deliverables;
                    </li>
                    <li>
                      Provide a final invoice (if applicable) and complete
                      transfer of work materials and credentials.
                    </li>
                  </ul>
                  <h3 className="text-[18px] font-bold mb-2">
                  4.5 Survival of Key Provisions
                  </h3>
                  <p className="mb-2">
                  Not withstanding termination or expiration of this Agreement, the following provisions shall survive:
                  </p>
                  <ul className="list-disc list-inside mb-6 space-y-1">
                    <li>
                    Section 1 (Ownership and Assignment of Rights)
                    </li>
                    <li>
                    Section 3 (Warranties, Indemnities & Compliance)
                    </li>
                    <li>
                    Section 4.5 (Survival)
                    </li>
                    <li>Section 5 (General Provisions)</li>
                    <li>Any accrued but unpaid payment obligations</li>
                  </ul>
                  <h3 className="text-[18px] font-bold mb-2">
                  4.6 No Waiver of Rights
                  </h3>
                  <p className="mb-6">
                  Termination of this Agreement shall be without prejudice to any rights or remedies either Party may have under law or equity arising out of any prior breach.
                  </p>
                </div>
              </section>
              <section className="mb-12">
                <h3 className="text-2xl font-bold  mb-2 border-b border-gray-300 pb-2">
                SECTION 5: GENERAL PROVISIONS
                </h3>

                <div className="pl-5">
                  <h3 className="text-[18px] font-bold mb-2">
                  5.1 Governing Law
                  </h3>
                  <p className="mb-6">
                  This Agreement shall be governed by and construed in accordance with the laws of the United States or the United Kingdom, at the Company’s election, without regard to its conflict of law principles.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                  5.2 Dispute Resolution
                  </h3>
                  <p className="mb-6">
                  Any dispute or controversy arising out of or in connection with this Agreement shall be submitted to <span className="font-bold">binding arbitration</span> under the rules of either the <span className="font-bold">London Court of International Arbitration (LCIA)</span> or the <span className="font-bold">American Arbitration Association (AAA)</span>, as selected by the Company. The arbitration shall be conducted in <span className="font-bold">English</span>, and seated in <span className="font-bold">London, UK</span> or <span className="font-bold">New York, USA</span>. The arbitrator’s decision shall be final and binding, and judgment may be entered in any court of competent jurisdiction.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                  5.3 Entire Agreement
                  </h3>
                  <p className="mb-6">
                  This Agreement constitutes the entire understanding between the Parties concerning the subject matter hereof and supersedes all prior oral or written agreements, discussions, and representations. No amendment or modification of this Agreement shall be valid unless in writing and signed by both Parties.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                  5.4 Assignment
                  </h3>
                  <p className="mb-6">
                  The Contractor may not assign, delegate, or subcontract any rights or obligations under this Agreement without the prior written consent of the Company. Any unauthorized assignment shall be null and void. The Company may freely assign this Agreement to any successor or affiliate.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                  5.5 Independent Contractor
                  </h3>
                  <p className="mb-6">
                  The Contractor is engaged as an independent contractor. Nothing in this Agreement shall be construed to create a partnership, joint venture, employment, or agency relationship. The Contractor shall not represent themselves as an employee or agent of the Company.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                  5.6 Severability
                  </h3>
                  <p className="mb-6">
                  If any provision of this Agreement is determined to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect, and the unenforceable portion shall be construed to reflect, as closely as possible, the original intent of the Parties.
                  </p>
                  <h3 className="text-[18px] font-bold mb-2">
                  5.7 Notices
                  </h3>
                  <p className="mb-2">
                  All notices required under this Agreement shall be made in writing and delivered by personal delivery, certified mail, or email with confirmation of receipt to the addresses provided below:
                  </p>
                  <ul className="list-disc list-inside mb-6 space-y-1">
                    <li><span className="font-bold">To the Company:</span> Scopium / Scopium Exchange <br /> Attn: Ashley Cole <br /> Email: info@scopium.io</li>
                    <li>
                    To the Contractor: <br /> Contractor’s Full Legal Name; ______________________________________________ <br /> Email: ______________________________________________
                    </li>
                  </ul>
                  <h3 className="text-[18px] font-bold mb-2">
                  5.8 Counterparts and Electronic Signatures
                  </h3>
                  <p className="mb-6">
                  This Agreement may be executed in counterparts, each of which shall be deemed an original and all of which shall constitute one and the same instrument. Delivery of signatures by PDF or electronic signature shall be legally binding.
                  </p>
                </div>
              </section>
              <section className="">
                <h3 className="text-[18px] font-bold">IN WITNESS WHEREOF, the Parties hereto have executed this Contractor IP Assignment and Ownership Agreement as of the Effective Date set forth below.</h3>
                <p className="font-bold">FOR SCOPIUM / SCOPIUM EXCHANGE</p>
                <p>By: _________________________________________</p>
                <p><span className="font-bold">Name:</span> Ashley Cole</p>
                <p><span className="font-bold">Title:</span>{" "} [e.g., Operations Director]</p>
                <p><span className="font-bold">Date:</span> _________________________________________</p>
                <p className="font-bold">CONTRACTOR</p>
                <p>By: _________________________________________</p>
                <p><span className="font-bold">Name:</span>_________________________________________</p>
                <p><span className="font-bold">Title / Role:</span>{" "}e.g. Software Engineer/Designer</p>
                <p><span className="font-bold">Date:</span> _________________________________________</p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThirdPartyIPAgreement;
