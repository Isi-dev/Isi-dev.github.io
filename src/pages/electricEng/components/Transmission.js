
import Knowthese  from "./Knowthese";


class Transmission extends Knowthese {
    constructor(canvas) {
        super(canvas, 70);
    }
    setQuestionsAndOptions() {
        this.knowthis[0].setQuestionAndOptions('Transmission of electricity in Nigeria in 2020', 'TCN', 'PHED', 'NEPA');
        this.knowthis[1].setQuestionAndOptions('A goal of operational procedures', 'Prevent electrocution', 'Increase generation', 'Reduce supplied voltage');
        this.knowthis[2].setQuestionAndOptions('Another goal of operational procedures', 'Avoid equipment damage', 'Increase number of equipment', 'Save equipment');
        this.knowthis[3].setQuestionAndOptions('Another goal of operational procedures', 'Lower risk of burns or explosions', 'Remove overheated components', 'Cool electrical components');
        this.knowthis[4].setQuestionAndOptions('Another goal of operational procedures', 'Prevent grid disturbances and system collapse', 'Expand the national grid', 'Demarcate the grid');
        this.knowthis[5].setQuestionAndOptions('Generation dispatch and frequency control', 'Operational procedure 3', 'Operational procedure 4', 'Operational procedure 2');
        this.knowthis[6].setQuestionAndOptions('Operational standard of security of supply on the Transmission grid system', 'Operational procedure 1', 'Operational procedure 5', 'Operational procedure 6');
        this.knowthis[7].setQuestionAndOptions('Emergency action in the event of serious breakdown of the transmission grid system', 'Operational procedure 5', 'Operational procedure 4', 'Operational procedure 6');
        this.knowthis[8].setQuestionAndOptions('Actions and the transfer of responsibilities during a complete loss of communication in the transmission grid system', 'Operational procedure 2', 'Operational procedure 1', 'Operational procedure 4');
        this.knowthis[9].setQuestionAndOptions('System restoration after a collapse', 'Operational procedure 6', 'Operational procedure 4', 'Operational procedure 5');
        this.knowthis[10].setQuestionAndOptions('Voltage control on the transmission grid system', 'Operational procedure 4', 'Operational procedure 5', 'Operational procedure 6');
        this.knowthis[11].setQuestionAndOptions('The Main Interconnected System shall be operated under normal and outage conditions so that in the event of a planned or fault outage of a grid equipment, the following shall be prevented from occurring: loss of supply, unacceptable high or low voltage, system instability, unacceptable overloading of apparatus, and a permanent change in the system frequency below ___ ', '49.8Hz', '49.0Hz', '48.7Hz');
        this.knowthis[12].setQuestionAndOptions('Which of the following is acceptable for supply to groups with demand less than 300MW during a planned outage?', 'Loss of supply', 'System instability', 'Overloading of apparatus');
        this.knowthis[13].setQuestionAndOptions('In order to meet the security standards under operational procedure 1, the merit order of power dispatch shall be __', 'Suspended', 'Enforced', 'Changed');
        this.knowthis[14].setQuestionAndOptions('Responsible for scheduling and dispatch of generation output instructions to meet the demand on the Transmission Grid System and maintain the frequency within satisfactory limits.', 'National Control Center', 'Regional Control Center', 'Area Control Center');
        this.knowthis[15].setQuestionAndOptions('The National Control Centre is expected to control the System Frequency, at least 97 % of the time during normal conditions, within an operating band of __ ', '50Hz +/- 0.5%', '50Hz +/-1%', '50Hz +/- 2.5%');
        this.knowthis[16].setQuestionAndOptions('The National Control Centre is expected to control the System Frequency, under system stress, within an operating band of __ ', '50Hz +/- 2.5%', '50Hz +/- 5%', '50Hz +/- 1.5%');
        this.knowthis[17].setQuestionAndOptions('Responsible for providing advice regarding the generation requirement on the Transmission Grid', 'System Planner', 'System Operator', 'Project Manager');
        this.knowthis[18].setQuestionAndOptions('According to operational procedure 3, the security of the System shall take precedence over economic and water management considerations', 'True', 'False', 'Not applcable');
        this.knowthis[19].setQuestionAndOptions('Free Governor control, under-frequency relay, load shedding', 'Frequency control', 'Voltage Control', 'Power control');
        this.knowthis[20].setQuestionAndOptions('A reserve that can respond within ten seconds and be fully active within 30 minutes of activation.', 'Quick reserve', 'Slow reserve', 'Average reserve');
        this.knowthis[21].setQuestionAndOptions('Additional output from a synchronised Generating Unit to restore system frequency to acceptable levels in the event of sudden reduction in generation', 'Spinning reserve', 'Emergency reserve', 'Slow reserve');
        this.knowthis[22].setQuestionAndOptions('An automatic and immediate change in Active Power output of a Generating Unit in response to System Frequency changes', 'Primary reserve', 'Secondary reserve', 'Emergency reserve');
        this.knowthis[23].setQuestionAndOptions('A less frequently used reserve which is activated, on request, within ten minutes and is sustainable for two hours.', 'Emergency reserve', 'Secondary reserve', 'Primary reserve');
        this.knowthis[24].setQuestionAndOptions('An automatic response to Frequency changes which is fully available by 30 seconds from the time of Frequency change and is sustainable for at least 30 minutes.', 'Secondary reserve', 'Emergency reserve', 'Primary reserve');
        this.knowthis[25].setQuestionAndOptions('An operating Reserve that is not connected to the Transmission System but can  meet demand within a specified time. ', 'Slow reserve', 'Emergency reserve', 'Secondary reserve');
        this.knowthis[26].setQuestionAndOptions('A condition of readiness of a Generating Unit that is declared available, ready to start, synchronise and attain target loading within 14 hours.', 'Cold standby', 'Hot standby', 'Warm standby');
        this.knowthis[27].setQuestionAndOptions('A condition of readiness of a Generating Unit that is declared available, ready to synchronise and attain target loading within 30 minutes.', 'Hot standby', 'Fast standby', 'HotFast standby');
        this.knowthis[28].setQuestionAndOptions('NCC has the responsibility to conduct tests of response rates of both synchronized and non-synchronized Active Power resources and the ability of generating resources to demonstrate Operating Reserve capability', 'True', 'False', 'Partly True');
        this.knowthis[29].setQuestionAndOptions('Order To Operate', 'OF17', 'OF15', 'OF14');
        this.knowthis[30].setQuestionAndOptions('Self protection tag', 'OF11', 'OF12', 'OF13');
        this.knowthis[31].setQuestionAndOptions('Trouble and repair report', 'OF19', 'OF14', 'OF22');
        this.knowthis[32].setQuestionAndOptions('Daily log book', 'OF56', 'OF53', 'OF58');
        this.knowthis[33].setQuestionAndOptions('Caution tag', 'OF13', 'OF12', 'OF10');
        this.knowthis[34].setQuestionAndOptions('Interruption and outage report', 'OF53', 'OF56', 'OF58');
        this.knowthis[35].setQuestionAndOptions('Operations under work and test permit', 'OF14', 'OF12', 'OF16');
        this.knowthis[36].setQuestionAndOptions('Daily inspection sheet', 'OF57', 'OF56', 'OF58');
        this.knowthis[37].setQuestionAndOptions('Limit for safe working space/barrier tag', 'OF16', 'OF15', 'OF19');
        this.knowthis[38].setQuestionAndOptions('Automatic operation report', 'OF100', 'OF105', 'OF102');
        this.knowthis[39].setQuestionAndOptions('Application for protection guarantee', 'OF1', 'OF2', 'OF4');
        this.knowthis[40].setQuestionAndOptions('Hourly reading sheet', 'OF58', 'OF56', 'OF53');
        this.knowthis[41].setQuestionAndOptions('Work permit tag (OF means "Operating Form")', 'OF6', 'OF7', 'OF8');
        this.knowthis[42].setQuestionAndOptions('Station Guarantee Tag', 'OF8', 'OF6', 'OF7');
        this.knowthis[43].setQuestionAndOptions('Work & Test permit tag', 'OF7', 'OF6', 'OF8');
        this.knowthis[44].setQuestionAndOptions('Danger sign for work and test permit/sign tag', 'OF15', 'OF16', 'OF17');
        this.knowthis[45].setQuestionAndOptions('Plant take over tag', 'OF10', 'OF11', 'OF12');
        this.knowthis[46].setQuestionAndOptions('NCC daily load shed', '105A', '105B', '106A');
        this.knowthis[47].setQuestionAndOptions('Shift schedule ', 'OF22', 'OF17', 'OF12');
        this.knowthis[48].setQuestionAndOptions('Hold off tag', 'OF12', 'OF13', 'OF14');
        this.knowthis[49].setQuestionAndOptions('Responsible for controlling voltage on non-interconnected 132KV circuits and at bulk supply points (33KV and 11KV) fed from the Grid System.', 'RCC / ACC', 'NCC / RCC', 'NCC / ACC');
        this.knowthis[50].setQuestionAndOptions('The specified voltage control range for a 330KV busbar is', '330KV -15% +5%', '330KV -16% +5%', '330KV -10% +5%');
        this.knowthis[51].setQuestionAndOptions('The specified voltage control range for a 132KV busbar is', '132KV -15% +10%', '132KV -10% +10%', '132KV -5% +10%');
        this.knowthis[52].setQuestionAndOptions('The specified voltage control range for a 66KV busbar is', '66KV -/+ 6%', '66KV -/+ 5%', '66KV -/+ 4%');
        this.knowthis[53].setQuestionAndOptions('The specified voltage control range for a 33KV busbar is', '33KV -/+ 6%', '33KV -/+ 5%', '33KV -/+ 4%');
        this.knowthis[54].setQuestionAndOptions('The specified voltage control range for a 11KV busbar is', '11KV -/+ 5%', '11KV -/+ 4%', '11KV -/+ 6%');
        this.knowthis[55].setQuestionAndOptions('Under system stress, excluding transient disturbances, busbar voltages are allowered to deviate from the recommended range by an extra', '+/-5%', '+/-3%', '+/-6%');
        this.knowthis[56].setQuestionAndOptions('What is the rating of Benin - Ajaokuta 330KV line for voltage control according to Operational Procedure 4?', '74MX', '60MX', '29MX');
        this.knowthis[57].setQuestionAndOptions('What is the rating of Benin - Sapele 330KV line for voltage control according to Operational Procedure 4?', '29MX', '60MX', '74MX');
        this.knowthis[58].setQuestionAndOptions('What is the rating of Osogbo - Jebba 330KV line for voltage control according to Operational Procedure 4?', '60MX', '74MX', '29MX');
        this.knowthis[59].setQuestionAndOptions('Var Absorption by Tap Stagger', 'Placing 2 or more transformers on different Taps', 'Placing 2 or more transformers on the same Tap', 'Manual tap-changing');
        this.knowthis[60].setQuestionAndOptions('The low frequency alarm operates at', '49.8Hz', '49.0Hz', '48.7Hz');
        this.knowthis[61].setQuestionAndOptions('All standby hydro and gas turbines should be synchronized with the grid if the frequency falls to', '49.5Hz', '49.8Hz', '49.0Hz');
        this.knowthis[62].setQuestionAndOptions('Load must be shed manually without reference to NCC, RCC or ACC if the frequency falls below', '49.0Hz', '49.5Hz', '49.8Hz');
        this.knowthis[63].setQuestionAndOptions('At what frequency should an operator commence the restoration of load that was taken out due to previously low frequency?', '50.3', '50.0', '50.2');
        this.knowthis[64].setQuestionAndOptions('The high frequency alarm operates at', '51Hz', '50.5Hz', '50.8Hz');
        this.knowthis[65].setQuestionAndOptions('When a power Island detaches from the rest of the transmission grid system with a collapse of associated generator(s)', 'Partial system collapse', 'Total system collapse', 'Power Island collapse');
        this.knowthis[66].setQuestionAndOptions('Responsible for coordinating the paralleling operation of re-established Power islands after a system collapse', 'NCC', 'RCC', 'ACC');
        this.knowthis[67].setQuestionAndOptions('', '', '', '');
        this.knowthis[68].setQuestionAndOptions('', '', '', '');
        this.knowthis[69].setQuestionAndOptions('', '', '', '');
    }
}


export default Transmission;