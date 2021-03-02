import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';


import * as Survey from 'survey-angular';


import 'bootstrap/dist/css/bootstrap.css';
import 'survey-angular/survey.css';
import {SurveyModel} from 'survey-angular';
import {QuestionService} from '../question.service';

Survey.StylesManager.applyTheme('bootstrap');

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'survey',
  template: `<h1 class="text-center">COVID-19 Symptom Self-Assessment Tool</h1><div class="survey-container contentcontainer codecontainer">
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
      completedPage: '',
      navigation: {
        complete: 'btn btn-lg btn-success',
        prev: 'btn sv_prev_btn',
        next: 'btn sv_next_btn',
        start: 'btn sv_start_btn',
        preview: 'btn sv_preview_btn',
        edit: 'btn sv_edit_btn'
      },
      progress: 'progress center-block mx-auto mb-4',
      progressBar: 'progress-bar',
      progressTextUnderBar: 'sv-hidden',
      progressButtonsContainerCenter: 'sv_progress-buttons__container-center',
      progressButtonsContainer: 'sv_progress-buttons__container',
      progressButtonsImageButtonLeft: 'sv_progress-buttons__image-button-left',
      progressButtonsImageButtonRight: 'sv_progress-buttons__image-button-right',
      progressButtonsImageButtonHidden: 'sv_progress-buttons__image-button--hidden',
      progressButtonsListContainer: 'sv_progress-buttons__list-container',
      progressButtonsList: 'sv_progress-buttons__list',
      progressButtonsListElementPassed: 'sv_progress-buttons__list-element--passed',
      progressButtonsListElementCurrent: 'sv_progress-buttons__list-element--current',
      progressButtonsListElementNonClickable: 'sv_progress-buttons__list-element--nonclickable',
      progressButtonsPageTitle: 'sv_progress-buttons__page-title',
      progressButtonsPageDescription: 'sv_progress-buttons__page-description',
      page: {
        root: '',
        title: '',
        description: 'small'
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
      checkbox: {
        root: 'sv_qcbc sv_qcbx form-inline',
        item: 'checkbox',
        itemChecked: 'checked',
        itemSelectAll: 'sv_q_checkbox_selectall',
        itemNone: 'sv_q_checkbox_none',
        itemInline: 'sv_q_checkbox_inline',
        itemControl: '',
        itemDecorator: 'sv-hidden',
        label: '',
        labelChecked: '',
        controlLabel: '',
        materialDecorator: 'checkbox-material',
        other: 'sv_q_checkbox_other form-control',
        column: 'sv_q_select_column'
      },
      ranking: {
        root: 'sv-ranking',
        rootMobileMod: 'sv-ranking--mobile',
        rootDragMod: 'sv-ranking--drag',
        item: 'sv-ranking-item',
        itemContent: 'sv-ranking-item__content',
        itemIndex: 'sv-ranking-item__index',
        itemText: 'sv-ranking-item__text',
        itemGhostNode: 'sv-ranking-item__ghost',
        itemIconContainer: 'sv-ranking-item__icon-container',
        itemIcon: 'sv-ranking-item__icon',
        itemIconHoverMod: 'sv-ranking-item__icon--hover',
        itemIconFocusMod: 'sv-ranking-item__icon--focus',
        itemGhostMod: 'sv-ranking-item--ghost',
        itemDragMod: 'sv-ranking-item--drag'
      },
      comment: 'form-control',
      dropdown: {
        root: '',
        control: 'form-control',
        other: 'sv_q_dd_other form-control'
      },
      html: {
        root: ''
      },
      image: {
        root: 'sv_q_image',
        image: 'sv_image_image'
      },
      matrix: {
        root: 'table sv_q_matrix',
        label: 'sv_q_m_label',
        itemChecked: 'checked',
        itemDecorator: 'sv-hidden',
        cellText: 'sv_q_m_cell_text',
        cellTextSelected: 'sv_q_m_cell_selected bg-primary',
        cellLabel: 'sv_q_m_cell_label'
      },
      matrixdropdown: {
        root: 'table',
        cell: 'sv_matrix_cell',
        headerCell: 'sv_matrix_cell_header',
        row: 'sv_matrix_row',
        detailRow: 'sv_matrix_detail_row',
        detailRowText: 'sv_matrix_cell_detail_rowtext',
        detailCell: 'sv_matrix_cell_detail',
        detailButton: 'sv_matrix_cell_detail_button',
        detailButtonExpanded: 'sv_matrix_cell_detail_button_expanded',
        detailIcon: 'sv_detail_panel_icon',
        detailIconExpanded: 'sv_detail_expanded',
        detailPanelCell: 'sv_matrix_cell_detail_panel'
      },
      matrixdynamic: {
        root: 'table',
        button: 'button',
        buttonAdd: '',
        buttonRemove: '',
        iconAdd: '',
        iconRemove: '',
        headerCell: 'sv_matrix_cell_header',
        row: 'sv_matrix_row',
        detailRow: 'sv_matrix_detail_row',
        detailCell: 'sv_matrix_cell_detail',
        detailButton: 'sv_matrix_cell_detail_button',
        detailButtonExpanded: 'sv_matrix_cell_detail_button_expanded',
        detailIcon: 'sv_detail_panel_icon',
        detailIconExpanded: 'sv_detail_expanded',
        detailPanelCell: 'sv_matrix_cell_detail_panel',
        emptyRowsSection: 'sv_matrix_empty_rows_section',
        emptyRowsText: 'sv_matrix_empty_rows_text',
        emptyRowsButton: ''
      },
      paneldynamic: {
        root: '',
        navigation: 'sv-paneldynamic__navigation',
        progressTop: 'sv-paneldynamic__progress sv-paneldynamic__progress--top',
        progressBottom: 'sv-paneldynamic__progress sv-paneldynamic__progress--bottom',
        title: 'sv-title sv-question__title',
        button: 'button',
        buttonAdd: 'button sv-paneldynamic__add-btn',
        buttonRemove: 'button sv-paneldynamic__remove-btn',
        buttonPrev: 'sv-paneldynamic__prev-btn',
        buttonNext: 'sv-paneldynamic__next-btn',
        progressContainer: 'sv-paneldynamic__progress-container',
        progress: 'sv-progress',
        progressBar: 'sv-progress__bar',
        progressText: 'sv-paneldynamic__progress-text'
      },
      multipletext: {
        root: 'table',
        itemTitle: '',
        itemValue: 'sv_q_mt_item_value form-control'
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
      imagepicker: {
        root: 'sv_imgsel',
        item: 'sv_q_imgsel',
        itemChecked: 'checked',
        itemInline: 'sv_q_imagepicker_inline',
        label: 'sv_q_imgsel_label',
        itemControl: 'sv_q_imgsel_control_item',
        image: 'sv_q_imgsel_image',
        itemText: 'sv_q_imgsel_text',
        clearButton: 'sv_q_radiogroup_clear'
      },
      rating: {
        root: 'btn-group',
        item: 'btn btn-default btn-secondary',
        selected: 'active',
        minText: 'sv_q_rating_min_text',
        itemText: 'sv_q_rating_item_text',
        maxText: 'sv_q_rating_max_text',
        disabled: ''
      },
      text: 'form-control',
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
      signaturepad: {
        root: 'sv_q_signaturepad sjs_sp_container',
        controls: 'sjs_sp_controls',
        clearButton: 'sjs_sp_clear'
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
      questions: [
        {
          type: 'html',
          name: 'introduction',
          html: '\n' +
            '\n' +
            '  <div class="col-auto">\n' +
            '    <figure>\n' +
            '      <blockquote class="blockquote">\n' +
            '        <p>Are you having difficulty breathing? For example,do you feel like you’re out of breath or suffocating?</p>\n' +
            '        <p><strong>OR</strong></p>\n' +
            '        <p>Do you have a lot of trouble breathing even when at rest,such as shortness of breath that makes it hard to speak?</p>\n' +
            '      </blockquote>\n' +
            '    </figure>\n' +
            '  </div>\n',
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
          name: 'agerange1options-text',
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
          name: 'agerange1-options',
          title: ' ',
          visibleIf: '{ageranges}=\'6 months-5 years\'',
          choices: ['Yes', 'No'],
          colCount: 0
        },
        {
          type: 'html',
          name: 'agerange1-1options-text',
          visibleIf: '{agerange1-options}=\'Yes\'',
          html: '' +
            '<div class="d-flex"><h5 class="mx-auto justify-content-center">Are you or the person who is going to get tested in one of the situations below?</h5></div>' +
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
          name: 'agerange1-1options',
          title: ' ',
          visibleIf: '{agerange1-options}=\'Yes\'',
          choices: ['Yes', 'No'],
          colCount: 0
        },

        {
          type: 'html',
          name: 'agerange2options-text',
          visibleIf: '{ageranges}=\'6-17 years\'',
          html: '<div class="d-flex"><h5 class="mx-auto justify-content-left">Does your child have <strong>ANY</strong> of the following symptoms?\n</h5></div>' +
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
          name: 'agerange2',
          title: ' ',
          visibleIf: '{ageranges}=\'6-17 years\'',
          choices: ['Yes', 'No'],
          colCount: 0
        },

        {
          type: 'html',
          name: 'agerange2-1options-text',
          visibleIf: '{agerange2}=\'Yes\'',
          html: '<div class="d-flex"><h5 class="mx-auto justify-content-center">Are you or the person who is going to get tested in one of the situations below?\n</h5></div>' +
            '' +
            '<div class="d-flex">' +
            '<ul class="mx-auto justify-content-center">' +
            '<li>Is 0 to 3 months old\n</li>' +
            '<li>Is experiencing an obstruction of nasal passages other than normal congestion</li>' +
            '<li>Is currently having a nosebleed episode\n</li>' +
            '<li>Has had a nosebleed episode in the past week\n</li>' +
            '<li>Has undergone any of the following types of surgery:' +
            '<ul>' +
            '<li>Mouth surgery in the past week?</li>' +
            '<li>Nose surgery in the past month (adult) OR</li>' +
            '<li>Nose surgery in the past 3 weeks (child)</li>' +
            '</ul>' +
            '</li>' +
            '<li>Is currently wheezing.\n</li>' +
            '</ul>' +
            '</div>',
          colCount: 0
        },
        {
          type: 'radiogroup',
          name: 'agerange2-1',
          title: ' ',
          visibleIf: '{agerange2}=\'Yes\'',
          choices: ['Yes', 'No'],
          colCount: 0
        },


        {
          type: 'radiogroup',
          name: 'submit-for-recommendation',
          title: ' ',
          visibleIf: '{agerange1-1options}=\'Yes\'||{haveTroubleBreating}=\'Yes\'||{agerange2-1}=\'Yes\'||{agerange2-1}=\'No\'',
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
