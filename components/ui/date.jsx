const FormattedDate = ({date}) => {
    const dateparts = date.split('-');
    const convertdate = new Date(dateparts[0], dateparts[1] - 1, dateparts[2]).toDateString();
    const day = convertdate.slice(0, 3);
    const dateonly = convertdate.slice(4,10) + ", " + convertdate.slice(11,15);

    return (
        <div
         style={{ fontSize: '1rem' , fontWeight: '600'}}
        >
            {day} - {dateonly}
        </div>
    )
}

export default FormattedDate