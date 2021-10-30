/* eslint-disable react/no-unused-state */
import React from 'react';
import ForumService from '../services/forum.service';
import { Base64 } from 'js-base64';

export const ForumContext = React.createContext();

class ForumProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      totalQuestion: 0,
      limit: 2,
      answerList: [],
      totalAnswer: 0,
      getQuestionList: this.getQuestionList,
      addQuestion: this.addQuestion,
      updateQuestion: this.updateQuestion,
      deletQuestion: this.deleteQuestion,
      getQuestion: this.getQuestion,
      getAnswerList: this.getAnswerList,
      addAnswer: this.addAnswer,
      updateAnswer: this.updateAnswer,
      deleteAnswer: this.deleteAnswer,
    };
  }

  getQuestionList = async (setting) => {
    const response = await ForumService.getQuestionList({ ...setting, limit: this.state.limit });
    this.setState({ questionList: response.questionList, totalQuestion: response.totalQuestion });
    return response;
  }

  addQuestion = async (data) => {
    const { description } = data;
    const encryptedDescription = Base64.encode(description);
    data.description = encryptedDescription;

    const response = await ForumService.addQuestion(data);
    if (typeof response !== 'string') {
      const { questionList } = this.state;
      questionList.splice(0, 0, response);
      this.setState({ questionList });
    }
    return response;
  }

  updateQuestion = async (qid, data) => {
    const { description } = data;
    const encryptedDescription = Base64.encode(description);
    data.description = encryptedDescription;

    const response = await ForumService.updateQuestion(qid, data);
    return response;
  }

  deleteQuestion = async (qid) => {
    const response = await ForumService.deleteQuestion(qid);
    if (!response) {
      const { questionList } = this.state;
      const index = questionList.findIndex((q) => q.id === qid);
      questionList.splice(index, 1);
      this.setState({ questionList });
    }
    return response;
  }

  getQuestion = async (qid) => {
    const response = await ForumService.getQuestion(qid);
    const { description } = response;
    const decryptedDescription = Base64.decode(description);
    response.description = decryptedDescription;
    return response;
  }

  getAnswerList = async (qid, setting) => {
    const { limit } = this.state;
    const response =  await ForumService.getAnswerList(qid, { ...setting, limit });
    this.setState({ answerList: response.answerList, totalAnswer: response.totalAnswer });
    return response;
  }

  addAnswer = async (qid, data) => {
    const response = await ForumService.addAnswer(qid, data);
    if (typeof response !== 'string') {
      const { answerList } = this.state;
      answerList.splice(0, 0, response);
      this.setState({ answerList });
    }
    return response;
  }

  updateAnswer = async (qid, aid, data) => {
    const response = await ForumService.updateAnswer(qid, aid, data);
    if (typeof response !== 'string') {
      const { answerList } = this.state;
      const index = answerList.findIndex((a) => a.id === aid);
      answerList.splice(index, 1, response);
      this.setState({ answerList });
    }
    return response;
  }

  deleteAnswer = async (qid, aid) => {
    const response = await ForumService.deleteAnswer(qid, aid);
    if (!response) {
      const { answerList } = this.state;
      const index = answerList.findIndex((a) => a.id === aid);
      answerList.splice(index, 1);
      this.setState({ answerList });
    }
    return response;
  }

  render() {
    const { children } = this.props;
    return (
      <ForumContext.Provider value={this.state}>
        { children }
      </ForumContext.Provider>
    );
  }
}

export default ForumProvider;
