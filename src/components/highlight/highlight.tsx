export const Highlight = (props: { filter: any, str: any }) => {
    if (!props.filter) return props.str;
    const regExp = new RegExp(props.filter, 'ig');
    const matchValue = props.str.match(regExp);
    if (matchValue) {
        return props.str.split(regExp).map((el: any, index: any, array: any) => {
            if (index < array.length - 1) {
                const c = matchValue.shift();
                return <>{el}<span data-test-id='highlight-matches' className='highlighted'>{c}</span></>
            }
            return el;
        })
    }
    return props.str;
};
