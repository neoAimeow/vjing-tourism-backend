import React from "react";

interface Props {}

// class TestPage extends Component<Props> {
//     state = {};

//     render() {
//         return <div> hello test page</div>;
//     }
// }

const TestPage = (props: Props) => {
    console.warn("page1");
    return <div> hello test page</div>;
};

export default TestPage;
