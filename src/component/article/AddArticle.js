import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as articleActions from '../../module/article/actions'


const InvisibleUploadButton = styled.input`
    display:none;
`

const Preview = styled.div`
    height:300px;
    border-radius:5px;
    background-image: url(${props => props.src});
    background-repeat:no-repeat;
    background-position:center center;
    &:hover{
        cursor:pointer;
    }
`

class AddArticle extends Component {

    state = {
        image: null,
        content: ""
    }

    onImageChange = e => {
        if (!(e.target.files && e.target.files.length)) {
            return;
        }

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            this.setState({
                image: {
                    file: file,
                    src: reader.result
                }
            })
        }
    }
    onAddImage = e => {
        this.refs.image.click();
    }

    onHandleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAddArticle = e => {
        const { image, content } = this.state;
        if (!image) {
            this.props.articleActions.addArticleFailed(new Error('Image required'));
            return;
        }

        this.props.articleActions.addArticle({ file: image.file, content });
    }

    onDeleteImage = e => {
        this.refs.image.value = '';
        this.setState({
            image: null
        })
    }

    render() {

        const { image, content } = this.state;
        const { error, isLoading } = this.props;
        return (
            <Form>
                <InvisibleUploadButton ref="image" type="file" onChange={this.onImageChange} />
                <Button fluid onClick={this.onAddImage}>이미지 추가</Button>
                {image && image.src ? <Preview src={image.src} onClick={this.onDeleteImage} /> : null}
                <Form.TextArea name="content" value={content} onChange={this.onHandleChange} />
                <Button fluid loading={isLoading} onClick={this.onAddArticle}>게시글 추가</Button>
                {error && error.message ? <Message>{error.message}</Message> : null}
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.article.addArticle.isLoading,
        error: state.article.addArticle.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        articleActions: bindActionCreators(articleActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);