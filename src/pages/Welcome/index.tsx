import React from "react";

interface Props {}

// class TestPage extends Component<Props> {
//     state = {};

//     render() {
//         return <div> hello test page</div>;
//     }
// }

const Welcome = (props: Props) => {
    console.warn("Welcome");

    return <div> hello welcome page</div>;
};

export default Welcome;
