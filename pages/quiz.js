import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Procurando Pokémon...
      </Widget.Header>

      <Widget.Content>
      <Widget.Image backgroundImage="https://i.gifer.com/5FBP.gif" backgroundSize="cover"></Widget.Image>
      
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Pokédex do XXX        
      </Widget.Header>

      <Widget.Content>
        Você capturou {' '}
        {results.filter((x) => x).length} Pokémons.
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const [statusResultQuestion, setStatusResult] = React.useState(questionStates.WAIT);
  const hasAlternativeSelected = selectedAlternative !== undefined;
  const img = '';
  
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pokémon ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      {statusResultQuestion === questionStates.WAIT && <Widget.Image backgroundImage={question.image} backgroundSize="contain"></Widget.Image> }
      {statusResultQuestion === questionStates.SUCCESS && <Widget.Image backgroundImage={db.imgSuccesss} backgroundSize="cover"></Widget.Image> }
      {statusResultQuestion === questionStates.ERROR && <Widget.Image backgroundImage={db.imgError} backgroundSize="contain"></Widget.Image> }
      <Widget.Content>
        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            if (isCorrect){setStatusResult(questionStates.SUCCESS);}else{setStatusResult(questionStates.ERROR);}
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);    
              setStatusResult(questionStates.WAIT);                               
            }, 3 * 1000)
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* { <pre>
            {JSON.stringify(question, null, 4)}
          </pre> } */}
          <Button type="submit" disable={!hasAlternativeSelected}>
            Capturar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

const questionStates = {
  WAIT: 'WAIT',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }
  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}

{screenState === screenStates.RESULT && <ResultWidget results={results} />}
</QuizContainer>
</QuizBackground>
);
}