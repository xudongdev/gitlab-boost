import { useForm } from "antd/lib/form/Form";
import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Card,
  Form,
  FormItem,
  FormItemGroup,
  Select,
} from "superboost-ui";
import { useLabels } from "../hooks/useLabels";
import { hidePanel } from "../utils/hidePanel";

const FormItemStyle = styled(FormItem)`
  margin-top: 25px;
`;

const FormStyle = styled(Form)`
  margin: 16px;
`;

export const CreateIssue: FC = () => {
  const statusLabels = useLabels("状态::");
  const priorityLabels = useLabels("优先级::");
  const issueTypeLabels = useLabels("议题类型::");

  const featureTypeLabels = useLabels("需求类型::");
  const featureSourceLabels = useLabels("需求来源::");

  const bugTypeLabels = useLabels("缺陷类型::");
  const bugCauseLabels = useLabels("缺陷原因::");
  const bugLevelLabels = useLabels("缺陷等级::");

  const [form] = useForm();
  const [isFeature, setIsFeature] = useState(null);

  const handleSubmit = useCallback(async () => {
    const formData = await form.validateFields();

    if (
      statusLabels &&
      priorityLabels &&
      issueTypeLabels &&
      bugLevelLabels &&
      featureTypeLabels &&
      featureSourceLabels &&
      bugTypeLabels &&
      bugCauseLabels
    ) {
      const priority = priorityLabels.find(
        (item) => item.id === formData.priority
      );

      const status = statusLabels.find((item) => item.id === formData.status);

      const issueType = issueTypeLabels.find(
        (item) => item.id === formData.issueType
      );

      const bugLevel = bugLevelLabels.find(
        (item) => item.id === formData.bugLevel
      );

      const featureType = featureTypeLabels.find(
        (item) => item.id === formData.featureType
      );

      const featureSource = featureSourceLabels.find(
        (item) => item.id === formData.featureSource
      );

      const bugType = bugTypeLabels.find(
        (item) => item.id === formData.bugType
      );

      const bugCause = bugCauseLabels.find(
        (item) => item.id === formData.bugCause
      );

      const resultList =
        issueType?.name === "议题类型::缺陷"
          ? [priority, status, issueType, bugLevel, bugType, bugCause]
          : [priority, status, issueType, featureType, featureSource];

      const issueLabelsElement = document.createRange()
        .createContextualFragment(/* HTML */ `<div id="glb-issue-labels">
        ${resultList
          .map((item) => {
            return /* HTML */ `<input
              type="hidden"
              name="issue[label_ids][]"
              value="${item.id}"
              data-id="${item.id}"
              data-title="${item.name}"
              data-color="${item.color}"
              data-text_color="${item.text_color}"
            />`;
          })
          .join("")}
      </div>`);

      const createIssueForm = document.querySelector("#new_issue");

      const oldIssueLabelsElement = createIssueForm.querySelector(
        "#glb-issue-labels"
      );

      if (oldIssueLabelsElement) {
        oldIssueLabelsElement.parentNode.removeChild(oldIssueLabelsElement);
      }

      createIssueForm.appendChild(issueLabelsElement);

      hidePanel();
    }
  }, [
    form,
    statusLabels,
    priorityLabels,
    bugLevelLabels,
    issueTypeLabels,
    bugCauseLabels,
    featureTypeLabels,
    featureSourceLabels,
    bugTypeLabels,
  ]);

  useEffect(() => {
    if (
      statusLabels &&
      priorityLabels &&
      issueTypeLabels &&
      bugLevelLabels &&
      featureTypeLabels &&
      featureSourceLabels &&
      bugTypeLabels &&
      bugCauseLabels
    ) {
      form.setFieldsValue({
        status: statusLabels[6].id,
        priority: priorityLabels[1].id,
        issueType: issueTypeLabels[0].id,
        featureType: featureTypeLabels[0].id,
        featureSource: featureSourceLabels[0].id,
        bugType: bugTypeLabels[0].id,
        bugCause: bugCauseLabels[0].id,
        bugLevel: bugLevelLabels[0].id,
      });
    }
  }, [
    statusLabels,
    priorityLabels,
    bugLevelLabels,
    issueTypeLabels,
    bugCauseLabels,
    featureTypeLabels,
    featureSourceLabels,
    bugTypeLabels,
    form,
  ]);

  return (
    <FormStyle
      form={form}
      onFieldsChange={(value) => {
        if (value[0]?.name[0] === "issueType") {
          if (value[0].value === 2067) {
            setIsFeature(true);
          } else {
            setIsFeature(false);
          }
        }
      }}
    >
      <Card
        sectioned
        title="标签选择"
        primaryFooterAction={{
          content: "确定",
          onClick: handleSubmit,
        }}
      >
        <FormItemGroup>
          <FormItem name="status">
            <Select
              labelMode="horizontal"
              label="状态:"
              options={
                statusLabels &&
                statusLabels.map((item) => ({
                  label: item.name.replace("状态::", ""),
                  value: item.id,
                }))
              }
            ></Select>
          </FormItem>
          <FormItem name="priority">
            <Select
              labelMode="horizontal"
              label="优先级:"
              options={
                priorityLabels &&
                priorityLabels.map((item) => ({
                  label: item.name.replace("优先级::", ""),
                  value: item.id,
                }))
              }
            ></Select>
          </FormItem>
        </FormItemGroup>

        <FormItemStyle name="issueType">
          <Select
            labelMode="horizontal"
            label="议题类型:"
            options={
              issueTypeLabels &&
              issueTypeLabels.map((item) => ({
                label: item.name.replace("议题类型::", ""),
                value: item.id,
              }))
            }
          ></Select>
        </FormItemStyle>
        {isFeature ? (
          <FormItemGroup>
            <FormItem name="featureType">
              <Select
                labelMode="horizontal"
                label="需求类型:"
                options={
                  featureTypeLabels &&
                  featureTypeLabels.map((item) => ({
                    label: item.name.replace("需求类型::", ""),
                    value: item.id,
                  }))
                }
              ></Select>
            </FormItem>
            <FormItem name="featureSource">
              <Select
                labelMode="horizontal"
                label="需求来源:"
                options={
                  featureSourceLabels &&
                  featureSourceLabels.map((item) => ({
                    label: item.name.replace("需求来源::", ""),
                    value: item.id,
                  }))
                }
              ></Select>
            </FormItem>
          </FormItemGroup>
        ) : (
          <FormItemGroup>
            <FormItem name="bugType">
              <Select
                labelMode="horizontal"
                label="缺陷类型:"
                options={
                  bugTypeLabels &&
                  bugTypeLabels.map((item) => ({
                    label: item.name.replace("缺陷类型::", ""),
                    value: item.id,
                  }))
                }
              ></Select>
            </FormItem>
            <FormItem name="bugCause">
              <Select
                labelMode="horizontal"
                label="缺陷原因:"
                options={
                  bugCauseLabels &&
                  bugCauseLabels.map((item) => ({
                    label: item.name.replace("缺陷原因::", ""),
                    value: item.id,
                  }))
                }
              ></Select>
            </FormItem>
            <FormItem name="bugLevel">
              <Select
                labelMode="horizontal"
                label="缺陷等级:"
                options={
                  bugLevelLabels &&
                  bugLevelLabels.map((item) => ({
                    label: item.name.replace("缺陷等级::", ""),
                    value: item.id,
                  }))
                }
              ></Select>
            </FormItem>
          </FormItemGroup>
        )}
      </Card>
    </FormStyle>
  );
};
