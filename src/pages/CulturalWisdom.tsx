import React from "react";
import { PageHero } from "@/components/shared/PageHero";

const CulturalWisdom = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <PageHero
        title="Akāḷa Kuṣmāṇḍa"
        subtitle="Cultural wisdom and spiritual insights"
        theme="spiritual"
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
                <span className="font-semibold text-slate-700">August 2, 2024</span>
              </p>
              <p className="text-sm text-slate-500 mt-2">
                <span className="font-semibold text-slate-700">10 min read</span>
              </p>
            </div>
          </div>

          {/* Right Column: Content */}
          <article className="lg:col-span-9 prose lg:prose-xl prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm">
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-8 leading-tight">Akāḷa Kuṣmāṇḍa</h1>
            
            <p className="mb-6 leading-relaxed">
              Bosses in the corporate world, when unhappy with their subordinates / Team mates, ordinarily, shout at them as Idiot, Useless, Hopeless, Good for nothing, Akāḷa Kuṣmāṇḍa, etc. Many a times when someone calls somebody an Akāḷa Kuṣmāṇḍa, that person feels offended, takes it as a bitter pill having a coating of negativity, underestimation, hopelessness, uselessness, etc. It hurts the ego and mental map of the person instantly. It is felt rather rude to call someone Akāḷa Kuṣmāṇḍa right on their face. 
            </p>

            <p className="mb-6 leading-relaxed">
              The reason for such derogatory feeling is the common understanding of the term in Sanskrit, i.e. 'a premature pumpkin' or 'a useless birth'. Akāḷa Kuṣmāṇḍa literally means 'an untimely gourd/pumpkin' (Akāḷa - untimely (out of season); Kuṣmāṇḍa - pumpkin or wax gourd. Figuratively, it means ‘a person born at an inauspicious time' i.e. a useless person. But akāḷa kuṣmāṇḍa is definitely a much more colourful description and is thus used quite commonly.
            </p>

            <div className="bg-slate-50 border-l-4 border-primary/40 p-6 rounded-r-2xl my-8 italic">
              <p className="mb-4">
                - ମୋର କି ଭାଗ୍ୟ! ସଂସାରରେ ଯେତେ ଅକାଳ କୁଷ୍ମାଣ୍ଡ ଅଛନ୍ତି, ସମସ୍ତେ ମୋରି ପାଖରେ ଆସି ଜୁଟିଛନ୍ତି। <span className="block mt-1 text-sm text-slate-500 not-italic font-normal">[What a great fortune I have! (said sarcastically) It seems as if all the useless people in the world have come to me.]</span>
              </p>
              <p className="mb-0">
                - ଗୋଟେ ଅକାଳ କୁଷ୍ମାଣ୍ଡକୁ ସବୁ ଯାକ ଦାୟିତ୍ୱ ଦେଲେ ଯାହା ହବାର କଥା ହବ, ଆଉ କଣ? <span className="block mt-1 text-sm text-slate-500 not-italic font-normal">[What else would you expect when you assign all the tasks to a useless person?]</span>
              </p>
            </div>

            <p className="mb-6 leading-relaxed">
              But a deep delve into this so called inglorious title reveals a lot of positive meaning and strong vibes. In fact, Kuṣmāṇḍa is a Hindu goddess, credited with creating the world with her divine smile. Followers of the Kalikula tradition believe her to be the fourth form of the Hindu goddess Durga. Her name signals her main role: Ku means "a little", Ushma means "warmth" or "energy" and Anda means "cosmic egg". Kuṣmāṇḍa is worshiped on the fourth day of the festival of Navratri (nine nights of Navadurga) twice in a year. Once during Basanti Navaratri and the other in Sharadiya Navaratri. She is believed to improve health and bestow wealth and strength.
            </p>

            <p className="mb-6 leading-relaxed">
              Goddess Kushmanda has eight hands and because of that She is also known as Ashtabhuja Devi. It is believed that all the power to bestow Siddhis and Niddhis are located in her Jap Mala. It is stated that She created the whole universe, which is called Brahmanda (ब्रह्माण्ड) in Sanskrit, by just flashing little bit of her smile. She also likes Bali of white pumpkin known as Kuṣmāṇḍa. Due to her association with Brahmanda and Kuṣmāṇḍa She is popularly known as Goddess Kuṣmāṇḍa.
            </p>

            <p className="mb-6 leading-relaxed">
              Kuṣmāṇḍa is depicted with eight to ten hands holding a trident, discus, sword, hook, mace, bow, arrow and two jars of honey (Elixir) and blood. Her one hand is always on abhayamudra from which she blesses all her devotees. She rides on a tiger.
            </p>

            <p className="mb-6 leading-relaxed font-medium text-slate-900 bg-secondary/5 p-6 rounded-2xl border border-secondary/10">
              In fact one should realise that, Kuṣmāṇḍa is the source of Shakti (Power) which destroys the negative forces – physical, mental, emotional, psychological through sheer spiritual energy. When you invoke Kuṣmāṇḍa untimely, i.e. whenever you are in dire need of help & support, it’s like seeking Divine blessing. When such Akāḷa Kuṣmāṇḍa arrives for your service, one should thank the Almighty for showering such wonderful persons in their life at the moment of need. Thus one should feel proud and cheerful when somebody calls you Akāḷa Kuṣmāṇḍa. Cheer up!!!
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default CulturalWisdom;
