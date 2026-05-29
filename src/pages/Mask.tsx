import React from "react";
import { PageHero } from "@/components/shared/PageHero";

const Mask = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <PageHero
        title="MASK"
        subtitle="An analytical, deeply spiritual look at the individual true self versus the roles and masks worn within organizational structures."
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
                <span className="font-semibold text-slate-700">August 4, 2024</span>
              </p>
              <p className="text-sm text-slate-500 mt-2">
                <span className="font-semibold text-slate-700">8 min read</span>
              </p>
            </div>
          </div>

          {/* Right Column: Content */}
          <article className="lg:col-span-9 prose lg:prose-xl prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm">
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-8 leading-tight">Mask</h1>
            <p className="mb-6 leading-relaxed whitespace-pre-wrap">
              It was a chilled winter afternoon. I was present in the morose atmosphere of one my ex-colleagues residence whose son Rama met an untimely death. Rama’s Parents, Wife and nine year young Son were crying bitterly sitting next to his dead body. I can never forget this experience what I witnessed on that day. They all happened to be disciples of a spiritual Guru whom they called 'Maharaj Ji'. On learning that Rama had expired, he came to see the family. As he entered the house, he found the family wailing inconsolably. Seeing Maharaj Ji, the wife started crying even louder. She sobbed saying, "Maharaj Ji, he has died too early. He was so young... Oh! I would do anything to make him alive again. What will happen to our Son? I'm so helpless and miserable." Maharaj Ji tried to pacify the crying lady and the old Parents, but the loss was too much for them to come to terms with so easily. Eventually, Maharaj Ji said, "Alright, get me a glass of water." Maharaj Ji sat near the dead body and kept the glass next to it. He said, "Now, who ever wants that Rama should become alive again may drink this water. Rama shall come back to life, but the person who drinks the water shall die instead!" There was a dead silence..! "Come, did you not say that Rama was the sole bread winner of the family? Who would die instead of him? It is a case of fair exchange, isn't it?" The Wife looked at the old mother and the old mother looked at the Wife. The old Father looked at Rama's Son. But no one came forward... Then Maharaj Ji said to the old Father, "Babuji, wouldn't you give your life for your son?" The old man said, "Well, I have my responsibility towards my wife. If I die who will look after her? I cannot offer my life." Maharaj Ji looked questioningly at the old woman and said, “Amma?" Amma said, "My daughter is due to deliver her first baby. She will be coming to stay for a month... If I die who will look after her and the newborn. Why don't you ask Rama's wife?" Maharaj Ji smiled and looked at the young widow. She widened her tear filled eyes and said, "Maharaj Ji, I need to live for my son... if I die, who will look after him?  He needs me. Please don't ask me to do this sacrifice..." Maharaj Ji asked the son, "Well little boy, would you like to give your life for your father?" Before the boy could say anything, his mother pulled him to her breast and said, "Maharaj Ji, are you insane? My son is only nine. He has not yet lived his life. How could you even think or suggest such a thing?" Maharaj Ji said, "Well it seems, that all of you are very much needed for the things you need to do in this world... it seems Rama was the only one that could be spared... that is why GOD chose to take him away. So shall we now proceed with his last rites? It's getting late. Having said that, Maharaj Ji got up and left. Love, attachment lasts as long as life exists. The rest is only memories of happy times..! The same principle applies to our existence in organisation. As long as we exist in the work place, we feel we are important. Others also give importance to our presence, praise our role if they are satisfied & happy, blame if things do not go the way they like. Nobody is going to sacrifice their self-interest. That is why, we need to understand our split personality i.e. our individual true self and our role that we play in the organisational set up. We wear different masks while playing varying roles. As soon as the role is over we shed our mask. In Bollywood or Hollywood, we love or hate some actors not because we know them personally, but by the impact they have created through the roles they have played perfectly in different movies. After the role is over, they shed their masks and remain the original persons they are. Taking a cue from that, we should give our best genuinely in playing a perfect role that is assigned to us in a family, in an organisation or in the society, so that others remember the time when we existed and the memories of good deeds of ours what we performed during that time span.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Mask;
