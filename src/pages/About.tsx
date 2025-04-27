import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="py-32 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h6 className="text-accent uppercase tracking-widest text-sm font-medium mb-3">
              Sužinokite daugiau
            </h6>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Apie mus</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <p className="text-lg leading-relaxed text-text-secondary mb-6">
                „Beauty by Ella" – tai grožio profesionalams skirta internetinė parduotuvė, siūlanti platų aukštos kokybės produktų asortimentą.
              </p>
              
              <p className="text-lg leading-relaxed text-text-secondary mb-6">
                Mūsų tikslas – derinti mokslą ir grožį, kad pasiektume įspūdingų rezultatų. Kiekvienas mūsų siūlomas produktas kruopščiai atrinktas su meile, siekiant užtikrinti, kad jie atitiktų aukščiausius standartus ir padėtų pasiekti geriausius rezultatus.
              </p>

              <p className="text-lg leading-relaxed text-text-secondary mb-6">
                Siūlome profesionalias kosmetologijos priemones, vienkartinius produktus bei baldus, kurie padeda sukurti funkcionalią ir estetišką darbo aplinką. Visi mūsų produktai gaminami atsižvelgiant į kokybės, praktiškumo ir stiliaus reikalavimus.
              </p>

              <p className="text-lg leading-relaxed text-text-secondary mb-6">
                „Beauty by Ella" siekia būti patikimu partneriu grožio specialistams, teikdama ne tik kokybiškus produktus, bet ir profesionalų aptarnavimą. Mūsų komanda nuolat tobulina asortimentą, atsižvelgdama į naujausias grožio industrijos tendencijas ir klientų poreikius.
              </p>

              <p className="text-lg leading-relaxed text-text-secondary">
                Kviečiame susipažinti su mūsų produktais ir atrasti sprendimus, kurie padės jūsų verslui augti bei klestėti!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Beauty products display"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3785170/pexels-photo-3785170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Spa treatment room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;