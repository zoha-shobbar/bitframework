module Bit.Tests.ViewModels {
    @ComponentDependency({ name: "RadComboViewModel", templateUrl: "|Bit|/Bit.TSClient.AngularJS.Tests/views/tests/radComboview.html" })
    export class RadComboViewModel {

        public testModelsDataSource: kendo.data.DataSource = null;

        public model: Tests.Model.DomainModels.ParentEntity = null;

        public constructor( @Inject("EntityContextProvider") public entityContextProvider: Contracts.IEntityContextProvider) {
        }

        @Command()
        public async $onInit(): Promise<void> {
            const context = await this.entityContextProvider.getContext<TestContext>("Test");
            this.testModelsDataSource = context.testModels.getTestModelsByStringPropertyValue("1").asKendoDataSource();
            this.model = await context.parentEntities.getTestData().map(p => { return { id: p.id, testModel: { id: p.testModel.id } } }).single();
        }

        @Command()
        public setCurrent(): void {
            const entityToBeCurrent = this.testModelsDataSource.dataView<Tests.Model.DomainModels.TestModel>()[0];
            this.testModelsDataSource.current = entityToBeCurrent;
        }
    }
}