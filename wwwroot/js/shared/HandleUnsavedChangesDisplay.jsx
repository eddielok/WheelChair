export default function HandleUnsavedChangesDisplay(props) {
if (!props.isDisplay)
        return null;
    else
        return (
            <div className="isModified">
                <br />
                <Alert variant="warning">
                    <Alert.Heading>You have unsaved changes in forms: </Alert.Heading>
                    <p>
                        {props.message}
                    </p>
                </Alert>
            </div>
        );
} 