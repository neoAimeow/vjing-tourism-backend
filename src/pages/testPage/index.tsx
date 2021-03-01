import React from "react";

interface Props {
    test?: string;
}

// class TestPage extends Component<Props> {
//     state = {};

//     render() {
//         return <div> hello test page</div>;
//     }
// }

const TestPage = (props: Props) => {
    const { test } = props;
    console.warn(test);
    return <div> hello test page</div>;
};

export default TestPage;
