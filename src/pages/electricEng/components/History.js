
import Knowthese  from "./Knowthese";


class History extends Knowthese{
    constructor(canvas) {
        super(canvas, 50);
    }
    setQuestionsAndOptions() {
        this.knowthis[0].setQuestionAndOptions('History of Electricity in Nigeria', 'History', 'Generation', 'Transmission');
        this.knowthis[1].setQuestionAndOptions('Establishment of the Public Works Department (PWD) which contained an electricity department that served GRAs and commercial centers with generating sets', '1896', '1898', '1890');
        this.knowthis[2].setQuestionAndOptions('Free Governor control of generators was achieved on', '22ⁿᵈ May 2017', '22ⁿᵈ May 2007', '22ⁿᵈ May 1997');
        this.knowthis[3].setQuestionAndOptions('The Nigerian Electricity Supply Company (NESCO), the first electricity utility company in Nigeria, was established near Jos to manage the hydroelectric plant in Kano which powered the mining industry', '1929', '1930', '1928');
        this.knowthis[4].setQuestionAndOptions('The Electricity Corporation of Nigeria (ECN), which took over the electricity department of the PWD, was establised', '1951', '1950', '1945');
        this.knowthis[5].setQuestionAndOptions('From 1952 to 1960, ECN installed coal powered turbines at', 'Oji & Ijora', 'Afam & Alaoji', 'Itu & Eket');
        this.knowthis[6].setQuestionAndOptions('ECN completed a 132KV transmission line linking Lagos to Ibadan via Shagamu', '1961', '1960', '1963');
        this.knowthis[7].setQuestionAndOptions('The Niger Dams Authority (NDA) was established to build and maintain dams along river Niger & Kaduna river', '1962', '1963', '1964');
        this.knowthis[8].setQuestionAndOptions('In 1969, NDA commissioned a 320MW hydro power plant at Kainji and sold the power generated to', 'ECN', 'Miners', 'Commercial centers');
        this.knowthis[9].setQuestionAndOptions('ECN & NDA were merged to form the National Electric Power Authority (NEPA)', '1972', '1978', '1979');
        this.knowthis[10].setQuestionAndOptions('The total generating capacity of NEPA', '6200MW', '5350MW', '5800MW');
        this.knowthis[11].setQuestionAndOptions('The Electric Power Sector Reform (ESPR) act was enacted', 'March 2005', 'May 2005', 'June 2005');
        this.knowthis[12].setQuestionAndOptions('NEPA was unbundled and renamed Power Holding Company of Nigeria (PHCN) which was a transitional corporation comprising', '18 companies', '16 companies', '11 companies');
        this.knowthis[13].setQuestionAndOptions('PHCN was made up of', '6 Gencos, 11 Discos & 1 Transysco', '4 Gencos, 11 Discos & 1 Transysco', '4 Gencos, 6 Discos & 1 Transysco');
        this.knowthis[14].setQuestionAndOptions('The Nigeria Bulk Electricity Trader (NBET), which purchases power from the Gencos and Independent power providers (IPPs) at prices stated in the Power Purchase Agreements (PPA) and sells to Discos, was established', '2010', '2005', '2013');
        this.knowthis[15].setQuestionAndOptions('Privatisation of all Gencos and 10 Discos was completed', 'November 2013', 'March 2013', 'March 2014');
        this.knowthis[16].setQuestionAndOptions('Kaduna Disco was privatised', '2014', '2015', '2016');
        this.knowthis[17].setQuestionAndOptions('Plants managed by the private sector prior to privatisation - Independent Power Providers (IPPs)', 'Afam 6, Okpai, Ibom Power & NESCO', 'Okpai, Ibom Power & Egbin', 'Okpai, Ibom Power & Ughelli Power');
        this.knowthis[18].setQuestionAndOptions('The Niger Delta Power Holding Company (NDPHC) was incorporated to manage the National Integrated Power Projects (NIPP) involving construction of critical infrastructure in the sub sectors of the electric power value chain', '2004', '2005', '2006');
        this.knowthis[19].setQuestionAndOptions('The Transmission Company of Nigeria (TCN) was incorporated', 'November 2005', 'March 2005', 'July 2005');
        this.knowthis[20].setQuestionAndOptions('TCN was issued a transmission license by the Nigerian Electricity Regulatory Commission (NERC)', '1ˢᵗ July 2006', '1ˢᵗ March 2006', '1ˢᵗ November 2006');
        this.knowthis[21].setQuestionAndOptions('NERC was formed on 31ˢᵗ October', '2005', '2006', '2007');
        this.knowthis[22].setQuestionAndOptions('The National Council on Privatisation (NCP), with its secretariat and implementation arm known as the Bureau of Public Enterprises (BPE), was established', '1999', '2000', '2002');
        this.knowthis[23].setQuestionAndOptions('The Rural Electrification Agency (REA) was formed in', 'March 2006', 'March 2005', 'March 2007');
        this.knowthis[24].setQuestionAndOptions('Plant take over tag', 'OF10', 'OF11', 'OF12');
        this.knowthis[25].setQuestionAndOptions('NCC daily load shed', '105A', '105B', '106A');
        this.knowthis[26].setQuestionAndOptions('Shift schedule ', 'OF22', 'OF17', 'OF12');
        this.knowthis[27].setQuestionAndOptions('Hold off tag', 'OF12', 'OF13', 'OF14');
        this.knowthis[28].setQuestionAndOptions('Danger sign for work and test permit/sign tag', 'OF15', 'OF16', 'OF17');
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
        this.knowthis[44].setQuestionAndOptions('', '', '', '');
        this.knowthis[45].setQuestionAndOptions('', '', '', '');
        this.knowthis[46].setQuestionAndOptions('', '', '', '');
        this.knowthis[47].setQuestionAndOptions('', '', '', '');
        this.knowthis[48].setQuestionAndOptions('', '', '', '');
        this.knowthis[49].setQuestionAndOptions('', '', '', '');
    }
}


export default History;