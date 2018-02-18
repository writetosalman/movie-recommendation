import React, {Component}   from 'react';

class PromiseButton extends Component {

    constructor(props, context) {
        super(props, context);

        this.componentLoaded    = true;
        this.state              = {
            isPending:      false,
            isFulfilled:    false,
            isRejected:     false
        };

        this.handleClick    = this.handleClick.bind(this);
        this.resetState     = this.resetState.bind(this);
    }

    /**
     * This function is called once component is ready
     */
    componentDidMount() {
        this.componentLoaded = true;
    }

    /**
     * This function is called once component is ready
     */
    componentWillUnmount() {
        //console.log('Promise button is unmounting');
        this.componentLoaded = false;
    }

    resetState() {
        if ( this.componentLoaded === false ) {
            return;
        }

        this.setState({
            isPending: false,
            isFulfilled: false,
            isRejected: false
        });
    }

    handleClick(event) {
        this.setState({
            isPending: true
        });

        let promise = this.props.onClick(...arguments);
        if (promise && promise.then) {
            promise.then(() => {
                if ( this.componentLoaded === true ) {
                    this.setState({
                        isPending: false,
                        isRejected: false,
                        isFulfilled: true
                    });
                }
            }).catch((error) => {
                if ( this.componentLoaded === true ) {
                    this.setState({
                        isPending: false,
                        isRejected: true,
                        isFulfilled: false
                    });
                    throw error;
                }
            });
        } else {
            this.resetState();
        }
    }

    render() {
        const { isPending, isFulfilled, isRejected } = this.state;
        const {
            children,
            text,
            pendingText,
            fulFilledText,
            rejectedText,
            className,
            loadingClass,
            fulFilledClass,
            rejectedClass,
            tabIndex,
        } = this.props;
        const isDisabled = this.props.disabled || isPending;
        let buttonText;

        if (isPending) {
            buttonText = pendingText;
        } else if (isFulfilled) {
            buttonText = fulFilledText;
        } else if (isRejected) {
            buttonText = rejectedText;
        }
        buttonText = buttonText || text;

        const btnClasses = classNames(className, {
            [`${loadingClass || 'AsyncButton--loading'}`]: isPending,
            [`${fulFilledClass || 'AsyncButton--fulfilled'}`]: isFulfilled,
            [`${rejectedClass || 'AsyncButton--rejected'}`]: isRejected
        });
        return (
            <button tabIndex={tabIndex} className={btnClasses} disabled={isDisabled} onClick={this.handleClick}>
                {children || buttonText}
                {this.state.isPending && <i className="fa fa-spinner fa-spin fa-fw"> </i>}
            </button>
        );
    }
}

export default PromiseButton;

export const classNames = (...klasses) => {
    return klasses
        .reduce((prev, curr) => {
            if (typeof curr === 'string' && curr) {
                prev.push(curr);
            } else if (typeof curr === 'object') {
                Object.keys(curr).map(key => {
                    if (curr[key]) {
                        prev.push(key);
                    }
                    return key;
                });
            }
            return prev;
        }, [])
        .join(' ');
};