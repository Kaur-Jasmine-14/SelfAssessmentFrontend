import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';


import * as Survey from 'survey-angular';


import 'bootstrap/dist/css/bootstrap.css';
import 'survey-angular/survey.css';
import {Question, SurveyModel} from 'survey-angular';
import {QuestionService} from '../question.service';

Survey.StylesManager.applyTheme('bootstrap');


function triggerCompleteManually(this: any) {
  const survey = this.survey;
  survey.completeLastPage();
}

Survey
    .FunctionFactory
    .Instance
    .register('triggerCompleteManually', triggerCompleteManually);

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'survey',
  template: `<h2 class="text-center">COVID-19 Symptom Self-Assessment Tool</h2><div class="survey-container contentcontainer codecontainer">
    <div id="surveyElement"></div>
  </div>`
})
export class SurveyComponent implements OnInit {
  @Output() submitSurvey = new EventEmitter<any>();
  @Input()
  result: any;
  private questionService: QuestionService;

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  ngOnInit(): void {

    const myCss = {
      root: 'sv_main sv_bootstrap_css border',
      container: 'sv_container',
      header: 'panel-heading card-header',
      body: 'panel-body card-block mt-4',
      bodyEmpty: 'panel-body card-block mt-4 sv_body_empty',
      footer: 'panel-footer card-footer',
      title: '',
      description: '',
      logo: 'sv_logo',
      logoImage: 'sv_logo__image',
      headerText: 'sv_header__text',
      navigationButton: '',
      completedPage: 'text-center',
      navigation: {
        complete: 'btn btn-lg btn-success',
        prev: 'btn sv_prev_btn',
        next: 'btn sv_next_btn',
        start: 'btn sv_start_btn',
        preview: 'btn sv_preview_btn',
        edit: 'btn sv_edit_btn'
      },

      pageTitle: '',
      pageDescription: 'small',
      row: 'sv_row',
      question: {
        mainRoot: 'sv_qstn',
        flowRoot: 'sv_q_flow sv_qstn',
        header: '',
        headerLeft: 'title-left',
        content: '',
        contentLeft: 'content-left',
        titleLeftRoot: 'sv_qstn_left',
        title: 'text-center',
        titleExpandable: 'sv_q_title_expandable',
        number: 'sv_q_num',
        description: 'small',
        descriptionUnderInput: 'small',
        requiredText: 'sv_q_required_text',
        comment: 'form-control',
        required: '',
        titleRequired: '',
        hasError: 'has-error',
        indent: 20,
        formGroup: 'form-group'
      },
      panel: {
        title: 'sv_p_title',
        titleExpandable: 'sv_p_title_expandable',
        titleOnError: '',
        icon: 'sv_panel_icon',
        iconExpanded: 'sv_expanded',
        description: 'small sv_p_description',
        container: 'sv_p_container',
        footer: 'sv_p_footer',
        number: 'sv_q_num',
        requiredText: 'sv_q_required_text'
      },
      error: {
        root: 'alert alert-danger',
        icon: 'glyphicon glyphicon-exclamation-sign',
        item: '',
        locationTop: 'sv_qstn_error_top',
        locationBottom: 'sv_qstn_error_bottom'
      },
      boolean: {
        root: 'sv_qbln form-inline checkbox',
        item: 'sv-boolean',
        control: 'sv-visuallyhidden',
        itemChecked: 'sv-boolean--checked checked',
        itemIndeterminate: 'sv-boolean--indeterminate',
        itemDisabled: 'sv-boolean--disabled',
        switch: 'sv-boolean__switch',
        slider: 'sv-boolean__slider',
        label: 'sv-boolean__label ',
        disabledLabel: 'sv-boolean__label--disabled',
        materialDecorator: 'sv-item__decorator sv-boolean__decorator ',
        itemDecorator: 'sv-item__svg  sv-boolean__svg',
        checkedPath: 'sv-boolean__checked-path',
        uncheckedPath: 'sv-boolean__unchecked-path',
        indeterminatePath: 'sv-boolean__indeterminate-path'
      },
      radiogroup: {
        root: 'sv_qcbc form-inline text-center',
        item: 'radio',
        itemChecked: 'checked',
        itemInline: 'sv_q_radiogroup_inline',
        label: '',
        labelChecked: '',
        itemControl: 'btn-check',
        itemDecorator: 'sv-hidden',
        controlLabel: 'btn btn-primary btn-md',
        materialDecorator: 'circle',
        other: 'sv_q_radiogroup_other form-control',
        clearButton: 'sv_q_radiogroup_clear button',
        column: 'sv_q_select_column'
      },
     xt: 'form-control',
      expression: 'form-control',
      file: {
        root: 'sv_q_file',
        placeholderInput: 'sv_q_file_placeholder',
        preview: 'sv_q_file_preview',
        removeButton: 'sv_q_file_remove_button',
        fileInput: 'sv_q_file_input',
        removeFile: 'sv_q_file_remove',
        removeFileSvg: 'sv-hidden',
        fileDecorator: 'sv-hidden',
        fileSignBottom: 'sv-hidden',
        removeButtonBottom: 'sv-hidden'
      },
      saveData: {
        root: '',
        saving: 'alert alert-info',
        error: 'alert alert-danger',
        success: 'alert alert-success',
        saveAgainButton: ''
      },
      window: {
        root: 'modal-content',
        body: 'modal-body',
        header: {
          root: 'modal-header panel-title',
          title: 'pull-left',
          button: 'glyphicon pull-right',
          buttonExpanded: 'glyphicon pull-right glyphicon-chevron-up',
          buttonCollapsed: 'glyphicon pull-right glyphicon-chevron-down'
        }
      }
    };

    const json = { showQuestionNumbers: 'off',
      showNavigationButtons: 'off',
      triggers: [
        {
          type: 'runexpression',
          expression: '{submit-for-recommendation}=\'Submit\'',
          runExpression: 'triggerCompleteManually()'
        }
      ],
      questions: [
        {
          type: 'html',
          name: 'introduction',
          html: '\n' + '\n' +
          '<div class="d-flex"><h5 class="mx-auto justify-content-center">Are you having difficulty breathing? For example,do you feel like you’re out of breath or suffocating?</h5></div>' +
            '<div class="d-flex"><h5 class="mx-auto justify-content-center"><strong>OR</strong></h5></div>' +
            '<div class="d-flex"><h5 class="mx-auto justify-content-center">Do you have a lot of trouble breathing even when at rest,such as shortness of breath that makes it hard to speak?</h5></div>',
          colCount: 0
        },
        {
          type: 'radiogroup',
          name: 'haveTroubleBreating',
          title: ' ',
          choices: ['Yes', 'No'],
          colCount: 0
        },
        {
          type: 'radiogroup',
          name: 'ageranges',
          title: 'Please select an age range:',
          visibleIf: '{haveTroubleBreating}=\'No\'',
          choices: ['6 months-5 years', '6-17 years', '18 years+'],
          colCount: 0
        },
        {
          type: 'html',
          name: 'agerange1-text',
          visibleIf: '{ageranges}=\'6 months-5 years\'',
          html: '' +
            '<div class="d-flex"><h5 class="mx-auto justify-content-center">Is your child experiencing ANY of the following symptoms?</h5></div>' +
            '<div class="d-flex">' +
            '<ul class="mx-auto justify-content-center">' +
            '<li>Fever (38.5°C rectal temperature (101.3°F) or higher)</li>' +
            '<li>Cough (new or worse),shortness of breath,or difficulty breathing</li>' +
            '<li>Runny nose or nasal congestion or sore throat<br />' +
            'AND<br />' +
            'fever (38.1°C rectal temperature (100.6°F) or higher)</li>' +
            '<li>Abdominal pain,vomiting,or diarrhea<br />' +
            'AND<br />' +
            'fever (38.1°C rectal temperature (100.6°F) or higher)</li>' +
          '</ul>' +
            '</div>',
          colCount: 0
        },
        {
          type: 'radiogroup',
          name: 'agerange1',
          title: ' ',
          visibleIf: '{ageranges}=\'6 months-5 years\'',
          choices: ['Yes', 'No'],
          colCount: 0
        },
        {
          type: 'html',
          name: 'agerange2-text',
          visibleIf: '{ageranges}=\'6-17 years\'',
          html: '<div class="d-flex"><h5 class="mx-auto justify-content-left">Does your child have <strong>ANY</strong> of the following symptoms?\n</h5></div>',
          colCount: 0
        },
        {
          type: 'html',
          name: 'agerange3-text',
          visibleIf: '{ageranges}=\'18 years+\'',
          html: '<div class="d-flex"><h5 class="mx-auto justify-content-left">Are you experiencing <strong>ANY</strong> of the following symptoms?\n</h5></div>',
          colCount: 0
        },
        {
          type: 'html',
          name: 'same-text',
          visibleIf: '{ageranges}=\'6-17 years\' || {ageranges}=\'18 years+\'',
          html:
            '<div class="d-flex">' +
            '<ul class="mx-auto justify-content-center">' +
            '<li>Fever (oral temperature 38.1°C (100.6°F) or higher)</li>' +
            '<li>Sudden loss of sense of smell (anosmia) without nasal congestion, with or without loss of taste</li>' +
            '<li>Recent cough or worsening of a chronic cough</li>' +
            '<li>Shortness of breath</li>' +
            '<li>Trouble breathing</li>' +
            '<li>Sore throat</li>' +
            '<li>Runny nose or congestion (of unknown cause)</li>' +
            '</ul>' +
            '</div>',
          colCount: 0
        },
        {
          type: 'radiogroup',
          name: 'same-text-options',
          title: ' ',
          visibleIf: '{ageranges}=\'6-17 years\' || {ageranges}=\'18 years+\'',
          choices: ['Yes', 'No'],
          colCount: 0
        },


        {
          type: 'html',
          name: 'same1',
          visibleIf: '{ageranges}=\'6-17 years\' && {same-text-options}=\'No\'',
          html: '<div class="d-flex"><h5 class="mx-auto justify-content-center">Does your child have any 2 of the following symptoms?\n</h5></div>',
          colCount: 0
        },
        {
          type: 'html',
          name: 'same2',
          visibleIf: '{ageranges}=\'18 years+\' && {same-text-options}=\'No\'',
          html: '<div class="d-flex"><h5 class="mx-auto justify-content-center">Are you experiencing any 2 of the following symptoms?\n</h5></div>',
          colCount: 0
        },
        {
          type: 'html',
          name: 'any_2_of_symptoms-text',
          visibleIf: '{same-text-options}=\'No\'',
          html:
            '' +
            '<div class="d-flex">' +
            '<ul class="mx-auto justify-content-center">' +
            '<li>Stomach aches\n</li>' +
            '<li>Nausea or vomiting\n</li>' +
            '<li>Diarrhea\n</li>' +
            '<li>Major fatigue\n</li>' +
            '<li>Significant loss of appetite\n' +
            '<li>Generalized muscle pain (not related to physical exertion)\n</li>' +
            '<li>Headache</li>' +
            '</ul>' +
            '</div>',
          colCount: 0
        },
        {
          type: 'radiogroup',
          name: 'any_2_of_symptoms-option',
          title: ' ',
          visibleIf: '{same-text-options}=\'No\'',
          choices: ['Yes', 'No'],
          colCount: 0
        },
        {
          type: 'html',
          name: 'one_of_the_situations',
          visibleIf: '{agerange1}=\'Yes\' || {same-text-options}=\'Yes\' || {any_2_of_symptoms-option}=\'Yes\'',
          html: '' +
            '<div class="d-flex"><h6 class="mx-auto justify-content-center">Are you or the person who is going to get tested in one of the situations below?</h6></div>' +
            '<div class="d-flex">' +
            '<ul class="mx-auto justify-content-center">' +
            '<li>Is 0 to 3 months old</li>' +
            '<li>Is experiencing an obstruction of nasal passages other than normal congestion</li>' +
            '<li>Is currently having a nosebleed episode</li>' +
            '<li>Has had a nosebleed episode in the past week</li>' +
            '<li>Has undergone any of the following types of surgery:' +
            '<ul>' +
            '<li>Mouth surgery in the past week?</li>' +
            '<li>Nose surgery in the past month (adult) OR</li>' +
            '<li>Nose surgery in the past 3 weeks (child)</li>' +
            '</ul>' +
            '</li>' +
            '<li>Is currently wheezing.</li>' +
            '</ul>' +
            '</div>',
          colCount: 0
        },
        {
          type: 'radiogroup',
          name: 'one_of_the_situations-option',
          title: ' ',
          visibleIf: '{agerange1}=\'Yes\' || {same-text-options}=\'Yes\' || {any_2_of_symptoms-option}=\'Yes\'',
          choices: ['Yes', 'No'],
          colCount: 0
        },



        {
          type: 'radiogroup',
          name: 'submit-for-recommendation',
          title: ' ',
          visibleIf: '{agerange1}=\'No\'||{haveTroubleBreating}=\'Yes\'||{one_of_the_situations-option}=\'Yes\'||{one_of_the_situations-option}=\'No\' || {any_2_of_symptoms-option}=\'No\' ',
          choices: ['Submit'],
          colCount: 0
        },
      ]
    };


    const survey = new Survey.Model(json);
    survey
      .onComplete
      // tslint:disable-next-line:only-arrow-functions
      .add(function(result) {
        console.log(JSON.stringify(result.data, null, 3));

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/questions/saveAll');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(result.data));
      });


    Survey.SurveyNG.render('surveyElement', {model: survey, css: myCss });
  }



}
