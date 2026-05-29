import React from "react";
import { PageHero } from "@/components/shared/PageHero";

const CuringCorporateDiseases = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <PageHero
        title="CURING CORPORATE DISEASES"
        subtitle="Strategies for organizational health"
        theme="leadership"
      />

      <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Sidebar: Author Profile */}
          <div className="lg:col-span-3 lg:sticky lg:top-32 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/10 border-4 border-white shadow-lg mb-4 flex items-center justify-center text-2xl font-bold text-primary">
                <img src="/founder/image.png" alt="Dr. Suvendu Das" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Dr. Suvendu Das</h3>
              <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1 mb-4">Author</p>
              <div className="w-full h-px bg-slate-100 mb-4" />
              <p className="text-sm text-slate-500">
                Published on <br/>
                <span className="font-semibold text-slate-700">August 3, 2024</span>
              </p>
              <p className="text-sm text-slate-500 mt-2">
                <span className="font-semibold text-slate-700">12 min read</span>
              </p>
            </div>
          </div>

          {/* Right Column: Content */}
          <article className="lg:col-span-9 prose lg:prose-xl prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm">
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-8 leading-tight">Curing Corporate Diseases</h1>
            
            <p className="mb-6 leading-relaxed">
              Corporates & organisations worldwide fall sick. Some of them even perish. When this happens, the think tank in the management blame the external factors in the eco-system for such decay & debacle. When I delved deeply, it flashed that the corporate body is similar to our human body. The various structures in the organisation can be correlated to the human components in terms of the roles & functions. The fundamental constituent elements in the human body is each cell. The corresponding constituent of the organisation is its people, individually. Any ordinary person generally perceive disease in its body as a result of external material causes. Few people realise that it comes through the inaction of the life force within, as most of us are ignorant that we are not this gross body. We are a spiritual entity, a conscient energy which has the ability to think, have desires to achieve. The same spirit applies to corporate bodies as well.
            </p>
            
            <p className="mb-6 leading-relaxed">
              People in organisations are not mere headcounts or physical resources. They are the life force of the organisation. All their individual energies culminate into organisational energy which manifests in effort, action, culture, health, performance, productivity, profitability, sustainability and growth. In a body, when the cell or tissue, the vehicle of the life energy is seriously damaged, the life energy withdraws from that place and trouble starts consequently. Medicine, massage, physiotherapy, diet merely help to stimulate the cells, but they have their limitations, because they are applied from outside. The best methods are those that help the life energy to resume its internal healing activities. This principle is equally applicable to corporate bodies and its cells – its people.
            </p>
            
            <p className="mb-6 leading-relaxed">
              Unless conscious attempt is made to understand the subtle intricacies of Human Spirit, its latent & potential energy, its emotion, its feelings, its behaviour, all kinds of external material attempts through digitisation to enhance productivity, health & profitability will be futile. In changing times, in spite of AI, Machine learning, Big Data Analytics, Chat-bots, Automation, et al, People management experts are going to play a key role in enabling infusion of direct life energy into organisational bodies. There are strategies, tools & methodologies to infuse the life energy in organisations basic elements – the people. Here we can help you. If you have a need, please connect with me.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default CuringCorporateDiseases;
