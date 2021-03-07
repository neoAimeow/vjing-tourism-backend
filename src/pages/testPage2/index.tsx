import React from "react";

interface Props {}

// class TestPage extends Component<Props> {
//     state = {};

//     render() {
//         return <div> hello test page</div>;
//     }
// }

const TestPage2 = (props: Props) => {
    console.warn("page2");

    return <div> hello test11111 page2</div>;
};

export default TestPage2;
