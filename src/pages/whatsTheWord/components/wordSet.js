const WordSet = [
    { correctWord: ['C','O','W'], scrambledWord: ['O', 'W', 'C'], hint: "Hint: (to intimidate or frighten someone, usually to make them submissive. Mike used his authority to _ John.)", audio: '/assets/wordSound/cow.mp3' },
    { correctWord: ['L','A','X'], scrambledWord: ['X', 'L', 'A'], hint: "Hint: (not strict, careful, or attentive to standards. Arsenal's performance suffered due to the coach's _ training regimen.)", audio: '/assets/wordSound/lax.mp3' },
    { correctWord: ['R','O','W'], scrambledWord: ['O', 'R', 'W'], hint: "Hint: (a noisy and often heated argument or quarrel. The couple had a _.)", audio: '/assets/wordSound/row.mp3' },
    { correctWord: ['W','O','O'], scrambledWord: ['O', 'W', 'O'], hint: "Hint: (to seek a person's affection. Musa tried to _ Jess with flowers and love letters)", audio: '/assets/wordSound/woo.mp3' },
    { correctWord: ['B','I','A','S'], scrambledWord: ['I', 'A', 'B', 'S'], hint: "Hint: (prejudice or favoritism towards a person, group, or idea, usually in a way that is considered to be unfair. The article showed a clear _ towards the democratic party, presenting only the positive aspects of their policies.)", audio: '/assets/wordSound/bias.mp3' },
    { correctWord: ['B','O','O','N'], scrambledWord: ['O', 'O', 'B', 'N'], hint: "Hint: (something that is beneficial. The rainfall was a _ for farmers.)", audio: '/assets/wordSound/boon.mp3' },
    { correctWord: ['C','O','P','E'], scrambledWord: ['E', 'O', 'C', 'P'], hint: "Hint: (to deal effectively with a challenging situation. Sarah has learnt to _ with her anxiety through meditation.", audio: '/assets/wordSound/cope.mp3' },
    { correctWord: ['D','E','F','T'], scrambledWord: ['E', 'T', 'D', 'F'], hint: "Hint: (skillful, adept, dexterous. With _ strokes, Prince brought the painting to life.)", audio: '/assets/wordSound/deft.mp3' },
    { correctWord: ['D','E','F','Y'], scrambledWord: ['Y', 'E', 'D', 'F'], hint: "Hint: (to openly resist. Juliet chose to _ traditional gender norms by pursuing a career in engineering.)", audio: '/assets/wordSound/defy.mp3' },
    { correctWord: ['H','E','E','D'], scrambledWord: ['D', 'H', 'E', 'E'], hint: "Hint: (to pay attention to something. _ my advice!)", audio: '/assets/wordSound/heed.mp3' },
    { correctWord: ['K','E','E','N'], scrambledWord: ['E', 'E', 'K', 'N'], hint: "Hint: (Having a strong sense of perception; highly enthusiastic. Ruth has a _ mind.)", audio: '/assets/wordSound/keen.mp3' },
    { correctWord: ['L','U','R','E'], scrambledWord: ['E', 'U', 'R', 'L'], hint: "Hint: (to attract or tempt someone. Rita used colorful advertisements to _ potential customers into her store.)", audio: '/assets/wordSound/lure.mp3' },
    { correctWord: ['M','A','S','K'], scrambledWord: ['K', 'S', 'M', 'A'], hint: "Hint: (to conceal emotions or intentions. Bose tried to _ her disappointment with a smile.", audio: '/assets/wordSound/mask.mp3' },
    { correctWord: ['P','L','O','D'], scrambledWord: ['L', 'P', 'D', 'O'], hint: "Hint: (to walk heavily and slowly. Despite the fatigue, Kane continued to _ towards the finish line.)", audio: '/assets/wordSound/plod.mp3' },
    { correctWord: ['R','E','I','N'], scrambledWord: ['E', 'I', 'N', 'R'], hint: "Hint: (to limit, control, or restrain something. It's essential to _ in your emotions during tense situations to maintain composure.)", audio: '/assets/wordSound/rein.mp3' },
    { correctWord: ['S','H','A','M'], scrambledWord: ['M', 'A', 'S', 'H'], hint: "Hint: (fake, false, or deceitful. Tom's sickness was a _ to avoid going to school.)", audio: '/assets/wordSound/sham.mp3' },
    { correctWord: ['S','T','U','N'], scrambledWord: ['N', 'U', 'S', 'T'], hint: "Hint: (to shock or overwhelm someone to the point of temporarily being unable to react. Sam used electric rays to _ the robbers.)", audio: '/assets/wordSound/stun.mp3' },
    { correctWord: ['U','N','D','O'], scrambledWord: ['O', 'U', 'D', 'N'], hint: "Hint: (to cancel the effects of something that was done. Mike tried to _ the damage caused by his mistake.)", audio: '/assets/wordSound/undo.mp3' },
    { correctWord: ['W','A','R','Y'], scrambledWord: ['R', 'W', 'Y', 'A'], hint: "Hint: (cautious of potential dangers or risks. Leah was _ of sharing personal information with strangers online.)", audio: '/assets/wordSound/wary.mp3' },
    { correctWord: ['A','V','I','D'], scrambledWord: ['A', 'I', 'D', 'V'], hint: "Hint: (showing keen interest, enthusiasm, or eagerness. Esther is an _ reader, devouring multiple books every month.)", audio: '/assets/wordSound/avid.mp3' },
    { correctWord: ['C','I','T','E'], scrambledWord: ['E', 'I', 'C', 'T'], hint: "Hint: (to mention or refer to a source of information or evidence. When writing an academin paper, it is essential to properly _ the sources used to avoid plagiarism.)", audio: '/assets/wordSound/cite.mp3' },
    { correctWord: ['C','O','D','E'], scrambledWord: ['E', 'O', 'D', 'C'], hint: "Hint: (A system of symbols used to represent information or instructions for a machine. I found the error in my _ after reviewing each line.)", audio: '/assets/wordSound/code.mp3' },
    { correctWord: ['S','I','F','T'], scrambledWord: ['F', 'T', 'S', 'I'], hint: "Hint: (examine thoroughly to isolate what is most important. We need to _ the evidence to comment objectively.)", audio: '/assets/wordSound/sift.mp3' },
    { correctWord: ['S','W','A','Y'], scrambledWord: ['A', 'S', 'Y', 'W'], hint: "Hint: (persuade. Jane failed to _ the crowd.)", audio: '/assets/wordSound/sway.mp3' },
    { correctWord: ['T','O','L','L'], scrambledWord: ['O', 'L', 'L', 'T'], hint: "Hint: (to have bad effect. The stress will eventually take its _)", audio: '/assets/wordSound/toll.mp3' },





    
    { correctWord: ['T', 'S', 'K', 'T', 'S', 'K'], scrambledWord: ['S', 'S', 'K', 'K', 'T', 'T'], hint: 'hint: (Express your disapproval with this sound. Esther replied with _.)', audio: '/assets/wordSound/tsktsk.mp3' },
    { correctWord: ['U', 'N', 'P', 'R', 'E', 'C', 'E', 'D', 'E', 'N', 'T', 'E', 'D'], scrambledWord: ['D', 'T', 'N', 'D', 'C', 'R', 'P', 'N', 'U', 'E', 'E', 'E', 'E'], hint: 'hint: (Not happened before now. This is an _ event.)', audio: '/assets/wordSound/unprecedented.mp3' },
    { correctWord: ['A', 'N', 'T', 'I', 'D', 'I', 'S', 'E', 'S', 'T', 'A', 'B', 'L', 'I', 'S', 'H', 'M', 'E', 'N', 'T', 'A', 'R', 'I', 'A', 'N', 'I', 'S', 'M'], scrambledWord: ['N', 'N', 'T', 'M', 'D', 'S', 'S', 'R', 'S', 'T', 'T', 'B', 'L', 'N', 'S', 'H', 'M', 'E', 'I', 'A', 'A', 'E', 'I', 'A', 'A', 'I', 'I', 'I'], hint: 'hint: (Opposition to withdrawing government support for a religion. Maxwell is against _.)', audio: '/assets/wordSound/antidisestablishmentarianism.mp3' }
  ];

  export default WordSet;