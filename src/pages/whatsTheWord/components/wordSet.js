const WordSet = [
  { id: 1, correctWord: ['C', 'O', 'W'], scrambledWord: ['O', 'C', 'W'], hint: "Hint: (to intimidate or frighten someone, usually to make them submissive. Mike used his authority to _ John.)", audio: '/assets/wordSound/cow.mp3' },
  { id: 2, correctWord: ['L', 'A', 'X'], scrambledWord: ['X', 'A', 'L'], hint: "Hint: (not strict, careful, or attentive to standards. Arsenal's performance suffered due to the coach's _ training regimen.)", audio: '/assets/wordSound/lax.mp3' },
  { id: 3, correctWord: ['R', 'O', 'W'], scrambledWord: ['O', 'R', 'W'], hint: "Hint: (a noisy and often heated argument or quarrel. The couple had a _.)", audio: '/assets/wordSound/row.mp3' },
  { id: 4, correctWord: ['W', 'O', 'O'], scrambledWord: ['O', 'W', 'O'], hint: "Hint: (to seek a person's affection. Musa tried to _ Jess with flowers and love letters)", audio: '/assets/wordSound/woo.mp3' },
  { id: 5, correctWord: ['B', 'I', 'A', 'S'], scrambledWord: ['A', 'I', 'B', 'S'], hint: "Hint: (prejudice or favoritism towards a person, group, or idea, usually in a way that is considered to be unfair. The article showed a clear _ towards the democratic party, presenting only the positive aspects of their policies.)", audio: '/assets/wordSound/bias.mp3' },
  { id: 6, correctWord: ['B', 'O', 'O', 'N'], scrambledWord: ['O', 'O', 'B', 'N'], hint: "Hint: (something that is beneficial. The rainfall was a _ for farmers.)", audio: '/assets/wordSound/boon.mp3' },
  { id: 7, correctWord: ['C', 'O', 'P', 'E'], scrambledWord: ['E', 'O', 'P', 'C'], hint: "Hint: (to deal effectively with a challenging situation. Sarah has learnt to _ with her anxiety through meditation.", audio: '/assets/wordSound/cope.mp3' },
  { id: 8, correctWord: ['D', 'E', 'F', 'T'], scrambledWord: ['E', 'D', 'F', 'T'], hint: "Hint: (skillful, adept, dexterous. With _ strokes, Prince brought the painting to life.)", audio: '/assets/wordSound/deft.mp3' },
  { id: 9, correctWord: ['D', 'E', 'F', 'Y'], scrambledWord: ['F', 'E', 'D', 'Y'], hint: "Hint: (to openly resist. Juliet chose to _ traditional gender norms by pursuing a career in engineering.)", audio: '/assets/wordSound/defy.mp3' },
  { id: 10, correctWord: ['H', 'E', 'E', 'D'], scrambledWord: ['D', 'E', 'E', 'H'], hint: "Hint: (to pay attention to something. _ my advice!)", audio: '/assets/wordSound/heed.mp3' },
  { id: 11, correctWord: ['K', 'E', 'E', 'N'], scrambledWord: ['E', 'E', 'K', 'N'], hint: "Hint: (Having a strong sense of perception; highly enthusiastic. Ruth has a _ mind.)", audio: '/assets/wordSound/keen.mp3' },
  { id: 12, correctWord: ['L', 'U', 'R', 'E'], scrambledWord: ['E', 'U', 'R', 'L'], hint: "Hint: (to attract or tempt someone. Rita used colorful advertisements to _ potential customers into her store.)", audio: '/assets/wordSound/lure.mp3' },
  { id: 13, correctWord: ['M', 'A', 'S', 'K'], scrambledWord: ['S', 'A', 'M', 'K'], hint: "Hint: (to conceal emotions or intentions. Bose tried to _ her disappointment with a smile.", audio: '/assets/wordSound/mask.mp3' },
  { id: 14, correctWord: ['P', 'L', 'O', 'D'], scrambledWord: ['L', 'P', 'O', 'D'], hint: "Hint: (to walk heavily and slowly. Despite the fatigue, Kane continued to _ towards the finish line.)", audio: '/assets/wordSound/plod.mp3' },
  { id: 15, correctWord: ['R', 'E', 'I', 'N'], scrambledWord: ['E', 'R', 'I', 'N'], hint: "Hint: (to limit, control, or restrain something. It's essential to _ in your emotions during tense situations to maintain composure.)", audio: '/assets/wordSound/rein.mp3' },
  { id: 16, correctWord: ['S', 'H', 'A', 'M'], scrambledWord: ['A', 'H', 'S', 'M'], hint: "Hint: (fake, false, or deceitful. Tom's sickness was a _ to avoid going to school.)", audio: '/assets/wordSound/sham.mp3' },
  { id: 17, correctWord: ['S', 'T', 'U', 'N'], scrambledWord: ['N', 'T', 'U', 'S'], hint: "Hint: (to shock or overwhelm someone to the point of temporarily being unable to react. Sam used electric rays to _ the robbers.)", audio: '/assets/wordSound/stun.mp3' },
  { id: 18, correctWord: ['U', 'N', 'D', 'O'], scrambledWord: ['O', 'N', 'D', 'U'], hint: "Hint: (to cancel the effects of something that was done. Mike tried to _ the damage caused by his mistake.)", audio: '/assets/wordSound/undo.mp3' },
  { id: 19, correctWord: ['W', 'A', 'R', 'Y'], scrambledWord: ['A', 'W', 'R', 'Y'], hint: "Hint: (cautious of potential dangers or risks. Leah was _ of sharing personal information with strangers online.)", audio: '/assets/wordSound/wary.mp3' },
  { id: 20, correctWord: ['A', 'V', 'I', 'D'], scrambledWord: ['A', 'D', 'I', 'V'], hint: "Hint: (showing keen interest, enthusiasm, or eagerness. Esther is an _ reader, devouring multiple books every month.)", audio: '/assets/wordSound/avid.mp3' },
  { id: 21, correctWord: ['C', 'I', 'T', 'E'], scrambledWord: ['T', 'I', 'C', 'E'], hint: "Bonus: (to mention or refer to a source of information or evidence. When writing an academic paper, it is essential to properly cite the sources used to avoid plagiarism.)", audio: '/assets/wordSound/cite.mp3' },
  { id: 22, correctWord: ['C', 'O', 'D', 'E'], scrambledWord: ['E', 'O', 'D', 'C'], hint: "Hint: (A system of symbols used to represent information or instructions for a machine. I found the error in my _ after reviewing each line.)", audio: '/assets/wordSound/code.mp3' },
  { id: 23, correctWord: ['S', 'I', 'F', 'T'], scrambledWord: ['F', 'I', 'S', 'T'], hint: "Hint: (examine thoroughly to isolate what is most important. We need to _ the evidence to comment objectively.)", audio: '/assets/wordSound/sift.mp3' },
  { id: 24, correctWord: ['S', 'W', 'A', 'Y'], scrambledWord: ['A', 'W', 'S', 'Y'], hint: "Hint: (persuade. Jane failed to _ the crowd.)", audio: '/assets/wordSound/sway.mp3' },
  { id: 25, correctWord: ['T', 'O', 'L', 'L'], scrambledWord: ['L', 'O', 'L', 'T'], hint: "Hint: (to have bad effect. The stress will eventually take its _)", audio: '/assets/wordSound/toll.mp3' },
  { id: 26, correctWord: ['Z', 'E', 'A', 'L'], scrambledWord: ['A', 'E', 'Z', 'L'], hint: "Hint: (intense enthusiasm or passion. She approached her work with great _)", audio: '/assets/wordSound/zeal.mp3' },
  { id: 27, correctWord: ['A', 'C', 'U', 'T', 'E'], scrambledWord: ['U', 'C', 'A', 'T', 'E'], hint: "Hint: (sharp or severe. He experienced an _ pain in his back.)", audio: '/assets/wordSound/acute.mp3' },
  { id: 28, correctWord: ['B', 'E', 'L', 'I', 'E'], scrambledWord: ['B', 'I', 'L', 'E', 'E'], hint: "Hint: (give a false impression. Their calm faces _ the nervousness they feel inside.)", audio: '/assets/wordSound/belie.mp3' },
  { id: 29, correctWord: ['A', 'L', 'O', 'O', 'F'], scrambledWord: ['F', 'L', 'O', 'O', 'A'], hint: "Hint: (distant, reserved, uninterested. Jane appeared _ at the party, staying quietly at one corner.)", audio: '/assets/wordSound/aloof.mp3' },
  { id: 30, correctWord: ['A', 'M', 'U', 'S', 'E'], scrambledWord: ['E', 'M', 'U', 'S', 'A'], hint: "Hint: (entertain or make someone find something funny. Gideon made faces to _ the baby.)", audio: '/assets/wordSound/amuse.mp3' },
  { id: 31, correctWord: ['C', 'A', 'N', 'N', 'Y'], scrambledWord: ['N', 'A', 'N', 'C', 'Y'], hint: "Hint: (clever, astute, shrewd. Bill's _ decisions catapulted him to the top.)", audio: '/assets/wordSound/canny.mp3' },
  { id: 32, correctWord: ['B', 'O', 'G', 'U', 'S'], scrambledWord: ['G', 'O', 'B', 'U', 'S'], hint: "Hint: (not genuine, fake, counterfeit. The online store sold _ products.)", audio: '/assets/wordSound/bogus.mp3' },
  { id: 33, correctWord: ['B', 'L', 'U', 'N', 'T'], scrambledWord: ['U', 'L', 'B', 'N', 'T'], hint: "Hint: (straightforward, direct, uncompromisingly forthright, frank. He's quite _ in conversations.)", audio: '/assets/wordSound/blunt.mp3' },
  { id: 34, correctWord: ['B', 'A', 'N', 'A', 'L'], scrambledWord: ['N', 'A', 'B', 'A', 'L'], hint: "Hint: (lacking in originality, common, obvious and boring. The movie's plot was so _ that it felt like a rehash of every other romantic comedy.)", audio: '/assets/wordSound/banal.mp3' },
  { id: 35, correctWord: ['A', 'V', 'E', 'R', 'T'], scrambledWord: ['T', 'V', 'E', 'R', 'A'], hint: "Hint: (prevent an undesirable occurrence. Siri managed to _ a potential crisis by addressing the issue early on.)", audio: '/assets/wordSound/avert.mp3' },
  { id: 36, correctWord: ['A', 'C', 'U', 'T', 'E'], scrambledWord: ['C', 'A', 'U', 'T', 'E'], hint: "Hint: (shrewd, astute. Her _ perception enabled her to notice even the slightest details.)", audio: '/assets/wordSound/acute.mp3' },
  { id: 37, correctWord: ['C', 'H', 'E', 'C', 'K'], scrambledWord: ['K', 'H', 'E', 'C', 'C'], hint: "Hint: (restrain or control something undesirable. Increased police presence helped _ the rising crime rate in the neighborhood.)", audio: '/assets/wordSound/check.mp3' },
  { id: 38, correctWord: ['G', 'A', 'W', 'K', 'Y'], scrambledWord: ['W', 'A', 'G', 'K', 'Y'], hint: "Hint: (awkward, clumsy, lacking in grace. Ryan was quite _ as a teenager.)", audio: '/assets/wordSound/gawky.mp3' },
  { id: 39, correctWord: ['G', 'L', 'O', 'O', 'M'], scrambledWord: ['G', 'L', 'O', 'M', 'O'], hint: "Hint: (a state of sadness, despondency. The news of the economic downturn cast a _ over the entire industry.)", audio: '/assets/wordSound/gloom.mp3' },
  { id: 40, correctWord: ['E', 'L', 'A', 'T', 'E'], scrambledWord: ['A', 'L', 'E', 'T', 'E'], hint: "Hint: (make someone extremely happy. Winning the game is the only outcome that will _ the team.)", audio: '/assets/wordSound/elate.mp3' },
  { id: 41, correctWord: ['E', 'R', 'O', 'D', 'E'], scrambledWord: ['O', 'R', 'E', 'D', 'E'], hint: "Bonus: (gradually destroy. Your relentless criticism will erode her self-confidence.)", audio: '/assets/wordSound/erode.mp3' },
  { id: 42, correctWord: ['D', 'A', 'U', 'N', 'T'], scrambledWord: ['A', 'D', 'U', 'N', 'T'], hint: "Hint: (make someone feel intimidated or discouraged. Despite facing numerous obstacles, her determination never wavered, and adversity did not _ her.)", audio: '/assets/wordSound/daunt.mp3' },
  { id: 43, correctWord: ['D', 'E', 'M', 'U', 'R'], scrambledWord: ['D', 'U', 'M', 'E', 'R'], hint: "Hint: (express reluctance or objection. Rachel agreed to Romeo's request without _.)", audio: '/assets/wordSound/demur.mp3' },
  { id: 44, correctWord: ['F', 'O', 'R', 'G', 'O'], scrambledWord: ['G', 'O', 'R', 'F', 'O'], hint: "Hint: (choose not to do or have something desirable. Rita decided to _ dessert in order to stick to her diet.)", audio: '/assets/wordSound/forgo.mp3' },
  { id: 45, correctWord: ['C', 'L', 'O', 'A', 'K'], scrambledWord: ['K', 'L', 'O', 'A', 'C'], hint: "Hint: (conceal, hide, disguise. His charismatic speeches often _ his controversial policies, leaving many unsure of his true agenda.)", audio: '/assets/wordSound/cloak.mp3' },
  { id: 46, correctWord: ['F', 'L', 'O', 'U', 'T'], scrambledWord: ['F', 'L', 'U', 'O', 'T'], hint: "Hint: (openly disregard a rule, law, or convention. King chose to _ the rules by entering the restricted area.)", audio: '/assets/wordSound/flout.mp3' },
  { id: 47, correctWord: ['N', 'A', 'I', 'V', 'E'], scrambledWord: ['V', 'A', 'I', 'N', 'E'], hint: "Hint: (lacking experience, overly trusting. Jan's _ belief that everyone was inherently good made him an easy target for scams.)", audio: '/assets/wordSound/naive.mp3' },
  { id: 48, correctWord: ['S', 'N', 'A', 'R', 'E'], scrambledWord: ['A', 'N', 'S', 'R', 'E'], hint: "Hint: (to capture or catch. The detective managed to _ the notorious theif by setting up an elaborate sting operation.)", audio: '/assets/wordSound/snare.mp3' },
  { id: 49, correctWord: ['M', 'I', 'M', 'I', 'C'], scrambledWord: ['C', 'I', 'M', 'I', 'M'], hint: "Hint: (to copy or imitate. He could _ the teacher's voice so accurately that it often made his classmates laugh.)", audio: '/assets/wordSound/mimic.mp3' },
  { id: 50, correctWord: ['P', 'R', 'O', 'X', 'Y'], scrambledWord: ['O', 'R', 'P', 'X', 'Y'], hint: "Hint: (a person authorized to act on behalf of another. May acted as a _ for her father at the shareholder's meeting)", audio: '/assets/wordSound/proxy.mp3' },
  { id: 51, correctWord: ['S', 'H', 'I', 'R', 'K'], scrambledWord: ['H', 'S', 'I', 'R', 'K'], hint: "Hint: (avoid or neglect a duty or responsibility. He always finds ways to _ his household chores, leaving them for others to do.)", audio: '/assets/wordSound/shirk.mp3' },
  { id: 52, correctWord: ['L', 'U', 'C', 'I', 'D'], scrambledWord: ['L', 'I', 'C', 'U', 'D'], hint: "Hint: (clear, easy to understand. Her explanation was so _ that even those unfamiliar with the topic could grasp it.)", audio: '/assets/wordSound/lucid.mp3' },
  { id: 53, correctWord: ['M', 'U', 'R', 'K', 'Y'], scrambledWord: ['R', 'U', 'M', 'K', 'Y'], hint: "Hint: (not fully explained, dark, unclear. His _ dealings and constant lies made it difficult to trust him.)", audio: '/assets/wordSound/murky.mp3' },
  { id: 54, correctWord: ['N', 'O', 'V', 'E', 'L'], scrambledWord: ['V', 'O', 'N', 'E', 'L'], hint: "Hint: (new, original, or innovative. The company introduced a _ approach to solving the industry's longstanding problems.)", audio: '/assets/wordSound/novel.mp3' },
  { id: 55, correctWord: ['L', 'U', 'R', 'I', 'D'], scrambledWord: ['L', 'I', 'R', 'U', 'D'], hint: "Hint: (sensational, shocking, or dramatic. The movie depicted the crime scene in a _ and graphic manner.)", audio: '/assets/wordSound/lurid.mp3' },
  { id: 56, correctWord: ['P', 'I', 'T', 'H', 'Y'], scrambledWord: ['Y', 'I', 'T', 'H', 'P'], hint: "Hint: (concise and meaningful in a few words. Irene gave a _ speech that left a lasting impact on the audience.)", audio: '/assets/wordSound/pithy.mp3' },
  { id: 57, correctWord: ['A', 'D', 'H', 'O', 'C'], scrambledWord: ['D', 'A', 'H', 'O', 'C'], hint: "Hint: (temporarily created for a specific purpose. They formed an _ committee to address the immediate crisis)", audio: '/assets/wordSound/adhoc.mp3' },
  { id: 58, correctWord: ['S', 'U', 'R', 'L', 'Y'], scrambledWord: ['R', 'U', 'S', 'L', 'Y'], hint: "Hint: (unfriendly, rude, ill-tempered. The _ waiter made the dining experience unpleasant for the customers.)", audio: '/assets/wordSound/surly.mp3' },
  { id: 59, correctWord: ['V', 'E', 'N', 'A', 'L'], scrambledWord: ['L', 'E', 'N', 'A', 'V'], hint: "Hint: (corrupt, capable of being bribed. The scandal exposed the _ nature of some politicians.)", audio: '/assets/wordSound/venal.mp3' },
  { id: 60, correctWord: ['C', 'U', 'P', 'I', 'D'], scrambledWord: ['C', 'P', 'U', 'I', 'D'], hint: "Hint: (symbol of romantic or amorous love. The _ was added to the decorations for Valentine's Day.)", audio: '/assets/wordSound/cupid.mp3' },
  { id: 61, correctWord: ['D', 'E', 'T', 'E', 'R'], scrambledWord: ['T', 'E', 'D', 'E', 'R'], hint: "Bonus: (discourage someone from doing something, often by creating fear about the consequences. The dogs were meant to deter unauthorized access to the building.)", audio: '/assets/wordSound/deter.mp3' },
  { id: 62, correctWord: ['D', 'W', 'A', 'R', 'F'], scrambledWord: ['R', 'W', 'A', 'D', 'F'], hint: "Hint: (make something appear small in comparison. The skyscrappers _ the nearby buildings.)", audio: '/assets/wordSound/dwarf.mp3' },
  { id: 63, correctWord: ['T', 'E', 'P', 'I', 'D'], scrambledWord: ['T', 'E', 'P', 'D', 'I'], hint: "Hint: (lukewarm, lacking enthusiasm. The audience's response to the performance was _.)", audio: '/assets/wordSound/tepid.mp3' },
  { id: 64, correctWord: ['C', 'R', 'A', 'F', 'T'], scrambledWord: ['T', 'R', 'A', 'F', 'C'], hint: "Hint: (skillful and cunning ability. His _ in negotiation enabled him to secure a favorable deal for his company.)", audio: '/assets/wordSound/craft.mp3' },
  { id: 65, correctWord: ['T', 'R', 'I', 'T', 'E'], scrambledWord: ['T', 'R', 'E', 'T', 'I'], hint: "Hint: (overused, lacking originality, too common. His advice was _ and didn't offer any real insight.)", audio: '/assets/wordSound/trite.mp3' },
  { id: 66, correctWord: ['W', 'I', 'T', 'T', 'Y'], scrambledWord: ['T', 'I', 'W', 'T', 'Y'], hint: "Hint: (quick in producing clever and amusing remarks. Her _ comments kept everyone entertained throughout the evening.)", audio: '/assets/wordSound/witty.mp3' },
  { id: 67, correctWord: ['G', 'L', 'O', 'A', 'T'], scrambledWord: ['G', 'L', 'A', 'O', 'T'], hint: "Hint: (take excessive pleasure or satisfaction in one's own success or another's misfortune. Shan couldn't resist the urge to _ when she heard about Mary's demotion.)", audio: '/assets/wordSound/gloat.mp3' },
  { id: 68, correctWord: ['P', 'H', 'O', 'N', 'Y'], scrambledWord: ['Y', 'H', 'O', 'N', 'P'], hint: "Hint: (fake, counterfeit, not genuine. His apology sounded _.)", audio: '/assets/wordSound/phony.mp3' },
  { id: 69, correctWord: ['E', 'V', 'O', 'K', 'E'], scrambledWord: ['E', 'V', 'E', 'K', 'O'], hint: "Hint: (to brink forth or elicit a feeling, memory, or reaction. The photograph _ warm and nostalgic memories.)", audio: '/assets/wordSound/evoke.mp3' },
  { id: 70, correctWord: ['G', 'A', 'M', 'E', 'S'], scrambledWord: ['A', 'G', 'M', 'E', 'S'], hint: "Hint: (manipulative behavior to achieve an outcome at the expense of others. Stop playing _ with my emotions.)", audio: '/assets/wordSound/games.mp3' },
  { id: 71, correctWord: ['I', 'N', 'E', 'P', 'T'], scrambledWord: ['N', 'I', 'E', 'P', 'T'], hint: "Hint: (lacking skill, ability, or competence. His _ handling of the project led to numerous errors and delays, frustrating the entire team.)", audio: '/assets/wordSound/inept.mp3' },
  { id: 72, correctWord: ['L', 'O', 'F', 'T', 'Y'], scrambledWord: ['O', 'L', 'F', 'T', 'Y'], hint: "Hint: (noble or high-minded in its ideals. Her aspirations were _, aiming to make a positive impact on the world through her charitable work.)", audio: '/assets/wordSound/lofty.mp3' },
  { id: 73, correctWord: ['E', 'N', 'S', 'U', 'E', 'D'], scrambledWord: ['E', 'U', 'S', 'N', 'E', 'D'], hint: "Hint: (occur as a result of a previous event. After the argument, a period of tense silence _ in the room.)", audio: '/assets/wordSound/ensue.mp3' },
  { id: 74, correctWord: ['E', 'X', 'T', 'O', 'L'], scrambledWord: ['E', 'X', 'T', 'L', 'O'], hint: "Hint: (praise or laud someone or something. He couldn't help but _ her beauty.)", audio: '/assets/wordSound/extol.mp3' },
  { id: 75, correctWord: ['E', 'X', 'A', 'L', 'T'], scrambledWord: ['E', 'L', 'A', 'X', 'T'], hint: "Hint: (praise, elevate, or glorify someone or something. The speech aimed to _ the team for their hard work and determination.)", audio: '/assets/wordSound/exalt.mp3' },
  { id: 76, correctWord: ['E', 'X', 'A', 'C', 'T'], scrambledWord: ['E', 'C', 'A', 'X', 'T'], hint: "Hint: (precise, accurate, or completely correct. She needed the _ measurements to ensure the project's success.)", audio: '/assets/wordSound/exact.mp3' },
  { id: 77, correctWord: ['W', 'E', 'A', 'R', 'Y'], scrambledWord: ['R', 'E', 'A', 'W', 'Y'], hint: "Hint: (feeling tired, fatigued, or exhausted due to physical or mental exertion or prolonged stress. She felt _.)", audio: '/assets/wordSound/weary.mp3' },
  { id: 78, correctWord: ['T', 'O', 'K', 'E', 'N'], scrambledWord: ['N', 'O', 'K', 'E', 'T'], hint: "Hint: (small item that represents something larger or more significant. John gave Sally a _ of his affection, a small heart-shaped pendant.)", audio: '/assets/wordSound/token.mp3' },
  { id: 79, correctWord: ['V', 'A', 'L', 'O', 'R'], scrambledWord: ['R', 'A', 'L', 'O', 'V'], hint: "Hint: (great courage and bravery in the face of danger. The firefighter's _ shone brightly as he rushed into the burning building to save a trapped family.)", audio: '/assets/wordSound/valor.mp3' },
  { id: 80, correctWord: ['V', 'O', 'C', 'A', 'L'], scrambledWord: ['V', 'C', 'O', 'A', 'L'], hint: "Hint: (outspoken or expressive. Ryan is quite _ about environmental issues and frequently participates in protests and advocacy campaigns.)", audio: '/assets/wordSound/vocal.mp3' },
  { id: 81, correctWord: ['Y', 'I', 'E', 'L', 'D'], scrambledWord: ['Y', 'E', 'I', 'L', 'D'], hint: "Bonus: (produce or provide something. Despite their efforts, the team's project didn't yield the expected results.)", audio: '/assets/wordSound/yield.mp3' },
  { id: 82, correctWord: ['S', 'H', 'O', 'W', 'Y'], scrambledWord: ['O', 'H', 'S', 'W', 'Y'], hint: "Hint: (flashy, ostentatious, or designed to attract attention. Rachel's _ dress, adorned with sequins and glitter, made her the center of attention at the party.)", audio: '/assets/wordSound/showy.mp3' },
  { id: 83, correctWord: ['P', 'O', 'S', 'E', 'D'], scrambledWord: ['E', 'O', 'S', 'P', 'D'], hint: "Hint: (assume a particular appearance, attitude, or posture for a specific purpose. The model _ elegantly for the photoshoot.)", audio: '/assets/wordSound/posed.mp3' },
  { id: 84, correctWord: ['S', 'O', 'B', 'E', 'R'], scrambledWord: ['S', 'E', 'B', 'O', 'R'], hint: "Hint: (not under the influence of alcohol or drugs, serious, solemn, or free from excessive emotions. She remained _ throughout the evening.)", audio: '/assets/wordSound/sober.mp3' },
  { id: 85, correctWord: ['S', 'T', 'A', 'I', 'D'], scrambledWord: ['S', 'A', 'T', 'I', 'D'], hint: "Hint: (settled, sedate, unadventurous, lacking excitement or change. The town had a _ atmosphere.)", audio: '/assets/wordSound/staid.mp3' },
  { id: 86, correctWord: ['S', 'L', 'O', 'T', 'H'], scrambledWord: ['T', 'L', 'O', 'S', 'H'], hint: "Hint: (laziness, reluctance to work or make an effort. Henry's _ prevented him from achieving anything.)", audio: '/assets/wordSound/sloth.mp3' },
  { id: 87, correctWord: ['B', 'E', 'M', 'U', 'S', 'E'], scrambledWord: ['E', 'B', 'M', 'U', 'S', 'E'], hint: "Hint: (confuse or bewilder someone. His cryptic remarks often _ his friends.)", audio: '/assets/wordSound/bemuse.mp3' },
  { id: 88, correctWord: ['A', 'G', 'H', 'A', 'S', 'T'], scrambledWord: ['T', 'G', 'H', 'A', 'S', 'A'], hint: "Hint: (feeling of shock, horror, or amazement. She was _ when she saw the extent of the damage caused by the storm.)", audio: '/assets/wordSound/aghast.mp3' },
  { id: 89, correctWord: ['A', 'P', 'A', 'T', 'H', 'Y'], scrambledWord: ['P', 'A', 'A', 'T', 'H', 'Y'], hint: "Hint: (lack of interest or concern. indifference or emotional detachment. His _ towards issues facing his community was disheartening to many.)", audio: '/assets/wordSound/apathy.mp3' },
  { id: 90, correctWord: ['B', 'A', 'N', 'I', 'S', 'H'], scrambledWord: ['S', 'A', 'N', 'I', 'B', 'H'], hint: "Hint: (punish someone by sending them away. The king decided to _ the traitor from the kingdom.)", audio: '/assets/wordSound/banish.mp3' },
  { id: 91, correctWord: ['A', 'R', 'C', 'A', 'N', 'E'], scrambledWord: ['C', 'R', 'A', 'A', 'N', 'E'], hint: "Hint: (mysterious, obscure, understood by few. The ancient scroll contained _ symbols.)", audio: '/assets/wordSound/arcane.mp3' },
  { id: 92, correctWord: ['A', 'C', 'U', 'M', 'E', 'N'], scrambledWord: ['A', 'M', 'U', 'C', 'E', 'N'], hint: "Hint: (ability to make quick & accurate judgments and decisions in a specific area. Her financial _ enabled her build substantial wealth.)", audio: '/assets/wordSound/acumen.mp3' },
  { id: 93, correctWord: ['A', 'D', 'R', 'O', 'I', 'T'], scrambledWord: ['A', 'T', 'R', 'O', 'I', 'D'], hint: "Hint: (skillful, clever, and adept at performing tasks with finesse and dexterity. He's _ at playing the guitar.)", audio: '/assets/wordSound/adroit.mp3' },
  { id: 94, correctWord: ['A', 'P', 'L', 'O', 'M', 'B'], scrambledWord: ['P', 'A', 'L', 'O', 'M', 'B'], hint: "Hint: (self-confidence and poise in challenging situations. She handled the situation with _.)", audio: '/assets/wordSound/aplomb.mp3' },
  { id: 95, correctWord: ['A', 'C', 'C', 'O', 'R', 'D'], scrambledWord: ['C', 'A', 'C', 'O', 'R', 'D'], hint: "Hint: (agreement, harmony, or conformity between groups. The countries reached an _ on trade negotiations.)", audio: '/assets/wordSound/accord.mp3' },
  { id: 96, correctWord: ['B', 'E', 'N', 'I', 'G', 'N'], scrambledWord: ['N', 'E', 'B', 'I', 'G', 'N'], hint: "Hint: (gentle, kind, harmless. The doctor assured the patient that the tumor was _.)", audio: '/assets/wordSound/benign.mp3' },
  { id: 97, correctWord: ['B', 'L', 'I', 'G', 'H', 'T'], scrambledWord: ['G', 'L', 'I', 'B', 'H', 'T'], hint: "Hint: (gradually spoil, harm, or destroy something. Her constant complaints seemed to _ the atmosphere in the office.)", audio: '/assets/wordSound/blight.mp3' },
  { id: 98, correctWord: ['B', 'R', 'I', 'D', 'L', 'E'], scrambledWord: ['R', 'B', 'I', 'D', 'L', 'E'], hint: "Hint: (bring under control or restrain. He had to _ his frustration during the lengthy meeting.)", audio: '/assets/wordSound/bridle.mp3' },
  { id: 99, correctWord: ['B', 'R', 'A', 'Z', 'E', 'N'], scrambledWord: ['B', 'E', 'A', 'Z', 'R', 'N'], hint: "Hint: (bold, shameless, without embarrassment. Her _ attitude, after making a ridiculous claim, shocked everyone in the room.)", audio: '/assets/wordSound/brazen.mp3' },
  { id: 100, correctWord: ['C', 'L', 'U', 'M', 'S', 'Y'], scrambledWord: ['M', 'L', 'U', 'C', 'S', 'Y'], hint: "Hint: (lacking in coordination, grace, or skill, often resulting in accidents. She tripped and dropped the tray in a _ attempt to carry all the dishes at once.)", audio: '/assets/wordSound/clumsy.mp3' },
  { id: 101, correctWord: ['B', 'L', 'I', 'T', 'H', 'E'], scrambledWord: ['E', 'L', 'I', 'T', 'H', 'B'], hint: "Bonus: (a carefree and cheerful demeanor. She faced her challenges with a blithe spirit.)", audio: '/assets/wordSound/blithe.mp3' },
  { id: 102, correctWord: ['D', 'E', 'B', 'A', 'S', 'E'], scrambledWord: ['S', 'E', 'B', 'A', 'D', 'E'], hint: "Hint: (lower quality, value, or dignity. You _ yourself whenever you insult others.)", audio: '/assets/wordSound/debase.mp3' },
  { id: 103, correctWord: ['C', 'O', 'G', 'E', 'N', 'T'], scrambledWord: ['N', 'O', 'G', 'E', 'C', 'T'], hint: "Hint: (clear, logical and convincing. John's _ argument swayed the jury in favor of his client.)", audio: '/assets/wordSound/cogent.mp3' },
  { id: 104, correctWord: ['D', 'E', 'B', 'U', 'N', 'K'], scrambledWord: ['D', 'U', 'B', 'E', 'N', 'K'], hint: "Hint: (expose the falseness of a belief or idea. It was easy to _ the conspiracy theory.)", audio: '/assets/wordSound/debunk.mp3' },
  { id: 105, correctWord: ['C', 'R', 'A', 'F', 'T', 'Y'], scrambledWord: ['C', 'R', 'Y', 'F', 'T', 'A'], hint: "Hint: (clever at achieving goals through deceit. He is indeed a _ con artist.)", audio: '/assets/wordSound/crafty.mp3' },
  { id: 106, correctWord: ['C', 'O', 'M', 'P', 'E', 'L'], scrambledWord: ['P', 'O', 'M', 'C', 'E', 'L'], hint: "Hint: (strongly persuade someone. His sincerity and conviction _ us to support his cause.)", audio: '/assets/wordSound/compel.mp3' },
  { id: 107, correctWord: ['D', 'E', 'C', 'E', 'I', 'T'], scrambledWord: ['D', 'E', 'C', 'E', 'I', 'T'], hint: "Hint: (act of misleading or tricking others. Her _ was uncovered from the inconsistencies in her claims.)", audio: '/assets/wordSound/deceit.mp3' },
  { id: 108, correctWord: ['E', 'N', 'T', 'A', 'I', 'L'], scrambledWord: ['L', 'N', 'T', 'A', 'I', 'E'], hint: "Hint: (involve or require. Completing the project will _ long hours of work.)", audio: '/assets/wordSound/entail.mp3' },
  { id: 109, correctWord: ['E', 'X', 'O', 'T', 'I', 'C'], scrambledWord: ['O', 'X', 'E', 'T', 'I', 'C'], hint: "Hint: (foreign or unusual with a sense of intrigue or fascination. The tropical island was known for its _ wildlife.)", audio: '/assets/wordSound/exotic.mp3' },
  { id: 110, correctWord: ['E', 'N', 'G', 'A', 'G', 'E'], scrambledWord: ['A', 'N', 'G', 'E', 'G', 'E'], hint: "Hint: (occupy someone's attention. The teacher tried to _ the students in a discussion on communism.)", audio: '/assets/wordSound/engage.mp3' },
  { id: 111, correctWord: ['E', 'G', 'O', 'I', 'S', 'M'], scrambledWord: ['E', 'M', 'O', 'I', 'S', 'G'], hint: "Hint: (the tendency to evaluate everything in relation to one's interest. _ often hinders collaboration and teamwork.)", audio: '/assets/wordSound/egoism.mp3' },
  { id: 112, correctWord: ['F', 'I', 'X', 'A', 'T', 'E'], scrambledWord: ['X', 'I', 'F', 'E', 'T', 'A'], hint: "Hint: (obsessively focused on or preoccupied with something. He had a tendency to _ on minor details, which sometimes caused delays in projects.)", audio: '/assets/wordSound/fixate.mp3' },
  { id: 113, correctWord: ['F', 'E', 'E', 'B', 'L', 'E'], scrambledWord: ['L', 'E', 'E', 'E', 'F', 'B'], hint: "Hint: (weak or lackng strength. The team has a _ defense.)", audio: '/assets/wordSound/feeble.mp3' },
  { id: 114, correctWord: ['F', 'I', 'C', 'K', 'L', 'E'], scrambledWord: ['L', 'E', 'C', 'K', 'F', 'I'], hint: "Hint: (likely to change their mind or loyalties frequently without a clear reason. He was known for his _ nature, often switching between hobbies and interests.)", audio: '/assets/wordSound/fickle.mp3' },
  { id: 115, correctWord: ['F', 'E', 'S', 'T', 'E', 'R'], scrambledWord: ['E', 'F', 'S', 'T', 'E', 'R'], hint: "Hint: (when a problem becomes worse or more intense over time. The unresolved issues between them continued to _, causing tension in their relationship.)", audio: '/assets/wordSound/fester.mp3' },
  { id: 116, correctWord: ['E', 'X', 'T', 'A', 'N', 'T'], scrambledWord: ['T', 'X', 'E', 'T', 'N', 'A'], hint: "Hint: (when something still exists. This manuscript is one of the few _ copies of the ancient text.)", audio: '/assets/wordSound/extant.mp3' },
  { id: 117, correctWord: ['G', 'L', 'O', 'B', 'A', 'L'], scrambledWord: ['G', 'L', 'A', 'B', 'O', 'L'], hint: "Hint: (something that affects or involves the entire world. He said that climate change is a _ issue that requires coordinated efforts from all countries.)", audio: '/assets/wordSound/global.mp3' },
  { id: 118, correctWord: ['F', 'L', 'O', 'R', 'I', 'D'], scrambledWord: ['D', 'O', 'L', 'R', 'I', 'F'], hint: "Hint: (speech or writing that is excessively complex. His _ love letter made her frown.)", audio: '/assets/wordSound/florid.mp3' },
  { id: 119, correctWord: ['H', 'E', 'R', 'A', 'L', 'D'], scrambledWord: ['E', 'H', 'R', 'A', 'D', 'L'], hint: "Hint: (be a sign that something is about to happen. The trumpet's sound _ the beginning of the royal procession.)", audio: '/assets/wordSound/herald.mp3' },
  { id: 120, correctWord: ['F', 'R', 'I', 'N', 'G', 'E'], scrambledWord: ['N', 'R', 'I', 'F', 'G', 'E'], hint: "Hint: (peripheral, unconventional, not part of  society. He preferred living on the _ of town, where it was quieter and more peaceful.)", audio: '/assets/wordSound/fringe.mp3' },
  { id: 121, correctWord: ['F', 'U', 'T', 'I', 'L', 'E'], scrambledWord: ['L', 'I', 'T', 'U', 'F', 'E'], hint: "Bonus: (incapable of producing any useful result; pointless or ineffective. Despite best efforts, their struggle against the corporation proved futile.)", audio: '/assets/wordSound/futile.mp3' },
  { id: 122, correctWord: ['M', 'A', 'L', 'I', 'G', 'N'], scrambledWord: ['A', 'M', 'L', 'I', 'G', 'N'], hint: "Hint: (speak unfavorably about someone, often with the intention of damaging their reputation. She would often _ her coworkers, spreading unfounded rumors about them.)", audio: '/assets/wordSound/malign.mp3' },
  { id: 123, correctWord: ['I', 'M', 'M', 'U', 'R', 'E'], scrambledWord: ['R', 'M', 'M', 'E', 'I', 'U'], hint: "Hint: (the act of imprisoning or confining someone.  The evil sorcerer decided to _ the princess in a hidden tower, far away from the outside world.)", audio: '/assets/wordSound/immure.mp3' },
  { id: 124, correctWord: ['I', 'R', 'O', 'N', 'I', 'C'], scrambledWord: ['C', 'R', 'O', 'N', 'I', 'I'], hint: "Hint: (a contrast between what is said and what is meant. His claim that he never reads books was _, given that he was surrounded by a library of rare and antique volumes in his room.)", audio: '/assets/wordSound/ironic.mp3' },
  { id: 125, correctWord: ['L', 'A', 'M', 'E', 'N', 'T'], scrambledWord: ['T', 'A', 'M', 'E', 'N', 'L'], hint: "Hint: (express grief, sorrow, or regret about something. She began to _ the passing of her beloved pet, shedding tears as she recalled all the happy moments they had shared.)", audio: '/assets/wordSound/lament.mp3' },
  { id: 126, correctWord: ['I', 'M', 'P', 'A', 'I', 'R'], scrambledWord: ['P', 'I', 'M', 'A', 'I', 'R'], hint: "Hint: (weaken, damage, or diminish the quality, function, or value of something. The lack of sleep can _ cognitive function and decision-making abilities, making it important to get a good night's rest for optimal performance.)", audio: '/assets/wordSound/impair.mp3' },
  { id: 127, correctWord: ['O', 'V', 'E', 'R', 'L', 'Y'], scrambledWord: ['R', 'O', 'E', 'V', 'L', 'Y'], hint: "Hint: (to an excessive degree. She was _ critical of her own work, constantly finding fault in even the smallest details.)", audio: '/assets/wordSound/overly.mp3' },
  { id: 128, correctWord: ['M', 'O', 'R', 'B', 'I', 'D'], scrambledWord: ['R', 'I', 'M', 'B', 'O', 'D'], hint: "Hint: (a state of mind that dwells excessively on dark or grim thoughts. Her fascination with crime documentaries and the macabre was often seen as _ by her friends, as she seemed to revel in the darkest aspects of human nature.)", audio: '/assets/wordSound/morbid.mp3' },
  { id: 129, correctWord: ['M', 'O', 'D', 'I', 'S', 'H'], scrambledWord: ['M', 'O', 'S', 'I', 'D', 'H'], hint: "Hint: (fashionable, stylish, or conforming to current trends in fashion or design. The new restaurant's decor was undeniably _, with its sleek, minimalist furnishings and trendy color palette, attracting a hip and stylish crowd of diners.)", audio: '/assets/wordSound/modish.mp3' },
  { id: 130, correctWord: ['M', 'E', 'N', 'A', 'C', 'E'], scrambledWord: ['N', 'A', 'M', 'E', 'C', 'E'], hint: "Hint: (a threat, danger, or something or someone that is likely to cause harm or create difficulties. The aggressive dog, with its bared teeth and growling, was a _ to anyone who dared to approach its territory.)", audio: '/assets/wordSound/menace.mp3' },
  { id: 131, correctWord: ['M', 'E', 'A', 'G', 'E', 'R'], scrambledWord: ['G', 'E', 'A', 'M', 'E', 'R'], hint: "Hint: (deficient in quantity, quality, or substance, often to the point of inadequacy. His _ savings were not enough to cover the cost of the unexpected medical bills, leaving him in a difficult financial situation.)", audio: '/assets/wordSound/meager.mp3' },
  { id: 132, correctWord: ['Q', 'U', 'I', 'R', 'K', 'Y'], scrambledWord: ['K', 'U', 'I', 'R', 'Q', 'Y'], hint: "Hint: (unconventional, peculiar. He has a _ sense of humor.)", audio: '/assets/wordSound/quirky.mp3' },
  { id: 133, correctWord: ['P', 'L', 'A', 'C', 'I', 'D'], scrambledWord: ['L', 'A', 'P', 'C', 'I', 'D'], hint: "Hint: (calm, undisturbed. The lake was _, reflecting the serene beauty of the surrounding mountains.)", audio: '/assets/wordSound/placid.mp3' },
  { id: 134, correctWord: ['P', 'R', 'O', 'L', 'I', 'X'], scrambledWord: ['P', 'R', 'I', 'L', 'O', 'X'], hint: "Hint: (using or containing too many words. Sam's _ writing made it challenging to stay engaged with the text.)", audio: '/assets/wordSound/prolix.mp3' },
  { id: 135, correctWord: ['R', 'A', 'M', 'B', 'L', 'E'], scrambledWord: ['B', 'A', 'M', 'R', 'L', 'E'], hint: "Hint: (speak or write at length in a confused way. Mark tends to _ when he's nervous.)", audio: '/assets/wordSound/ramble.mp3' },
  { id: 136, correctWord: ['P', 'A', 'T', 'E', 'N', 'T'], scrambledWord: ['T', 'A', 'T', 'E', 'N', 'P'], hint: "Hint: (obvious, readily apparent. The flaws in his argument were _ to everyone in the room.)", audio: '/assets/wordSound/patent.mp3' },
  { id: 137, correctWord: ['S', 'C', 'H', 'I', 'S', 'M'], scrambledWord: ['M', 'C', 'H', 'S', 'S', 'I'], hint: "Hint: (division within a group, typically due to different opinions. Disagreement over immigration policy led to the _ in the party.)", audio: '/assets/wordSound/schism.mp3' },
  { id: 138, correctWord: ['R', 'E', 'F', 'U', 'G', 'E'], scrambledWord: ['U', 'E', 'F', 'R', 'G', 'E'], hint: "Hint: (state or place of safety. We found _ in a cave.)", audio: '/assets/wordSound/refuge.mp3' },
  { id: 139, correctWord: ['S', 'C', 'A', 'T', 'H', 'E'], scrambledWord: ['A', 'C', 'T', 'S', 'H', 'E'], hint: "Hint: (harm or damage something, or criticize harshly. Don began to _ the artist's work, calling it uninspired and forgettable.)", audio: '/assets/wordSound/scathe.mp3' },
  { id: 140, correctWord: ['R', 'E', 'L', 'I', 'S', 'H'], scrambledWord: ['L', 'E', 'R', 'I', 'S', 'H'], hint: "Hint: (great enjoyment. They ate the food with relish.)", audio: '/assets/wordSound/relish.mp3' },
  { id: 141, correctWord: ['S', 'C', 'A', 'N', 'T', 'Y'], scrambledWord: ['T', 'A', 'S', 'C', 'N', 'Y'], hint: "Bonus: (small or insufficient. Historical records provide scanty details about the ancient civilization.)", audio: '/assets/wordSound/scanty.mp3' },
  { id: 142, correctWord: ['S', 'U', 'L', 'L', 'E', 'N'], scrambledWord: ['L', 'U', 'S', 'L', 'E', 'N'], hint: "Hint: (gloomy, depressed mood. He gave me a _ look.)", audio: '/assets/wordSound/sullen.mp3' },
  { id: 143, correctWord: ['S', 'H', 'R', 'E', 'W', 'D'], scrambledWord: ['R', 'E', 'W', 'S', 'H', 'D'], hint: "Hint: (having sharp powers of judgment. He was a _ investigator.)", audio: '/assets/wordSound/shrewd.mp3' },
  { id: 144, correctWord: ['T', 'H', 'R', 'I', 'F', 'T'], scrambledWord: ['I', 'H', 'R', 'T', 'F', 'T'], hint: "Hint: (careful management of resources. His _ enabled him build two houses from his average salary.)", audio: '/assets/wordSound/thrift.mp3' },
  { id: 145, correctWord: ['S', 'T', 'A', 'P', 'L', 'E'], scrambledWord: ['P', 'A', 'S', 'T', 'L', 'E'], hint: "Hint: (basic and essential consumables. Bread and milk are _ items in most households.)", audio: '/assets/wordSound/staple.mp3' },
  { id: 146, correctWord: ['S', 'U', 'B', 'T', 'L', 'E'], scrambledWord: ['B', 'U', 'S', 'T', 'L', 'E'], hint: "Hint: (difficult to detect or grasp; not obvious. Jane's compliment was so _ that I almost missed it.)", audio: '/assets/wordSound/subtle.mp3' },
  // { id: 147, correctWord: ['B', 'E', 'N', 'I', 'G', 'N'], scrambledWord: ['Y', 'I', 'W', 'T', 'T', 'Y'], hint: "Hint: (persuade.)", audio: '/assets/wordSound/witty.mp3' },



  // {id: 1, correctWord: ['T', 'S', 'K', 'T', 'S', 'K'], scrambledWord: ['S', 'S', 'K', 'K', 'T', 'T'], hint: 'hint: (Express your disapproval with this sound. Esther replied with _.)', audio: '/assets/wordSound/tsktsk.mp3' },
  // {id: 1, correctWord: ['U', 'N', 'P', 'R', 'E', 'C', 'E', 'D', 'E', 'N', 'T', 'E', 'D'], scrambledWord: ['D', 'T', 'N', 'D', 'C', 'R', 'P', 'N', 'U', 'E', 'E', 'E', 'E'], hint: 'hint: (Not happened before now. This is an _ event.)', audio: '/assets/wordSound/unprecedented.mp3' },
  // {id: 1, correctWord: ['A', 'N', 'T', 'I', 'D', 'I', 'S', 'E', 'S', 'T', 'A', 'B', 'L', 'I', 'S', 'H', 'M', 'E', 'N', 'T', 'A', 'R', 'I', 'A', 'N', 'I', 'S', 'M'], scrambledWord: ['N', 'N', 'T', 'M', 'D', 'S', 'S', 'R', 'S', 'T', 'T', 'B', 'L', 'N', 'S', 'H', 'M', 'E', 'I', 'A', 'A', 'E', 'I', 'A', 'A', 'I', 'I', 'I'], hint: 'hint: (Opposition to withdrawing government support for a religion. Maxwell is against _.)', audio: '/assets/wordSound/antidisestablishmentarianism.mp3' }


];


const DB_NAME = 'wordsDatBase';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'words';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });

      // Explicitly define indexes if needed
      // const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
      // objectStore.createIndex('saying', 'saying', { unique: false });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(new Error(`Failed to open the database: ${event.target.error}`));
    };

    // Handle the blocked event
    request.onblocked = (event) => {
      console.error(`Database is blocked. This may be due to exceeded storage limits.`);
      // You can handle this situation here, e.g., by showing a user-friendly message.
    };
  });
}

// Function to add thoughts to the database and return a promise
function addThoughtsToDatabase(db, thoughts) {
  return Promise.all(thoughts.map(async (thought) => {
    try {
      // Fetch audio data as array buffers
      const audioArrayBuffer = await fetch(thought.audio).then(response => response.arrayBuffer());


      // Start a read-write transaction on the thoughts object store
      const transaction = db.transaction(OBJECT_STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      // Check if a thought with the same id already exists
      const getRequest = objectStore.get(thought.id);

      getRequest.onsuccess = (event) => {
        const existingThought = event.target.result;

        if (!existingThought) {
          // Add the thought to the object store
          const request = objectStore.add({
            id: thought.id,
            correctWord: thought.correctWord,
            scrambledWord: thought.scrambledWord,
            hint: thought.hint,
            audio: audioArrayBuffer,
          });

          // Return a promise for the completion of this add operation
          return new Promise((resolve, reject) => {
            // Event handler for successful addition
            request.onsuccess = () => resolve();

            // Event handler for addition error
            request.onerror = (event) => reject(new Error(`Failed to add thought to the database: ${event.target.error}`));

            // Handle the blocked event
            request.onblocked = (event) => {
              console.error(`Database is blocked. This may be due to exceeded storage limits.`);
              // You can handle this situation here, e.g., by showing a user-friendly message.
            };
          });
        } else {
          return Promise.resolve(); // Resolve immediately since the thought already "exists"
        }
      };

      getRequest.onerror = (event) => {
        console.error(`Error checking for existing thought: ${event.target.error}`);
        return Promise.reject(event.target.error);
      };
    } catch (error) {
      // If fetching or storing data fails, reject the promise
      return Promise.reject(error);
    }
  }));
}

function loadThoughtsFromDatabase(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      const thoughts = event.target.result;

      const thoughtsWithImages = thoughts.map((thought) => {
        const audioBlob = new Blob([thought.audio]);
        thought.audioURL = URL.createObjectURL(audioBlob);
        return thought;
      });

      resolve(thoughtsWithImages);
    };

    request.onerror = (event) => {
      reject(new Error(`Failed to load thoughts from the database: ${event.target.error}`));
    };
  });
}

function initializeDatabase() {
  return openDatabase()
    .then((db) => {
      const thoughts = WordSet.map(({ id, correctWord, scrambledWord, hint, audio }) => ({ id, correctWord, scrambledWord, hint, audio }));
      return addThoughtsToDatabase(db, thoughts);
    })
    .catch((error) => {
      throw new Error(`Failed to initialize the database: ${error.message}`);
    });
}

const WordsFromDBPromise = openDatabase()
  .then((db) => initializeDatabase().then(() => loadThoughtsFromDatabase(db)))
  .catch((error) => {
    throw new Error(`Failed to open the database: ${error.message}`);
  });

export default WordsFromDBPromise;

