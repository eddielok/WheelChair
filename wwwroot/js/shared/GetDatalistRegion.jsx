const sub_main_district = {
    'Central and Western': ['Sai Ying pun', 'Sheung Wan', 'Shek Tong Tsui', 'Mid-levels', 'Peak', 'Central', 'Admiralty', 'Sheung Wan', 'Sai Ying Pun', 'Kennedy Town'],
    'Wan Chai': ['Causeway Bay', 'Happy Valley', 'Tai Hang', 'So Kon PO', 'Jardine\'s Lookout'],
    'Eastern': ['Sai Wan HO', 'Shau Kei Wan', 'North Point', 'Quarry Bay', 'Chai Wan', 'Siu Sai Wan"Tin Hau', 'Braemar Hill'],
    'Southern': ['Pok Fu Lam', 'Aberdeen', 'Shouson Hill', 'Repulse Bay', 'Ap Lei Chau', 'Wong Chuk Hang', 'Chung Hom Kok', 'Stanley', 'Tai Tam', 'Shek O'],
    'Yau Tsim Mong': ['Tsim Sha Tsui', 'Yau Ma Tei', 'West Kowloon Reclamation', 'Tai Kok Tsui', 'King\'s park', 'Mong KOk'],
    'Sham Shui Po': ['Mei Foo', 'Lai Chi Kok', 'Cheung Sha Wan', 'Yau Yat Tsuen', 'Tai Wo Ping', 'Sham Shui Po', 'Shek Kip Mei', 'Stonecutters Island'],
    'Kowloon City': ['Hung Hom', 'TO Kwa Wan', 'Ma Tau Kok', 'Ma Tau Wai', 'HO Man Tin', 'Kowloon Tong', 'KaiTak', 'Kowloon City', 'Beacon Hill'],
    'Wong Tai Sin': ['San po Kong', 'Tung Tau', 'Wang Tau Hom', 'Tsz Wan Shan', 'Ngau Chi Wan"Lok Fu', 'Diamond Hill'],
    'Kwun Tong': ['Ping Shek', 'Kowloon Bay', 'Ngau Tau Kok', 'Jordan Valley', 'Lam Tin', 'Yau Tong', 'Sau Mau Ping', 'Lei Yue Mun'],
    'Kwai Tsing': ['Kwai Chung', 'Tsing Yi'],
    'Tsuen Wan': ['Lei Muk Shue', 'Tsing Lung Tau', 'Ma Wan', 'Ting Kau', 'Sham Tseng', 'Sunny Bay'],
    'Tuen Mun': ['Tai Lam Chung', 'So Kwun Wat', 'Lam Tei'],
    'Yuen Long': ['Hung Shui Kiu', 'Ha Tsuen', 'Tin Shui wai ', 'Lau Fau Shan', 'San Tin', 'Lok Ma Chau', 'Kam Tin', 'Shek Kong', 'Pat Heung'],
    'North': ['Fanling', 'Luen Wo Hui', 'Sheung Shui', 'Shek wu Hui', 'Sha Tau Kok', 'Luk Keng', 'Wu Kau Tang'],
    'Tai Po': ['Tai Po Market ', 'Tai PO Kau', 'Tai Mei Tuk', 'Shuen Wan', 'Cheung Muk Tau', 'Kei Ling Ha'],
    'Sha Tin': ['Fo Tan', 'Ma Liu Shui', 'Wu Kai Sha', 'Ma On Shan'],
    'Sai Kung': ['Clear Water Bay ', 'Tai Mong Tsai', 'Tseung Kwan O', 'Ma Yau Tong', 'Hang Hau', 'Tiu Keng Leng'],
    'Islands': ['Cheung Chau', 'Peng Chau', 'Lantau Island', 'Tung Chung', 'Lamma Island']
};
function GetListData(props) {
    var k = 0;
    return Object.keys(sub_main_district)
        .map((district) => {
            let tmp = [];
            tmp.push(< option value={district} className="optionGroup" key={k++}>{district}</option >);
            tmp.push(sub_main_district[district].map((sub_district) => < option value={sub_district} className="optionChild" key={k++}>{sub_district}</option >));
            return tmp;
        });
}
export default class GetDatalistRegion extends React.Component {
    // perform shallow compare
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.requiredType != this.props.requiredType || nextProps.selected != this.props.selected;
    }
    render() {
        return (
            <select id={this.props.requiredType} name={this.props.name} value={this.props.selected} onChange={this.props.onChangeHandler}>
                <GetListData />
            </select>
        );
    }
}
