const GetDatalistFromNumericRange = React.memo(({ start , end,name}) => {
   return (
             <datalist id={name}>
                <GetListData start={start} end={end} />
            </datalist>
   ); 
});
function GetListData(props) { 
    var tmp = [];
    for (let i = props.start;i<=props.end;i++)
        tmp.push(i); 
    return tmp.map((e, k) => <option value={e} key={k} />);
} 
GetDatalistFromNumericRange.displayName = 'GetDatalistFromNumericRange'
export default GetDatalistFromNumericRange;
